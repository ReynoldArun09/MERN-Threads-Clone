import mongoose from "mongoose";
import {
  AsyncHandler,
  HttpStatusCode,
  isValidMongoId,
  User,
} from "../commonImports";
import { Request, Response } from "express";

export const GetSuggestedUsersApi = AsyncHandler(
  async (req: Request, res: Response) => {
    const loggedInUserId = req.user.id;

    const alreadyFollowedUsers = await User.findById(loggedInUserId).select(
      "following"
    );

    const loggedInUserObjectId = new mongoose.Types.ObjectId(loggedInUserId);

    const users = await User.aggregate([
      {
        $match: {
          _id: {
            $ne: loggedInUserObjectId,
          },
        },
      },
      {
        $sample: { size: 10 },
      },
    ]);

    const filteredUsers = users.filter(
      (user) => !alreadyFollowedUsers?.following.includes(user._id.toString())
    );

    const suggestedUsersList = filteredUsers.slice(0, 4);

    res.status(HttpStatusCode.OK).json({
      success: true,
      data: suggestedUsersList,
    });
  }
);
