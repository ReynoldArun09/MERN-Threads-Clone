import {
  AppError,
  AsyncHandler,
  ErrorLog,
  ErrorMessages,
  findUserByEmail,
  HttpStatusCode,
  SuccessLog,
  SuccessMessages,
  User,
} from "../commonImports";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

export const SignUpUserApi = AsyncHandler(
  async (req: Request, res: Response) => {
    const { username, name, email, password } = req.body;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      await ErrorLog(ErrorMessages.USER_ALREADY_EXISTS, req.originalUrl);
      throw new AppError(
        ErrorMessages.USER_ALREADY_EXISTS,
        HttpStatusCode.BAD_REQUEST
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      name,
      email,
      password: hashPassword,
    });

    if (newUser) {
      await SuccessLog(SuccessMessages.SIGNUP_SUCCESS, req.originalUrl);
      res.status(HttpStatusCode.CREATED).json({
        success: true,
        message: SuccessMessages.SIGNUP_SUCCESS,
      });
    }
  }
);
