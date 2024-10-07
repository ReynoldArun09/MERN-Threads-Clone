import {
  AppError,
  AsyncHandler,
  ErrorMessages,
  findPostById,
  HttpStatusCode,
  isValidMongoId,
  Post,
  SuccessMessages,
} from "../commonImports";
import { Request, Response } from "express";
import cloudinary from "../../config/cloudinary";

export const DeletePostApi = AsyncHandler(
  async (req: Request, res: Response) => {
    const loggedInUser = isValidMongoId(req.user.id);
    const existingPost = await findPostById(req.params.id);

    if (!existingPost) {
      throw new AppError(
        ErrorMessages.POST_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST
      );
    }

    if (existingPost.postedById.toString() !== loggedInUser.toString()) {
      throw new AppError(
        ErrorMessages.NOT_ALLOWED_TO_DELETE,
        HttpStatusCode.UNAUTHORIZED
      );
    }

    if (existingPost.img) {
      const imgId = existingPost.img.split("/").pop()?.split(".")[0];
      if (imgId) {
        await cloudinary.uploader.destroy(imgId);
      }
    }

    await Post.findByIdAndDelete(req.params.id);
    return res.status(HttpStatusCode.OK).json({
      success: true,
      message: SuccessMessages.POST_DELETED,
    });
  }
);
