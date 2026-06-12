import { createController } from "@csi-foxbyte/fastify-toab";

const tilesController = createController()
    .rootPath("/api/public/tiles");

tilesController
    .addRoute("GET", "/*")
    .handler(async ({ request, reply }) => {
        const remaining = (request.params as Record<string, string>)["*"];
        reply.redirect(`${process.env.TILES_URL}/${remaining}`);
    });

export default tilesController;
