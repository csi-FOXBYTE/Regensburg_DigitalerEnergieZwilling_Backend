import { createController } from "@csi-foxbyte/fastify-toab";
import { Type } from "@sinclair/typebox";
import { authMiddleware } from "../auth/auth.middleware.js";

const testController = createController()
  .use(authMiddleware)
  .rootPath("/api/admin/test");

testController
  .addRoute("GET", "/")
  .output(Type.Any())
  .handler(async () => {
    return { Hallo: "Welt!" };
  });

export default testController;
