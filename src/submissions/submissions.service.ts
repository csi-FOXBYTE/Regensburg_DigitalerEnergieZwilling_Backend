import { createService } from "@csi-foxbyte/fastify-toab";
import {
  calculate,
  makeNgsiLdEntity,
  validateInput,
  DETConfigSchema,
} from "@csi-foxbyte/regensburg_digitalerenergiezwilling_energycalculationcore";
import { getDatabaseService } from "../@internals/index.js";
import { SubmissionStatus } from "../zenstack/models.js";
import {
  AccessDeniedError,
  ConfigNotFoundError,
  InvalidInputError,
  InvalidStatusTransitionError,
  SubmissionNotFoundError,
  SubmissionOwnershipError,
  UserNotFoundError,
} from "./submissions.errors.js";

type Roles = string[];
type DB = Awaited<ReturnType<typeof getDatabaseService>>;
// `$transaction` is overloaded (callback form + array-batch form). `Parameters<>`
// resolves to the last overload (the array form), so deriving the callback's `tx`
// from it collapses to `never`. The transaction client is the db client without the
// transaction-control methods — mirror ZenStack's own `TransactionClientContract`.
type TxDB = Omit<DB, "$transaction" | "$connect" | "$disconnect" | "$use">;

const CURRENCY = "EUR";

const hasAccess = (roles: Roles) =>
  roles.includes("admin") || roles.includes("manager");

const resolveAddress = (
  submission: { address: string; longitude: number; latitude: number },
  building: { address: string | null; longitude: number | null; latitude: number | null; dataSource: string },
) => {
  if (building.dataSource === "ACTUAL" && building.address != null) {
    return {
      address: building.address,
      longitude: building.longitude ?? submission.longitude,
      latitude: building.latitude ?? submission.latitude,
    };
  }
  return {
    address: submission.address,
    longitude: submission.longitude,
    latitude: submission.latitude,
  };
};

const recordHistory = async (
  tx: TxDB,
  submissionId: string,
  from: SubmissionStatus,
  to: SubmissionStatus,
  byId: string,
) => {
  await tx.submissionChangeHistoryEntry.create({
    data: { submissionId, from, to, byId },
  });
};

const submit = async (
  db: DB,
  ngsiLdContext: string,
  params: {
    input: unknown;
    configName?: string;
    buildingId: string;
    address: string;
    longitude: number;
    latitude: number;
  },
) => {
  const config = params.configName
    ? await db.config.findUnique({ where: { versionName: params.configName } })
    : await db.config.findFirst({ where: { isActive: true } });

  if (!config) throw new ConfigNotFoundError(params.configName);

  const detConfig = DETConfigSchema.parse(JSON.parse(config.calculationConfig));

  const validation = validateInput(params.input, detConfig);
  if (!validation.success) throw new InvalidInputError(validation.issues);

  const result = calculate(detConfig, validation.data);
  const ngsiEntity = makeNgsiLdEntity(result, CURRENCY, params.buildingId, ngsiLdContext);

  return db.submission.create({
    data: {
      status: "NEW",
      buildingId: params.buildingId,
      address: params.address,
      longitude: params.longitude,
      latitude: params.latitude,
      ngsiData: JSON.stringify(ngsiEntity),
      rawInput: JSON.stringify(params.input),
      usedConfigId: config.id,
    },
  });
};

const assign = async (
  db: DB,
  submissionId: string,
  userId: string,
  roles: Roles,
  targetUserId?: string,
) => {
  if (!hasAccess(roles)) throw new AccessDeniedError();

  const submission = await db.submission.findUnique({ where: { id: submissionId } });
  if (!submission) throw new SubmissionNotFoundError(submissionId);
  if (submission.status !== SubmissionStatus.NEW)
    throw new InvalidStatusTransitionError(submission.status, SubmissionStatus.ASSIGNED);

  const assignToId = targetUserId ?? userId;

  if (targetUserId) {
    const target = await db.user.findUnique({ where: { id: targetUserId } });
    if (!target) throw new UserNotFoundError(targetUserId);
  }

  return db.$transaction(async (tx) => {
    const updated = await tx.submission.update({
      where: { id: submissionId },
      data: { status: SubmissionStatus.ASSIGNED, assignedToId: assignToId, assignedAt: new Date() },
    });
    await recordHistory(tx, submissionId, SubmissionStatus.NEW, SubmissionStatus.ASSIGNED, userId);
    return updated;
  });
};

