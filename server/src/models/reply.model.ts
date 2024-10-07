import mongoose from "mongoose";
import { IReply } from "../types";

const replySchema = new mongoose.Schema<IReply>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    username: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Reply = mongoose.model<IReply>("Reply", replySchema);
