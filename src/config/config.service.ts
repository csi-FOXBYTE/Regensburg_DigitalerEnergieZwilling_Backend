import { createService } from "@csi-foxbyte/fastify-toab";
import { validateAndMigrate, validateConfig } from "@csi-foxbyte/regensburg_digitalerenergiezwilling_energycalculationcore";
import { getDatabaseService } from "../@internals/index.js";
import { AppError } from "../errors/app-error.js";

const configService = createService("config", async ({ services }) => {
  const db = await getDatabaseService(services);

  const getConfigs = async () => {
    return await db.config.findMany({});
  }

  const getConfig = async (versionName: string) => {
    const config = await db.config.findUnique({ where: { versionName } });
    if (config == null) {
      throw new AppError({ status: "NOT_FOUND", code: 404, message: `Version "${versionName}" not found` });
    }
    const result = validateAndMigrate(JSON.parse(config.calculationConfig));
    if (!result.success) {
      throw new AppError({ status: "INTERNAL_ERROR", code: 500, message: `Config "${versionName}" is invalid: ${result.issues.map(i => `${i.path}: ${i.message}`).join(", ")}` });
    }
    if (result.migrated) {
      return db.config.update({
        where: { versionName },
        data: { calculationConfig: JSON.stringify(result.data) },
      });
    }
    return config;
  }

  const createConfig = async (versionName: string, calculationConfig: string, subsidies: string[]) => {
    const existing = await db.config.findUnique({ where: { versionName } });
    if (existing != null) {
      throw new AppError({ status: "BAD_REQUEST", code: 409, message: `Version "${versionName}" already exists` });
    }
    const result = validateConfig(JSON.parse(calculationConfig));
    if (!result.success) {
      throw new AppError({ status: "BAD_REQUEST", code: 400, message: `Invalid calculationConfig: ${result.issues.map(i => `${i.path}: ${i.message}`).join(", ")}` });
    }
    return db.config.create({
      data: { versionName, calculationConfig, subsidies },
    });
  }

  const activateConfig = async (versionName: string) => {
    const target = await db.config.findUnique({ where: { versionName } });
    if (target == null) {
      throw new AppError({ status: "NOT_FOUND", code: 404, message: `Version "${versionName}" not found` });
    }
    const result = validateConfig(JSON.parse(target.calculationConfig));
    if (!result.success) {
      throw new AppError({ status: "BAD_REQUEST", code: 400, message: `Config "${versionName}" is invalid and cannot be activated: ${result.issues.map(i => `${i.path}: ${i.message}`).join(", ")}` });
    }
    return db.$transaction(async (tx) => {
      await tx.config.updateMany({ where: { isActive: true }, data: { isActive: false } });
      return tx.config.update({
        where: { versionName },
        data: { isActive: true, publishedAt: new Date() },
      });
    });
  }

  const getActiveConfig = async () => {
    const config = await db.config.findFirst({ where: { isActive: true } });
    if (config == null)
      throw new AppError({ status: "NOT_FOUND", code: 404, message: "No active config found" });
    const result = validateAndMigrate(JSON.parse(config.calculationConfig));
    if (!result.success) {
      throw new AppError({ status: "INTERNAL_ERROR", code: 500, message: `Active config is invalid: ${result.issues.map(i => `${i.path}: ${i.message}`).join(", ")}` });
    }
    if (result.migrated) {
      return { ...config, calculationConfig: JSON.stringify(result.data) };
    }
    return config;
  }

  const deleteConfig = async (versionName: string) => {
    const config = await db.config.findUnique({ where: { versionName} });
    const count = await db.config.count({});
    if (count <= 1) {
      throw new AppError({ status: "BAD_REQUEST", code: 409, message: `At least one config should always exist`})
    }
    if (config == null) {
      throw new AppError({ status: "NOT_FOUND", code: 404, message: `Version "${versionName}" not found` });
    }
    if (config.isActive) {
      throw new AppError({ status: "BAD_REQUEST", code: 409, message: `Cannot delete active config "${versionName}"` });
    }
    return db.config.delete({ where: { versionName } });
  }

  return {
    getConfigs, getConfig, createConfig, activateConfig, getActiveConfig, deleteConfig
  }

});

export default configService;