const unAssign = async (db: DB, submissionId: string, userId: string, roles: Roles) => {
  if (!hasAccess(roles)) throw new AccessDeniedError();

  const submission = await db.submission.findUnique({ where: { id: submissionId } });
  if (!submission) throw new SubmissionNotFoundError(submissionId);
  if (submission.status !== SubmissionStatus.ASSIGNED)
    throw new InvalidStatusTransitionError(submission.status, SubmissionStatus.NEW);
  if (!roles.includes("admin") && submission.assignedToId !== userId)
    throw new SubmissionOwnershipError();

  return db.$transaction(async (tx) => {
    const updated = await tx.submission.update({
      where: { id: submissionId },
      data: { status: SubmissionStatus.NEW, assignedToId: null, assignedAt: null },
    });
    await recordHistory(tx, submissionId, SubmissionStatus.ASSIGNED, SubmissionStatus.NEW, userId);
    return updated;
  });
};

const list = async (
  db: DB,
  params: {
    managerId?: string;
    status?: SubmissionStatus;
    sortBy?: "status" | "submitted";
    skip?: number;
    limit?: number;
  },
) => {
  const submissionFilter = {
    ...(params.managerId ? { assignedToId: params.managerId } : {}),
    ...(params.status ? { status: params.status } : {}),
  };

  const submissionOrderBy =
    params.sortBy === "status"
      ? { status: "asc" as const }
      : { createdAt: "desc" as const };

  const buildingWhere = { submissions: { some: submissionFilter } };

  const buildingsPromise = db.building.findMany({
    where: buildingWhere,
    skip: params.skip ?? 0,
    take: params.limit ?? 20,
    include: {
      submissions: {
        where: submissionFilter,
        orderBy: submissionOrderBy,
      },
    },
  });
  const totalPromise = db.building.count({ where: buildingWhere });

  const buildings = await buildingsPromise;
  const total = await totalPromise;

  const buildingIds = buildings.map((b) => b.id);
  const allSubmissionsForBuildings = await db.submission.findMany({
    where: { buildingId: { in: buildingIds } },
    select: { buildingId: true },
  });
  const countByBuilding = new Map<string, number>();
  for (const s of allSubmissionsForBuildings) {
    countByBuilding.set(s.buildingId, (countByBuilding.get(s.buildingId) ?? 0) + 1);
  }

  const data = buildings.map((building) => {
    const first = building.submissions[0];
    const { address, longitude, latitude } = resolveAddress(first, building);
    return {
      buildingId: building.id,
      address,
      longitude,
      latitude,
      submissionCount: countByBuilding.get(building.id) ?? 0,
      submissions: building.submissions.map((s) => ({
        id: s.id,
        status: s.status,
        assignedToId: s.assignedToId,
        createdAt: s.createdAt,
      })),
    };
  });

  return { data, total };
};

const getById = async (db: DB, submissionId: string) => {
  const submission = await db.submission.findUnique({
    where: { id: submissionId },
    include: {
      building: true,
      assignedTo: true,
      usedConfig: true,
      history: { include: { by: true }, orderBy: { createdAt: "asc" } },
    },
  });

  if (!submission) throw new SubmissionNotFoundError(submissionId);

  const otherSubmissions = await db.submission.findMany({
    where: { buildingId: submission.buildingId, id: { not: submissionId } },
    select: { id: true },
  });

  const { address, longitude, latitude } = resolveAddress(submission, submission.building);

  return {
    ...submission,
    address,
    longitude,
    latitude,
    otherSubmissionIds: otherSubmissions.map((s) => s.id),
  };
};

