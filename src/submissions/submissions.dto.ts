import { Static, Type } from "@sinclair/typebox";

const SubmissionStatusDto = Type.Union([
  Type.Literal("NEW"),
  Type.Literal("ASSIGNED"),
  Type.Literal("ACCEPTED"),
  Type.Literal("DECLINED"),
]);

const UserRefDto = Type.Object({
  id: Type.String(),
  email: Type.String(),
  given_name: Type.Union([Type.String(), Type.Null()]),
  family_name: Type.Union([Type.String(), Type.Null()]),
});

// --- Submit (public) ---

export const SubmitInputDto = Type.Object({
  input: Type.Unknown(),
  configName: Type.Optional(Type.String()),
  buildingId: Type.String(),
  address: Type.String(),
  longitude: Type.Number(),
  latitude: Type.Number(),
});
export type SubmitInput = Static<typeof SubmitInputDto>;

export const SubmitOutputDto = Type.Object({
  id: Type.String(),
  ngsiData: Type.Object({}, { additionalProperties: true }),
  raw: Type.Object({}, { additionalProperties: true }),
  deletionLink: Type.String(),
});
export type SubmitOutput = Static<typeof SubmitOutputDto>;

// --- Delete ---

export const DeletePublicOutputDto = Type.Object({
  success: Type.Literal(true),
});

export const DeleteAdminOutputDto = Type.Object({
  id: Type.String(),
});

// --- Assign ---

export const AssignInputDto = Type.Object({
  userId: Type.Optional(Type.String()),
});
export type AssignInput = Static<typeof AssignInputDto>;

export const AssignmentOutputDto = Type.Object({
  id: Type.String(),
  status: SubmissionStatusDto,
  assignedToId: Type.Union([Type.String(), Type.Null()]),
  assignedAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
});
export type AssignmentOutput = Static<typeof AssignmentOutputDto>;

// --- List (admin) ---

export const ListQueryDto = Type.Object({
  managerId: Type.Optional(Type.String()),
  skip: Type.Optional(Type.Integer({ minimum: 0 })),
  limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100 })),
  status: Type.Optional(SubmissionStatusDto),
  sortBy: Type.Optional(Type.Union([Type.Literal("status"), Type.Literal("submitted")])),
});
export type ListQuery = Static<typeof ListQueryDto>;

export const ListOutputDto = Type.Object({
  data: Type.Array(
    Type.Object({
      buildingId: Type.String(),
      address: Type.String(),
      longitude: Type.Number(),
      latitude: Type.Number(),
      submissionCount: Type.Integer(),
      submissions: Type.Array(
        Type.Object({
          id: Type.String(),
          status: SubmissionStatusDto,
          assignedToId: Type.Union([Type.String(), Type.Null()]),
          createdAt: Type.String({ format: "date-time" }),
        }),
      ),
    }),
  ),
  total: Type.Integer(),
});
export type ListOutput = Static<typeof ListOutputDto>;

// --- GetById (admin) ---

export const GetByIdOutputDto = Type.Object({
  id: Type.String(),
  status: SubmissionStatusDto,
  buildingId: Type.String(),
  address: Type.String(),
  longitude: Type.Number(),
  latitude: Type.Number(),
  otherSubmissionIds: Type.Array(Type.String()),
  assignedTo: Type.Union([UserRefDto, Type.Null()]),
  assignedAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
  ngsiData: Type.Object({}, { additionalProperties: true }),
  raw: Type.Object({}, { additionalProperties: true }),
  usedConfig: Type.Object({
    id: Type.String(),
    versionName: Type.String(),
  }),
  history: Type.Array(
    Type.Object({
      id: Type.String(),
      from: SubmissionStatusDto,
      to: SubmissionStatusDto,
      by: UserRefDto,
      createdAt: Type.String({ format: "date-time" }),
    }),
  ),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});
export type GetByIdOutput = Static<typeof GetByIdOutputDto>;
