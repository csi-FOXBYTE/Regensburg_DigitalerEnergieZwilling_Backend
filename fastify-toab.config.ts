import { defineConfig } from "@csi-foxbyte/fastify-toab";
import { Type } from "@sinclair/typebox";
import { routeErrorHandler } from "./src/errors/route-error-handler.js";

export default defineConfig({
  env: Type.Object({
    AUTH_RESOURCE_ACCESS_CLIENT_ID: Type.Optional(Type.String()),
    DATABASE_URL: Type.String(),
    TILES_URL: Type.String(),
    APP_BASE_URL: Type.String(),
    PORT: Type.Optional(Type.String()),
    NODE_ENV: Type.Optional(Type.String()),
  }),
  onRouteError: routeErrorHandler,
});
