import { Static, Type } from "@sinclair/typebox";

export const CreateConfigInputDto = Type.Object({
  versionName: Type.String({ minLength: 1 }),
  calculationConfig: Type.String(),
  subsidies: Type.String(),
});

export const ConfigDto = Type.Object({
  versionName: Type.String(),
  calculationConfig: Type.String(),
  subsidies: Type.String(),
  isActive: Type.Boolean(),
  createdAt: Type.Any(),
  publishedAt: Type.Any(),
});

export const ConfigListOutputDto = Type.Object({
  configs: Type.Array(ConfigDto),
});

export const ActiveConfigOutputDto = Type.Object({
  versionName: Type.String(),
  calculationConfig: Type.String(),
  subsidies: Type.String(),
  publishedAt: Type.Any(),
});

export type CreateConfigInput = Static<typeof CreateConfigInputDto>;
