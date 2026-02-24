import { Static, Type } from "@sinclair/typebox";

export const VerifyAuthHeadersDto = Type.Object({
  "x-access-token": Type.String(),
});

export const AccessTokenResourceRolesDto = Type.Object({
  roles: Type.Array(Type.String()),
});

export const AccessTokenDto = Type.Object({
  exp: Type.Number(),
  iat: Type.Number(),
  auth_time: Type.Number(),
  jti: Type.String(),
  iss: Type.String(),
  aud: Type.Array(Type.String()),
  sub: Type.String(),
  typ: Type.String(),
  azp: Type.String(),
  sid: Type.String(),
  acr: Type.String(),
  "allowed-origins": Type.Array(Type.String()),
  realm_access: Type.Object({
    roles: Type.Array(Type.String()),
  }),
  resource_access: Type.Object({
    grafana: AccessTokenResourceRolesDto,
    "api-access": AccessTokenResourceRolesDto,
    admin_tools: AccessTokenResourceRolesDto,
    account: AccessTokenResourceRolesDto,
  }),
  scope: Type.String(),
  email_verified: Type.Boolean(),
  name: Type.String(),
  preferred_username: Type.String(),
  given_name: Type.String(),
  family_name: Type.String(),
  email: Type.String(),
});

export const VerifyAuthOutputDto = Type.Object({
  accessToken: AccessTokenDto,
});

export type AccessToken = Static<typeof AccessTokenDto>;
