import { defineConfig } from "@csi-foxbyte/fastify-toab";
import { Type } from "@sinclair/typebox";

export default defineConfig({
  env: Type.Object({
    AUTH_RESOURCE_ACCESS_CLIENT_ID: Type.Optional(Type.String()),
    DATABASE_URL: Type.String(),
    PORT: Type.Optional(Type.String()),
    NODE_ENV: Type.Optional(Type.String())
  })
});
