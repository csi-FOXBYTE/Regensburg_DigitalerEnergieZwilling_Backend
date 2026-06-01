import { createController } from "@csi-foxbyte/fastify-toab";
import { Type } from "@sinclair/typebox";
import { type JsonValue } from "@zenstackhq/orm";
import { getDatabaseService } from "../@internals/index.js";
import { authMiddlewareWithRoles } from "../auth/auth.middleware.js";
import { AppError } from "../errors/app-error.js";
import {
  CreateDezConfigInputDto,
  DezConfigDto,
  DezConfigListOutputDto,
} from "./dezconfig.dto.js";

/**
 * TODO: correct Roles.
 */
const dezConfigAdminController = createController()
  .use(authMiddlewareWithRoles(["admin", "user"]))
  .rootPath("/api/admin/config");

const VersionNameParams = Type.Object({ versionName: Type.String() });

dezConfigAdminController
  .addRoute("GET", "/")
  .output(DezConfigListOutputDto)
  .handler(async ({ services }) => {
    const db = await getDatabaseService(services);
    const configs = await db.dezConfig.findMany({});
    return { configs };
  });

dezConfigAdminController
  .addRoute("GET", "/:versionName")
  .params(VersionNameParams)
  .output(DezConfigDto)
  .handler(async ({ services, params }) => {
    const db = await getDatabaseService(services);
    const config = await db.dezConfig.findUnique({ where: { versionName: params.versionName } });
    if (config == null) {
      throw new AppError({ status: "NOT_FOUND", code: 404, message: `Version "${params.versionName}" not found` });
    }
    return config;
  });

dezConfigAdminController
  .addRoute("POST", "/")
  .body(CreateDezConfigInputDto)
  .output(DezConfigDto)
  .handler(async ({ services, body }) => {
    const db = await getDatabaseService(services);
    const existing = await db.dezConfig.findUnique({ where: { versionName: body.versionName } });
    if (existing != null) {
      throw new AppError({ status: "BAD_REQUEST", code: 409, message: `Version "${body.versionName}" already exists` });
    }
    return db.dezConfig.create({
      data: {
        versionName: body.versionName,
        calculationConfig: body.calculationConfig as JsonValue,
        foerderprogramme: body.foerderprogramme as JsonValue,
      },
    });
  });

dezConfigAdminController
  .addRoute("PATCH", "/:versionName/activate")
  .params(VersionNameParams)
  .output(DezConfigDto)
  .handler(async ({ services, params }) => {
    const db = await getDatabaseService(services);
    const target = await db.dezConfig.findUnique({ where: { versionName: params.versionName } });
    if (target == null) {
      throw new AppError({ status: "NOT_FOUND", code: 404, message: `Version "${params.versionName}" not found` });
    }
    return db.$transaction(async (tx) => {
      await tx.dezConfig.updateMany({ where: { isActive: true }, data: { isActive: false } });
      return tx.dezConfig.update({
        where: { versionName: params.versionName },
        data: { isActive: true, publishedAt: new Date() },
      });
    });
  });

dezConfigAdminController
  .addRoute("GET", "/active")
  .output(DezConfigDto)
  .handler(async ({ services }) => {
    const db = await getDatabaseService(services);
    const config = await db.dezConfig.findFirst({ where: { isActive: true } });
    return config;
  });

dezConfigAdminController
  .addRoute("DELETE", "/:versionName")
  .params(VersionNameParams)
  .output(DezConfigDto)
  .handler(async ({ services, params }) => {
    const db = await getDatabaseService(services);
    const config = await db.dezConfig.findUnique({ where: { versionName: params.versionName } });
    if (config == null) {
      throw new AppError({ status: "NOT_FOUND", code: 404, message: `Version "${params.versionName}" not found` });
    }
    if (config.isActive) {
      throw new AppError({ status: "BAD_REQUEST", code: 409, message: `Cannot delete active config "${params.versionName}"` });
    }
    return db.dezConfig.delete({ where: { versionName: params.versionName } });
  });

export default dezConfigAdminController;
