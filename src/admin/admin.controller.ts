import { createController } from "@csi-foxbyte/fastify-toab";
import { authMiddleware } from "../auth/auth.middleware.js";

const adminController = createController()
  .use(authMiddleware)
  .rootPath("/admin");

adminController.addRoute("GET", "/*").handler(async ({ request, reply }) => {
  if (process.env.NODE_ENV === "development") {
    const astroDevUrl = `http://localhost:4321${request.url}`;
    return reply.redirect(astroDevUrl);
  }
});

export default adminController;
