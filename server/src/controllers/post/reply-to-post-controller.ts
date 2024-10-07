import {
  AsyncHandler,
  AppError,
  ErrorMessages,
  HttpStatusCode,
  Reply,
  findPostById,
  isValidMongoId,
  Post,
} from "../commonImports";
import { Request, Response } from "express";

export const ReplyPostApi = AsyncHandler(
  async (req: Request, res: Response) => {
    const { text } = req.body;
    const postId = req.params.id;
    const loggedInUser = isValidMongoId(req.user.id);

    const existingPost = await findPostById(postId);

    if (!existingPost) {
      throw new AppError(
        ErrorMessages.POST_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST
      );
    }

    const reply = await Reply.create({
      text,
      username: req.user.username,
      postId,
      userId: loggedInUser,
    });

    await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { replies: reply._id } },
      { new: true }
    );

    res.status(HttpStatusCode.OK).json({
      success: true,
      data: reply,
    });
  }
);
