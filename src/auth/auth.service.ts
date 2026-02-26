import { createService } from "@csi-foxbyte/fastify-toab";
import type { FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { AppError } from "../errors/app-error.js";
import type { AccessToken } from "./auth.dto.js";

type HeaderValue = string | string[] | undefined;

const authService = createService("auth", async () => {
  const jwtVerifySecret = process.env.AUTH_JWT_VERIFY_SECRET ?? "";
  const expectedApisixKey = process.env.AUTH_EXPECTED_APISIX_KEY ?? "";

  const proxySignatureEnabled =
    process.env.AUTH_PROXY_SIGNATURE_ENABLED === "true";
  const proxySignatureSecret = process.env.AUTH_PROXY_SIGNATURE_SECRET ?? "";
  const proxySignatureTtlMs = Number(
    process.env.AUTH_PROXY_SIGNATURE_TTL_MS ?? "30000",
  );
  const proxyNonceCacheTtlMs = Number(
    process.env.AUTH_PROXY_SIGNATURE_NONCE_TTL_MS ?? "120000",
  );
  const proxyNonceCache = new Map<string, number>();

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

  const pruneExpiredNonces = (nowMs: number) => {
    for (const [nonce, expiresAt] of proxyNonceCache.entries()) {
      if (expiresAt <= nowMs) proxyNonceCache.delete(nonce);
    }
  };

  const verifyProxySignature = (request: FastifyRequest): void => {
    if (!proxySignatureEnabled) return;
    if (!proxySignatureSecret)
      throw new AppError({
        status: "INTERNAL_ERROR",
        code: 500,
        message: "Proxy signature secret is not configured",
      });

    const timestampHeader = asSingleHeader(
      request.headers["x-proxy-timestamp"],
    );
    const nonceHeader = asSingleHeader(request.headers["x-proxy-nonce"]);
    const signatureHeader = asSingleHeader(
      request.headers["x-proxy-signature"],
    );
    const authorizationHeader = asSingleHeader(request.headers.authorization);

    if (
      !timestampHeader ||
      !nonceHeader ||
      !signatureHeader ||
      !authorizationHeader
    )
      throw new AppError({
        status: "UNAUTHORIZED",
        code: 401,
        message: "Missing trusted proxy signature headers",
      });

    const timestampMs = Number(timestampHeader);
    if (!Number.isFinite(timestampMs))
      throw new AppError({
        status: "UNAUTHORIZED",
        code: 401,
        message: "Proxy signature timestamp is invalid",
      });

    const nowMs = Date.now();
    if (Math.abs(nowMs - timestampMs) > proxySignatureTtlMs)
      throw new AppError({
        status: "UNAUTHORIZED",
        code: 401,
        message: "Proxy signature has expired",
      });

    pruneExpiredNonces(nowMs);
    if (proxyNonceCache.has(nonceHeader))
      throw new AppError({
        status: "UNAUTHORIZED",
        code: 401,
        message: "Proxy signature replay detected",
      });

    const canonical = [
      request.method.toUpperCase(),
      request.raw.url ?? request.url,
      timestampHeader,
      nonceHeader,
      authorizationHeader,
    ].join("\n");

    const expectedSignature = crypto
      .createHmac("sha256", proxySignatureSecret)
      .update(canonical)
      .digest("hex");

    const provided = Buffer.from(signatureHeader, "utf8");
    const expected = Buffer.from(expectedSignature, "utf8");

    if (
      provided.length !== expected.length ||
      !crypto.timingSafeEqual(provided, expected)
    ) {
      throw new AppError({
        status: "UNAUTHORIZED",
        code: 401,
        message: "Proxy signature is invalid",
      });
    }

    proxyNonceCache.set(nonceHeader, nowMs + proxyNonceCacheTtlMs);
  };

  const verifyAccessToken = (accessToken: string): AccessToken => {
    let payload: AccessToken;

    if (jwtVerifySecret) {
      const verified = jwt.verify(accessToken, jwtVerifySecret, {
        algorithms: ["HS256"],
      });
      if (!verified || typeof verified === "string")
        throw new AppError({
          status: "UNAUTHORIZED",
          code: 401,
          message: "Access token payload is invalid",
        });
      payload = verified as AccessToken;
    } else {
      const decoded = jwt.decode(accessToken);
      if (!decoded || typeof decoded === "string")
        throw new AppError({
          status: "UNAUTHORIZED",
          code: 401,
          message: "Access token payload is invalid",
        });
      payload = decoded as AccessToken;

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
    }

    if (expectedApisixKey) {
      const tokenKey = (payload as { key?: unknown }).key;
      if (tokenKey !== expectedApisixKey)
        throw new AppError({
          status: "UNAUTHORIZED",
          code: 401,
          message: "Access token was not issued for the expected gateway key",
        });
    }

    return payload;
  };

  const resolveAccessTokenFromRequest = (request: FastifyRequest): string => {
    const accessTokenHeader = asSingleHeader(request.headers["x-access-token"]);
    const authorizationHeader = asSingleHeader(request.headers.authorization);

    if (accessTokenHeader) return accessTokenHeader;
    if (authorizationHeader)
      return parseAuthorizationHeader(authorizationHeader);

    throw new AppError({
      status: "UNAUTHORIZED",
      code: 401,
      message: "Access token is missing",
    });
  };

  const verifyRequest = (request: FastifyRequest): AccessToken => {
    verifyProxySignature(request);
    const accessToken = resolveAccessTokenFromRequest(request);
    return verifyAccessToken(accessToken);
  };

  return {
    verifyAccessToken,
    verifyRequest,
  };
});

export default authService;
