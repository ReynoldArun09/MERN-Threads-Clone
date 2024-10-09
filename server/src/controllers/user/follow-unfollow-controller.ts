import {
  AppError,
  AsyncHandler,
  ErrorMessages,
  HttpStatusCode,
  isValidMongoId,
  SuccessMessages,
  User,
} from "../commonImports";
import { Request, Response } from "express";

export const FollowUnFollowUserApi = AsyncHandler(
  async (req: Request, res: Response) => {
    const userToFollow = req.params.id;
    const loggedInUser = req.user.id;

    if (!isValidMongoId(userToFollow) || !isValidMongoId(loggedInUser)) {
      throw new AppError(ErrorMessages.INVALID_ID, HttpStatusCode.BAD_REQUEST);
    }

    const userToModify = await User.findById(userToFollow);
    const verifyLoggedUser = (await User.findById(loggedInUser)) as any;

    if (!userToModify || !verifyLoggedUser) {
      throw new AppError(
        ErrorMessages.USER_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST
      );
    }

    if (loggedInUser === userToFollow) {
      throw new AppError(
        ErrorMessages.NOT_ALLOWED_TO_FOLLOW_YOURSELF,
        HttpStatusCode.BAD_REQUEST
      );
    }

    const isFollowing = verifyLoggedUser.following.includes(userToFollow);

    if (isFollowing) {
      await User.findByIdAndUpdate(userToFollow, {
        $pull: { followers: loggedInUser },
      });
      await User.findByIdAndUpdate(loggedInUser, {
        $pull: { following: userToFollow },
      });
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: `${SuccessMessages.UNFOLLOW_USER} ${userToModify.username}`,
      });
    } else {
      await User.findByIdAndUpdate(userToFollow, {
        $push: { followers: loggedInUser },
      });
      await User.findByIdAndUpdate(loggedInUser, {
        $push: { following: userToFollow },
      });
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: `${SuccessMessages.FOLLOW_USER} ${userToModify.username}`,
      });
    }
  }
);
