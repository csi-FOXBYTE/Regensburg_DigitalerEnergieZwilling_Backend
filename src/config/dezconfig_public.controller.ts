import { createController } from "@csi-foxbyte/fastify-toab";
import { getDatabaseService } from "../@internals/index.js";
import { ActiveDezConfigOutputDto } from "./dezconfig.dto.js";

const dezConfigPublicController = createController().rootPath("/api/public/config");

/**
 * Enables the frontend to get the active config, containing the subsidies and the det-configuration.
 */
dezConfigPublicController
  .addRoute("GET", "/active")
  .output(ActiveDezConfigOutputDto)
  .handler(async ({ services }) => {
    const db = await getDatabaseService(services);
    const activeSubsidy = await db.dezConfig.findFirst({ where: { isActive: true } });
    return activeSubsidy;
  });

export default dezConfigPublicController;
