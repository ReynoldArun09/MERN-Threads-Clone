import {
  AsyncHandler,
  HttpStatusCode,
  SuccessMessages,
} from "../commonImports";
import { Request, Response } from "express";

export const SignOutUserApi = AsyncHandler(
  async (req: Request, res: Response) => {
    res.cookie("treads", "", { maxAge: 0 }).status(HttpStatusCode.OK).json({
      success: true,
      message: SuccessMessages.SIGNOUT_SUCCESS,
    });
  }
);
