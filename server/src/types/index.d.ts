import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  googleId: string;
  profilePicture: string;
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  bio: string;
  isFrozen: boolean;
}

interface ILogs extends Document {
  message: string;
  type: string;
  path: string;
  timestamp: Date;
}

export interface IPost extends Document {
  postedById: mongoose.Types.ObjectId;
  text: string;
  img?: string;
  likes: { [key: string]: boolean };
  replies: mongoose.Types.ObjectId[];
}

export interface IReply extends Document {
  userId: mongoose.Types.ObjectId;
  text: string;
  profilePic: string;
  username: string;
}
