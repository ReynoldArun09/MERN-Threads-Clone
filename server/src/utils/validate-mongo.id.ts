import mongoose from "mongoose";
import { ErrorMessages, HttpStatusCode } from "../constants";
import { AppError } from "./app-error";

export const isValidMongoId = (id: string): string => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(
      ErrorMessages.MONGO_ID_INVALID,
      HttpStatusCode.FORBIDDEN
    );
  } else {
    return id;
  }
};
