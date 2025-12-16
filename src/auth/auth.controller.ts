import { createController } from "@csi-foxbyte/fastify-toab";
import { getAuthService } from "../@internals/index.js";

const authController = createController().rootPath("/api/auth");

authController
  .addRoute("ALL", "/*")
  .handler(async ({ services, request, reply }) => {
    const authService = await getAuthService(services);

    try {
      // Construct request URL
      const url = new URL(request.url, `http://${request.headers.host}`);

      // Convert Fastify headers to standard Headers object
      const headers = new Headers();
      Object.entries(request.headers).forEach(([key, value]) => {
        if (value) headers.append(key, value.toString());
      });
      // Create Fetch API-compatible request
      const req = new Request(url.toString(), {
        method: request.method,
        headers,
        body: request.body ? JSON.stringify(request.body) : undefined,
      });
      // Process authentication request
      const response = await authService.handler(req);
      console.log({ response, req });
      // Forward response to client
      reply.status(response.status);
      response.headers.forEach((value, key) => reply.header(key, value));
      reply.send(response.body ? await response.text() : null);
    } catch (error) {
      console.error(error);
      reply.status(500).send({
        error: "Internal authentication error",
        code: "AUTH_FAILURE",
      });
    }
  });

authController
  .addRoute("GET", "/sign-in")
  .handler(async ({ reply, services, request }) => {
    const authService = await getAuthService(services);

    // 1. Get the current Base URL (e.g., http://localhost:3000)
    const protocol = request.protocol || 'http';
    const baseUrl = `${protocol}://${request.headers.host}`;

    // 2. Create the internal request with the missing 'Origin' header
    const internalRequest = new Request(`${baseUrl}/api/auth/sign-in/social`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "origin": baseUrl, // <--- THIS FIXES THE "MISSING ORIGIN" ERROR
        "cookie": request.headers.cookie || "" 
      },
      body: JSON.stringify({
        provider: "microsoft",
        callbackURL: "/" 
      }),
    });

    const authResponse = await authService.handler(internalRequest);

    // 3. Forward the specific Auth headers (Set-Cookie) and the Redirect (Location)
    authResponse.headers.forEach((value, key) => {
      reply.header(key, value);
    });

    const body = await authResponse.json();

    reply.redirect(body.url);
  });

export default authController;
