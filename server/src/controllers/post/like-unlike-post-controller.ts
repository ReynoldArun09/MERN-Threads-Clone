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

export const LinkAndUnlikePostApi = AsyncHandler(
  async (req: Request, res: Response) => {
    const postId = req.params.id;
    const loggedInUser = isValidMongoId(req.user.id);

    const existingPost = await findPostById(postId);

    if (!existingPost) {
      throw new AppError(
        ErrorMessages.POST_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST
      );
    }

    const userLikedPosts = existingPost.likes;

    const isLiked = userLikedPosts[loggedInUser.toString()];

    if (isLiked) {
      await Post.updateOne(
        {
          _id: postId,
        },
        {
          $unset: {
            [`likes.${loggedInUser}`]: "",
          },
        }
      );
      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: SuccessMessages.POST_UNLIKED,
        liked: false,
      });
    } else {
      await Post.updateOne(
        { _id: postId },
        {
          $set: {
            [`likes.${loggedInUser}`]: true,
          },
        }
      );
      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: SuccessMessages.POST_LIKED,
        liked: true,
      });
    }
  }
);
