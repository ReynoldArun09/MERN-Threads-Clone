import { type RequestHandler } from "express";
import { AppError } from "../utils";
import { JwtPayloadExtendedType } from "../types/global";
import jwt from "jsonwebtoken";
import { ErrorMessages } from "../constants";

export const AuthMiddleware: RequestHandler = (req, res, next) => {
  const token = req.cookies.treads;

  if (!token) throw new AppError(ErrorMessages.INVALID_TOKEN, 401);

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    ) as JwtPayloadExtendedType;

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
