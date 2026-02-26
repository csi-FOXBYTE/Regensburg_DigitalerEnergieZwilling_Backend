import { createController } from "@csi-foxbyte/fastify-toab";
import { getAuthService } from "../@internals/index.js";
import { VerifyAuthOutputDto } from "./auth.dto.js";

const authController = createController().rootPath("/api/admin/auth");

authController
  .addRoute("GET", "/verify")
  .output(VerifyAuthOutputDto)
  .handler(async ({ request, services }) => {
    const authService = await getAuthService(services);
    const accessToken = authService.verifyRequest(request);
    return { accessToken };
  });

export default authController;
