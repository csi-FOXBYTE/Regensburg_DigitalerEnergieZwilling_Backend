import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { FastifyAdapter } from "@bull-board/fastify";
import { defineConfig, definePlugin } from "@csi-foxbyte/fastify-toab";
import fastifyMultipart from "@fastify/multipart";
import { FastifyOtelInstrumentation } from "@fastify/otel";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyUnderPressure from "@fastify/under-pressure";
import json from "./package.json" with { type: "json" };

export default defineConfig({
  plugins: [
    definePlugin(fastifySwagger, {
      openapi: {
        openapi: "3.0.0",
        info: {
          title: "FHH VR - Backend API",
          description: "This is the backend api for the FHHVR Project.",
          version: json.version,
        },
        servers: [
          {
            url: "http://localhost:5000",
            description: "Development server",
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: [],
      },
    }),
    definePlugin(fastifySwaggerUi, {
      routePrefix: "/docs",
      uiConfig: {
        docExpansion: "list",
        deepLinking: false,
      },
      staticCSP: true,
      transformSpecificationClone: true,
    }),
    definePlugin(fastifyUnderPressure, {}),
    definePlugin(fastifyMultipart, {
      limits: {
        fileSize: 16_000_000, // 16 mb
        files: 10,
      },
    }),
  ],
  rootDir: "src",
  onReady: async (fastify) => {
    fastify.swagger();
  },
  onPreStart: async (fastify, registries) => {
    const fastifyOtel = new FastifyOtelInstrumentation();

    await fastify.register(fastifyOtel.plugin(), {
      logLevel: "info",
    });

    // This is a workaround for an azure quirk where empty bodied responses are wrongly manipulated
    fastify.addContentTypeParser(
      "*",
      { parseAs: "buffer" },
      (req, body, done) => {
        // Treat zero-length as "no body"
        if (!body || body.length === 0) return done(null, null);

        // Optional: if header is missing but it looks like JSON, try parsing
        const ct = req.headers["content-type"] || "";
        if (!ct && body[0] === 0x7b /* '{' */) {
          try {
            return done(null, JSON.parse(body.toString("utf8")));
          } catch { }
        }

        return done(null, body); // raw Buffer
      },
    );

    const serverAdapter = new FastifyAdapter();

    createBullBoard({
      //@ts-expect-error wrong types here
      queues: Array.from(registries.workerRegistry.queues.values()).map(
        // @ts-expect-error
        (queue) => new BullMQAdapter(queue),
      ),
      serverAdapter,
    });

    serverAdapter.setBasePath("/bullMQ");

    fastify.register(serverAdapter.registerPlugin(), { prefix: "/bullMQ" });
  },
});
