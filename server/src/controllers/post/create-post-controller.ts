import {
  AppError,
  AsyncHandler,
  ErrorMessages,
  findUserById,
  HttpStatusCode,
  isValidMongoId,
  Post,
  SuccessMessages,
} from "../commonImports";
import { Request, Response } from "express";
import cloudinary from "../../config/cloudinary";

export const CreatePostApi = AsyncHandler(
  async (req: Request, res: Response) => {
    const { postedById, text } = req.body;
    let { img } = req.body;
    const loggedInUser = isValidMongoId(req.user.id);

    const existingUser = await findUserById(postedById);

    if (!existingUser) {
      throw new AppError(
        ErrorMessages.USER_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST
      );
    }

    if (existingUser.id !== loggedInUser) {
      throw new AppError(
        ErrorMessages.NOT_ALLOWED_TO_POST,
        HttpStatusCode.UNAUTHORIZED
      );
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img, {
        folder: "threads-clone",
      });
      img = uploadedResponse.secure_url;
    }

    const newPost = await Post.create({
      postedById,
      img,
      text,
    });

    if (newPost) {
      res.status(HttpStatusCode.OK).json({
        success: true,
        messsage: SuccessMessages.POST_CREATED,
        data: newPost,
      });
    }
  }
);
