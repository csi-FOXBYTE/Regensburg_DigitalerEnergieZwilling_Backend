import { createService } from "@csi-foxbyte/fastify-toab";
import { betterAuth } from "better-auth";
const authService = createService("auth", async () => {
  const auth = betterAuth({
    basePath: "/api/auth",
    trustedOrigins: ["http://localhost:3000"],
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 7 * 24 * 60 * 60,
            strategy: "jwe",
            refreshCache: true,
        }
    },
    account: {
        storeStateStrategy: "cookie",
        storeAccountCookie: true, // Store account data after OAuth flow in a cookie (useful for database-less flows)
    },
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      microsoft: {
        clientId: "d6d44dfe-ed9e-45dd-9009-b692bdc38984",
        clientSecret: "TCi8Q~DRzOmOTybUpuNMC7~SzPpwr9AXv6GRObpr",
        tenantId: "6c1a34e2-f78f-47a8-bd72-a012de9e8a39",
        disableProfilePhoto: true,
        // authority: "https://login.microsoftonline.com/6c1a34e2-f78f-47a8-bd72-a012de9e8a39/v2.0",
      },
    },
  });

  return auth;
});



export default authService;
