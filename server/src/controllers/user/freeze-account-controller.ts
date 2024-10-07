import {
  AppError,
  AsyncHandler,
  ErrorMessages,
  findUserById,
  HttpStatusCode,
  isValidMongoId,
  User,
  SuccessMessages,
} from "../commonImports";
import { Request, Response } from "express";

export const FreezeAccountApi = AsyncHandler(
  async (req: Request, res: Response) => {
    const loggedInUser = isValidMongoId(req.user.id);
    const existingUser = await findUserById(loggedInUser);

    if (!existingUser) {
      throw new AppError(
        ErrorMessages.USER_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST
      );
    }

    await User.findByIdAndUpdate(
      {
        _id: loggedInUser,
      },
      { isFrozen: true }
    );
    res.status(HttpStatusCode.OK).json({
      success: true,
      message: SuccessMessages.ACCOUNT_FROZEN,
    });
  }
);
