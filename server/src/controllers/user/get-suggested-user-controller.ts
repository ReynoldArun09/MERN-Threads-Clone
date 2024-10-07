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
    const loggedInUser = isValidMongoId(req.user.id);

    const alreadyFollowedUsers = await User.findById(loggedInUser).select(
      "following"
    );

    const convertTOObjectid = new mongoose.Types.ObjectId(loggedInUser);

    const users = await User.aggregate([
      {
        $match: {
          _id: {
            $ne: convertTOObjectid,
          },
        },
      },
      {
        $sample: { size: 10 },
      },
    ]);

    const filteredUsers = users.filter((user) => {
      return !alreadyFollowedUsers?.following[user._id.toString()];
    });

    res.status(HttpStatusCode.OK).json({
      success: true,
      data: filteredUsers,
    });
  }
);
