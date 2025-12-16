import { createMiddleware, GenericRouteError } from "@csi-foxbyte/fastify-toab";
import { getAuthService } from "../@internals/index.js";

export const authMiddleware = createMiddleware(
  async ({ ctx, services, reply, request }, next) => {
    const authService = await getAuthService(services);

    const session = await authService.api.getSession(request.raw);

    if (!session) {
      reply.redirect("/api/auth/sign-in");
      throw new GenericRouteError("UNAUTHORIZED", "ACCESS_DENIED");
    }

    const newCtx = { ...ctx /** your extra data */ };

    await next({ ctx: newCtx });

    return newCtx;
  }
);
