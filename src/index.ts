import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { FastifyAdapter } from '@bull-board/fastify';
import fastifyToab from "@csi-foxbyte/fastify-toab";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyHttpProxy from '@fastify/http-proxy';
import fastifyMultipart from "@fastify/multipart";
import { FastifyOtelInstrumentation } from "@fastify/otel";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyUnderPressure from "@fastify/under-pressure";
import "dotenv/config";
import Fastify from "fastify";
import json from "../package.json" with { type: "json" };

const fastify = await Fastify({
  logger: true,
  maxParamLength: 32768
});

const fastifyOtel = new FastifyOtelInstrumentation();

await fastify.register(fastifyOtel.plugin(), {
  logLevel: "info",
});

process.on("unhandledRejection", (reason) => {
  fastify.log.error({ err: reason, type: "UNHANDLED_REJECTION" });
});

if (process.env.NODE_ENV !== "development") {fastify.register(fastifyHelmet, {}); fastify.register(fastifyRateLimit, {
  max: 500,
  timeWindow: "1 minute",
});
fastify.register(fastifyUnderPressure, {});}

fastify.register(fastifyCors, {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["*"],
  credentials: true,
  maxAge: 86400
});

fastify.register(fastifyMultipart, {
  limits: {
    fileSize: 16_000_000, // 16 mb
    files: 10,
  },
});

fastify.register(fastifySwagger, {
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
});

fastify.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
  staticCSP: true,
  transformSpecificationClone: true,
});

const { getRegistries } = await import("./registries.js");

const registries = await getRegistries(process.env.WORKER_DISABLED === "true");

fastify.register(fastifyToab, {
  async getRegistries() {
    return registries;
  },
});

if (process.env.NODE_ENV === "development") fastify.register(fastifyHttpProxy, {
  upstream: "http://localhost:4321",
  prefix: "/",
  http2: false,
  websocket: true,
  httpMethods: ["GET"]
});


(async () => {
  try {
    const serverAdapter = new FastifyAdapter();

    createBullBoard({
      //@ts-expect-error wrong types here
      queues: Array.from(registries.workerRegistry.queues.values()).map(queue => new BullMQAdapter(queue)),
      serverAdapter,
    })

    serverAdapter.setBasePath("/bullMQ")

    fastify.register(serverAdapter.registerPlugin(), { prefix: "/bullMQ" });

    await fastify.ready();

    fastify.swagger();

    await fastify.listen({
      host: "0.0.0.0",
      port: parseInt(process.env.PORT ?? "5000"),
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();

