import {
  AppError,
  AsyncHandler,
  ErrorMessages,
  findUserById,
  HttpStatusCode,
  isValidMongoId,
  Post,
} from "../commonImports";
import { Request, Response } from "express";

export const GetFeedPostsApi = AsyncHandler(
  async (req: Request, res: Response) => {
    const loggedInUser = isValidMongoId(req.user.id);
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);
    const existingUser = await findUserById(loggedInUser);

    if (!existingUser) {
      throw new AppError(
        ErrorMessages.USER_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST
      );
    }

    const followingIds = existingUser.following;

    const feedPosts = await Post.find({
      postedById: { $in: followingIds },
    })
      .sort({ createdAt: -1 })
      .populate("replies")
      .limit(limit)
      .skip(offset);

    const totalPosts = await Post.countDocuments({
      postedById: { $in: followingIds },
    });

    if (feedPosts) {
      return res.status(HttpStatusCode.OK).json({
        success: true,
        data: feedPosts,
        totalPosts,
      });
    } else {
      return res.status(HttpStatusCode.OK).json({
        success: true,
        data: [],
      });
    }
  }
);
