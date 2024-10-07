import {
  AppError,
  AsyncHandler,
  ErrorMessages,
  HttpStatusCode,
  Post,
} from "../commonImports";
import { Request, Response } from "express";

export const GetSinglePostApi = AsyncHandler(
  async (req: Request, res: Response) => {
    const existingPost = await Post.findById(req.params.id).populate("replies");

    if (!existingPost) {
      throw new AppError(
        ErrorMessages.POST_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST
      );
    }

    return res.status(HttpStatusCode.OK).json({
      success: true,
      data: existingPost,
    });
  }
);
