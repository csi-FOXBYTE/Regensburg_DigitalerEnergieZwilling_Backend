import { createController } from "@csi-foxbyte/fastify-toab";
import { Type } from "@sinclair/typebox";
import { getSubmissionsService } from "../@internals/index.js";
import { AppError } from "../errors/app-error.js";
import {
  DeletePublicOutputDto,
  SubmitInputDto,
  SubmitOutputDto,
} from "../submissions/submissions.dto.js";
import {
  ConfigNotFoundError,
  InvalidInputError,
  SubmissionNotFoundError,
} from "../submissions/submissions.errors.js";

const submissionsPublicController = createController().rootPath(
  "/api/public/submissions",
);

submissionsPublicController
  .addRoute("POST", "/")
  .body(SubmitInputDto)
  .output(SubmitOutputDto)
  .handler(async ({ services, body }) => {
    const submissionsService = await getSubmissionsService(services);

    try {
      const submission = await submissionsService.submit({
        input: body.input,
        configName: body.configName,
        buildingId: body.buildingId,
        address: body.address,
        longitude: body.longitude,
        latitude: body.latitude,
      });

      return {
        id: submission.id,
        ngsiData: JSON.parse(submission.ngsiData),
        raw: JSON.parse(submission.rawInput),
        deletionLink: `${process.env.PUBLIC_CLIENT_BASE_URL}/api/public/submissions/${submission.deletionToken}/delete`,
      };
    } catch (err) {
      if (err instanceof ConfigNotFoundError)
        throw new AppError({
          status: "NOT_FOUND",
          code: 404,
          message: err.message,
        });
      if (err instanceof InvalidInputError)
        throw new AppError({
          status: "BAD_REQUEST",
          code: 400,
          message: err.message,
        });
      throw err;
    }
  });

const DeletionTokenParams = Type.Object({ deletionToken: Type.String() });

submissionsPublicController
  .addRoute("GET", "/:deletionToken/delete")
  .params(DeletionTokenParams)
  .output(DeletePublicOutputDto)
  .handler(async ({ services, params }) => {
    const submissionsService = await getSubmissionsService(services);

    try {
      await submissionsService.deleteByToken(params.deletionToken);
      return { success: true as const };
    } catch (err) {
      if (err instanceof SubmissionNotFoundError)
        throw new AppError({
          status: "NOT_FOUND",
          code: 404,
          message: err.message,
        });
      throw err;
    }
  });

export default submissionsPublicController;
