import { createService } from "@csi-foxbyte/fastify-toab";
import jwt from "jsonwebtoken";
import type { AccessToken } from "./auth.dto.js";

const authService = createService("auth", async () => {
  const verifyAccessToken = (accessToken: string): AccessToken => {
    const decodedAccessToken = jwt.decode(accessToken);

    if (!decodedAccessToken || typeof decodedAccessToken === "string") {
      throw new Error("Invalid access token payload");
    }

    return decodedAccessToken as AccessToken;
  };

  return {
    verifyAccessToken,
  };
});

export default authService;
