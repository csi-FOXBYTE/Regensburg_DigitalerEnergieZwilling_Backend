import { createMiddleware } from "@csi-foxbyte/fastify-toab";
import { getAuthService } from "../@internals/index.js";

export const authMiddleware = createMiddleware(
  async ({ ctx, services, request }, next) => {
    const authService = await getAuthService(services);

    const token = authService.verifyRequest(request);

    const newCtx = { ...ctx, token };

    await next({ ctx: newCtx });

    return newCtx;
  },
);
