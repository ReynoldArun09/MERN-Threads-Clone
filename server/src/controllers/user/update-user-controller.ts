import {
  AppError,
  AsyncHandler,
  ErrorMessages,
  findUserById,
  HttpStatusCode,
  isValidMongoId,
  User,
} from "../commonImports";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import cloudinary from "../../config/cloudinary";

export const UpdateUserProfileApi = AsyncHandler(
  async (req: Request, res: Response) => {
    const { username, name, bio, email, password, website } = req.body;
    let { profilePicture } = req.body;
    const loggedInUser = isValidMongoId(req.user.id);

    const existingUser = await findUserById(loggedInUser);

    if (!existingUser) {
      throw new AppError(
        ErrorMessages.USER_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST
      );
    }

    if (req.params.id !== loggedInUser.toString()) {
      throw new AppError(
        ErrorMessages.FAILED_TO_UPDATE,
        HttpStatusCode.BAD_REQUEST
      );
    }

    let updatedProfilePic = existingUser.profilePicture;

    if (profilePicture) {
      if (existingUser.profilePicture) {
        const profilePicUrlParts = existingUser.profilePicture.split("/");
        const fileNameWithExtension = profilePicUrlParts.pop();
        const publicId = fileNameWithExtension?.split(".")[0];

        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }

      const uploadedResponse = await cloudinary.uploader.upload(profilePicture);
      updatedProfilePic = uploadedResponse.secure_url;
    }
    let hashPassword;
    if (password) {
      hashPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: loggedInUser },
      {
        username: username || existingUser.username,
        name: name || existingUser.name,
        email: email || existingUser.email,
        bio: bio || existingUser.bio,
        profilePicture: updatedProfilePic || existingUser.profilePicture,
        password: hashPassword || existingUser.password,
        website: website || existingUser.website,
      },
      {
        new: true,
      }
    );
    res.status(HttpStatusCode.OK).json({ success: true, data: updatedUser });
  }
);
