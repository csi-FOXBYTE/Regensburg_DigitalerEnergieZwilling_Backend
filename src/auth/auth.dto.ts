import { Static, Type } from "@sinclair/typebox";

export const AccessTokenResourceRolesDto = Type.Object({
  roles: Type.Array(Type.String()),
});

export const AccessTokenDto = Type.Object(
  {
    scope: Type.Optional(Type.String()),
    client_id: Type.Optional(Type.String()),
    username: Type.Optional(Type.String()),
    token_type: Type.Optional(Type.String()),
    exp: Type.Optional(Type.Number()),
    iat: Type.Optional(Type.Number()),
    nbf: Type.Optional(Type.Number()),
    sub: Type.Optional(Type.String()),
    aud: Type.Optional(Type.Union([Type.String(), Type.Array(Type.String())])),
    iss: Type.Optional(Type.String()),
    jti: Type.Optional(Type.String()),
    realm_access: Type.Optional(
      Type.Object({
        roles: Type.Array(Type.String()),
      }),
    ),
    resource_access: Type.Optional(
      Type.Record(Type.String(), AccessTokenResourceRolesDto),
    ),
  },
  { additionalProperties: true },
);

export const VerifyAuthOutputDto = Type.Object({
  accessToken: AccessTokenDto,
});

export type AccessToken = Static<typeof AccessTokenDto>;
