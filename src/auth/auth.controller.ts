import { createController } from "@csi-foxbyte/fastify-toab";
import { getAuthService } from "../@internals/index.js";
import {
  VerifyAuthHeadersDto,
  VerifyAuthOutputDto,
} from "./auth.dto.js";

const authController = createController().rootPath("/admin/api/auth");

authController
  .addRoute("GET", "/verify")
  .headers(VerifyAuthHeadersDto)
  .output(VerifyAuthOutputDto)
  .handler(async ({ headers, services }) => {
    const authService = await getAuthService(services);
    const accessToken = authService.verifyAccessToken(headers["x-access-token"]);
    return { accessToken };
  });

export default authController;
