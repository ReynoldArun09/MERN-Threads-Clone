import { Logs, User, Post } from "../models";
import jwt from "jsonwebtoken";
import { JwtPayloadExtendedType } from "../types/global";

export const findUserByUsername = async (username: string) => {
  if (!username) return null;
  const response = await User.findOne({ username });
  return response;
};

export const findUserByEmail = async (email: string) => {
  if (!email) return null;
  const response = await User.findOne({ email });
  return response;
};

export const findUserById = async (id: string) => {
  if (!id) return null;
  const response = await User.findById(id);
  return response;
};

export const generateJwtToken = (user: JwtPayloadExtendedType) => {
  return jwt.sign(
    {
      username: user.username,
      email: user.email,
      id: user.id,
      bio: user.bio,
      profilePicture: user.profilePicture,
      name: user.name,
      website: user.website,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRE_TIME }
  );
};

export const SuccessLog = async (message: string, path: string) => {
  const logEntry = new Logs({
    message,
    type: "success",
    path,
  });
  await logEntry.save();
};

export const ErrorLog = async (message: string, path: string) => {
  const logEntry = new Logs({
    message,
    type: "error",
    path,
  });
  await logEntry.save();
};

export const findPostById = async (id: string) => {
  if (!id) return null;
  const response = await Post.findById(id);
  return response;
};
