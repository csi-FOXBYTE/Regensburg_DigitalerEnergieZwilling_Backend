import type {
  FastifyToabRouteErrorContext,
} from "@csi-foxbyte/fastify-toab";
import { AppError } from "./app-error.js";

export function routeErrorHandler(ctx: FastifyToabRouteErrorContext): void {
  const appError = AppError.fromUnknown(ctx.error);
  const includeStack = process.env.NODE_ENV === "development";

  ctx.fastify.log.error(
    { err: ctx.error, path: ctx.composedPath },
    "Route handler failed",
  );

  ctx.reply.code(appError.code).send(appError.toResponse(includeStack));
}
