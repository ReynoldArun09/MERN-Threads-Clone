import mongoose from "mongoose";
import {
  AsyncHandler,
  AppError,
  ErrorMessages,
  HttpStatusCode,
  User,
} from "../commonImports";
import { Request, Response } from "express";

export const GetUserProfileApi = AsyncHandler(
  async (req: Request, res: Response) => {
    const { query } = req.params;

    let user;

    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await User.findOne({ _id: query })
        .select("-password")
        .select("-updatedAt");
    } else {
      user = await User.findOne({ username: query })
        .select("-password")
        .select("-updatedAt");
    }

    if (!user) {
      throw new AppError(
        ErrorMessages.USER_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST
      );
    }
    res.status(HttpStatusCode.OK).json({ success: true, data: user });
  }
);
