import { Static, Type } from "@sinclair/typebox";

export const CreateDezConfigInputDto = Type.Object({
  versionName: Type.String({ minLength: 1 }),
  calculationConfig: Type.Unknown(),
  foerderprogramme: Type.Unknown(),
});

export const DezConfigDto = Type.Object({
  versionName: Type.String(),
  calculationConfig: Type.Unknown(),
  foerderprogramme: Type.Unknown(),
  isActive: Type.Boolean(),
  createdAt: Type.Any(),
  publishedAt: Type.Any(),
});

export const DezConfigListOutputDto = Type.Object({
  configs: Type.Array(DezConfigDto),
});

export const ActiveDezConfigOutputDto = Type.Object({
  versionName: Type.String(),
  calculationConfig: Type.Unknown(),
  foerderprogramme: Type.Unknown(),
  publishedAt: Type.Any(),
});

export type CreateDezConfigInput = Static<typeof CreateDezConfigInputDto>;
