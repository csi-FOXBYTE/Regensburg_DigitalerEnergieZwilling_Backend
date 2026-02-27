import { createService } from "@csi-foxbyte/fastify-toab";
import type { FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/app-error.js";
import type { AccessToken } from "./auth.dto.js";

type HeaderValue = string | string[] | undefined;

const authService = createService("auth", async () => {
  const asSingleHeader = (value: HeaderValue): string | null => {
    if (Array.isArray(value))
      throw new AppError({
        status: "BAD_REQUEST",
        code: 400,
        message: "Request header is malformed",
      });
    if (typeof value !== "string" || value.length === 0) return null;
    return value;
  };

  const parseAuthorizationHeader = (authorizationHeader: string): string => {
    const [scheme, token] = authorizationHeader.split(" ");
    if (scheme?.toLowerCase() !== "bearer" || !token)
      throw new AppError({
        status: "UNAUTHORIZED",
        code: 401,
        message: "Authorization header must be a Bearer token",
      });
    return token;
  };

  const parseAccessTokenHeader = (accessTokenHeader: string): string => {
    if (accessTokenHeader.toLowerCase().startsWith("bearer "))
      return parseAuthorizationHeader(accessTokenHeader);
    return accessTokenHeader;
  };

  const verifyAccessToken = (accessToken: string): AccessToken => {
    const decoded = jwt.decode(accessToken);
    if (!decoded || typeof decoded === "string")
      throw new AppError({
        status: "UNAUTHORIZED",
        code: 401,
        message: "Access token payload is invalid",
      });
    const payload = decoded as AccessToken;

    const now = Math.floor(Date.now() / 1000);
    if (typeof payload.exp === "number" && payload.exp <= now)
      throw new AppError({
        status: "UNAUTHORIZED",
        code: 401,
        message: "Access token has expired",
      });
    if (typeof payload.nbf === "number" && payload.nbf > now)
      throw new AppError({
        status: "UNAUTHORIZED",
        code: 401,
        message: "Access token is not active yet",
      });

    return payload;
  };

  const resolveAccessTokenFromRequest = (request: FastifyRequest): string => {
    const accessTokenHeader = asSingleHeader(request.headers["x-access-token"]);
    const authorizationHeader = asSingleHeader(request.headers.authorization);

    if (accessTokenHeader) return parseAccessTokenHeader(accessTokenHeader);
    if (authorizationHeader)
      return parseAuthorizationHeader(authorizationHeader);

    throw new AppError({
      status: "UNAUTHORIZED",
      code: 401,
      message: "Access token is missing",
    });
  };

  const verifyRequest = (request: FastifyRequest): AccessToken => {
    const accessToken = resolveAccessTokenFromRequest(request);
    return verifyAccessToken(accessToken);
  };

  return {
    verifyAccessToken,
    verifyRequest,
  };
});

export default authService;
