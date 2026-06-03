import { createController } from "@csi-foxbyte/fastify-toab";
import { Type } from "@sinclair/typebox";
import { getConfigService } from "../@internals/index.js";
import { ActiveConfigOutputDto, ConfigDto, ConfigListOutputDto, CreateConfigInputDto } from "./config.dto.js";
import { requirePermission } from "./config.middleware.js";

const VersionNameParams = Type.Object({ versionName: Type.String() });

const configController = createController()
  .rootPath("/api");

configController
  .addRoute("GET", "/admin/config")
  .use(requirePermission("config:read"))
  .output(ConfigListOutputDto)
  .handler(async ({ services }) => {
    const configService = await getConfigService(services);
    const configs = await configService.getConfigs();
    return { configs };
  });

configController
  .addRoute("GET", "/admin/config/:versionName")
  .use(requirePermission("config:read"))
  .params(VersionNameParams)
  .output(ConfigDto)
  .handler(async ({ services, params }) => {
    const configService = await getConfigService(services);
    return configService.getConfig(params.versionName);
  });

configController
  .addRoute("POST", "/admin/config")
  .use(requirePermission("config:create"))
  .body(CreateConfigInputDto)
  .output(ConfigDto)
  .handler(async ({ services, body }) => {
    const configService = await getConfigService(services);
    return configService.createConfig(body.versionName, body.calculationConfig, body.subsidies);
  });

configController
  .addRoute("PATCH", "/admin/config/:versionName/activate")
  .use(requirePermission("config:update"))
  .params(VersionNameParams)
  .output(ConfigDto)
  .handler(async ({ services, params }) => {
    const configService = await getConfigService(services);
    return configService.activateConfig(params.versionName);
  });

configController
  .addRoute("DELETE", "/admin/config/:versionName")
  .use(requirePermission("config:delete"))
  .params(VersionNameParams)
  .output(ConfigDto)
  .handler(async ({ services, params }) => {
    const configService = await getConfigService(services);
    return configService.deleteConfig(params.versionName);
  });

configController
  .addRoute("GET", "/public/config/active")
  .output(ActiveConfigOutputDto)
  .handler(async ({ services }) => {
    const configService = await getConfigService(services);
    return configService.getActiveConfig();
  });

export default configController;
