import {
  AppError,
  AsyncHandler,
  ErrorLog,
  ErrorMessages,
  findUserByUsername,
  generateJwtToken,
  HttpStatusCode,
  SuccessLog,
  SuccessMessages,
} from "../commonImports";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

export const SignInUserApi = AsyncHandler(
  async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existingUser = await findUserByUsername(username);

    if (!existingUser) {
      await ErrorLog(ErrorMessages.USER_NOT_FOUND, req.originalUrl);
      throw new AppError(
        ErrorMessages.USER_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST
      );
    }

    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!comparePassword) {
      await ErrorLog(ErrorMessages.INVALID_PASSWORD, req.originalUrl);
      throw new AppError(
        ErrorMessages.INVALID_PASSWORD,
        HttpStatusCode.BAD_REQUEST
      );
    }

    const token = generateJwtToken({
      username: existingUser.username,
      email: existingUser.email,
      id: existingUser.id,
      bio: existingUser.bio,
      profilePicture: existingUser.profilePicture,
      name: existingUser.name,
      website: existingUser.website,
    });

    await SuccessLog(SuccessMessages.SIGNIN_SUCCESS, req.originalUrl);

    res
      .cookie("treads", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        secure: false,
      })
      .status(HttpStatusCode.OK)
      .json({
        success: true,
        message: SuccessMessages.SIGNIN_SUCCESS,
        data: {
          username: existingUser.username,
          email: existingUser.email,
          id: existingUser.id,
          bio: existingUser.bio,
          profilePicture: existingUser.profilePicture,
          name: existingUser.name,
          website: existingUser.website,
        },
      });
  }
);
