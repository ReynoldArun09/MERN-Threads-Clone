import {
  AppError,
  AsyncHandler,
  ErrorMessages,
  findUserByUsername,
  HttpStatusCode,
  Post,
} from "../commonImports";
import { Request, Response } from "express";

export const GetUserPostsApi = AsyncHandler(
  async (req: Request, res: Response) => {
    const { username } = req.params;

    const existingUser = await findUserByUsername(username);

    if (!existingUser) {
      throw new AppError(
        ErrorMessages.USER_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST
      );
    }

    const posts = await Post.find({ postedById: existingUser.id })
      .sort({ createdAt: -1 })
      .populate("replies")
      .exec();

    return res.status(HttpStatusCode.OK).json({
      success: true,
      data: posts,
    });
  }
);
