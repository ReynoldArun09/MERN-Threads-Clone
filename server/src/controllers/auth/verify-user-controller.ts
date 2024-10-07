import {
  AsyncHandler,
  HttpStatusCode,
  SuccessMessages,
} from "../commonImports";
import { Request, Response } from "express";

export const VerifyUserApi = AsyncHandler(
  async (req: Request, res: Response) => {
    res.status(HttpStatusCode.OK).json({
      success: true,
      message: SuccessMessages.USER_VERIFIED,
      data: req.user,
    });
  }
);
