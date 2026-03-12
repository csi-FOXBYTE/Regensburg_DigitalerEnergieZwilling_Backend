import { createMiddleware } from "@csi-foxbyte/fastify-toab";
import { AppError } from "../errors/app-error.js";
import { getAuthService } from "../@internals/index.js";
import type { AccessToken } from "./auth.dto.js";

type AuthMiddlewareOptions = {
  requiredRoles?: string[];
  resourceClientId?: string;
};

const resolveResourceClientId = (explicitClientId?: string): string => {
  if (explicitClientId) return explicitClientId;
  return process.env.AUTH_RESOURCE_ACCESS_CLIENT_ID || "digital-energy-twin";
};

const ensureRequiredRoles = (
  token: AccessToken,
  requiredRoles: string[],
  resourceClientId?: string,
): void => {
  if (requiredRoles.length === 0) return;

  const clientId = resolveResourceClientId(resourceClientId);

  const clientAccess = token.resource_access?.[clientId];
  const tokenRoles = clientAccess?.roles ?? [];
  const missingRoles = requiredRoles.filter((role) => !tokenRoles.includes(role));

  if (missingRoles.length > 0)
    throw new AppError({
      status: "FORBIDDEN",
      code: 403,
      message: `Missing required role(s): ${missingRoles.join(", ")}`,
    });
};

const createAuthMiddleware = (options: AuthMiddlewareOptions = {}) =>
  createMiddleware(async ({ ctx, services, request }, next) => {
    const authService = await getAuthService(services);
    const token = authService.verifyRequest(request);

    ensureRequiredRoles(
      token,
      options.requiredRoles ?? [],
      options.resourceClientId,
    );

    const newCtx = { ...ctx, token };
    await next({ ctx: newCtx });
    return newCtx;
  });

export const authMiddleware = createAuthMiddleware();

export const authMiddlewareWithRoles = (
  requiredRoles: string[],
  options: Omit<AuthMiddlewareOptions, "requiredRoles"> = {},
) =>
  createAuthMiddleware({
    ...options,
    requiredRoles,
  });