const accept = async (db: DB, submissionId: string, userId: string, roles: Roles) => {
  if (!hasAccess(roles)) throw new AccessDeniedError();

  const submission = await db.submission.findUnique({
    where: { id: submissionId },
    include: { building: true },
  });
  if (!submission) throw new SubmissionNotFoundError(submissionId);
  if (submission.status !== SubmissionStatus.ASSIGNED)
    throw new InvalidStatusTransitionError(submission.status, SubmissionStatus.ACCEPTED);
  if (submission.assignedToId !== userId && !roles.includes("admin"))
    throw new SubmissionOwnershipError();

  return db.$transaction(async (tx) => {
    if (submission.buildingId && submission.building.dataSource !== "ACTUAL") {
      await tx.building.upsert({
        where: { id: submission.buildingId },
        create: {
          id: submission.buildingId,
          address: submission.address,
          longitude: submission.longitude,
          latitude: submission.latitude,
          dataSource: "USER",
        },
        update: {
          address: submission.address,
          longitude: submission.longitude,
          latitude: submission.latitude,
          dataSource: "USER",
        },
      });
    }
    const updated = await tx.submission.update({
      where: { id: submissionId },
      data: { status: SubmissionStatus.ACCEPTED },
    });
    await recordHistory(tx, submissionId, SubmissionStatus.ASSIGNED, SubmissionStatus.ACCEPTED, userId);
    return updated;
  });
};

const decline = async (db: DB, submissionId: string, userId: string, roles: Roles) => {
  if (!hasAccess(roles)) throw new AccessDeniedError();

  const submission = await db.submission.findUnique({ where: { id: submissionId } });
  if (!submission) throw new SubmissionNotFoundError(submissionId);
  if (submission.status !== SubmissionStatus.ASSIGNED)
    throw new InvalidStatusTransitionError(submission.status, SubmissionStatus.DECLINED);
  if (submission.assignedToId !== userId && !roles.includes("admin"))
    throw new SubmissionOwnershipError();

  return db.$transaction(async (tx) => {
    const updated = await tx.submission.update({
      where: { id: submissionId },
      data: { status: SubmissionStatus.DECLINED },
    });
    await recordHistory(tx, submissionId, SubmissionStatus.ASSIGNED, SubmissionStatus.DECLINED, userId);
    return updated;
  });
};

const deleteByToken = async (db: DB, deletionToken: string) => {
  const submission = await db.submission.findUnique({ where: { deletionToken } });
  if (!submission) throw new SubmissionNotFoundError(deletionToken);
  return db.submission.delete({ where: { deletionToken } });
};

const deleteById = async (db: DB, submissionId: string, userId: string, roles: Roles) => {
  if (!hasAccess(roles)) throw new AccessDeniedError();
  const submission = await db.submission.findUnique({ where: { id: submissionId } });
  if (!submission) throw new SubmissionNotFoundError(submissionId);
  if (submission.assignedToId != null && !roles.includes("admin") && submission.assignedToId !== userId)
    throw new SubmissionOwnershipError();
  return db.submission.delete({ where: { id: submissionId } });
};

const submissionsService = createService("submissions", async ({ services }) => {
  const db = await getDatabaseService(services);
  const ngsiLdContext = `${process.env.APP_BASE_URL}/public/det-building-energy-data-context.jsonld`;

  return {
    submit: (params: Parameters<typeof submit>[2]) => submit(db, ngsiLdContext, params),
    deleteByToken: (deletionToken: string) => deleteByToken(db, deletionToken),
    deleteById: (submissionId: string, userId: string, roles: Roles) => deleteById(db, submissionId, userId, roles),
    assign: (submissionId: string, userId: string, roles: Roles, targetUserId?: string) =>
      assign(db, submissionId, userId, roles, targetUserId),
    unAssign: (submissionId: string, userId: string, roles: Roles) =>
      unAssign(db, submissionId, userId, roles),
    list: (params: Parameters<typeof list>[1]) => list(db, params),
    getById: (submissionId: string) => getById(db, submissionId),
    accept: (submissionId: string, userId: string, roles: Roles) => accept(db, submissionId, userId, roles),
    decline: (submissionId: string, userId: string, roles: Roles) => decline(db, submissionId, userId, roles),
  };
});

export default submissionsService;
