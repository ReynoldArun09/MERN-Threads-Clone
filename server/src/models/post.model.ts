import mongoose from "mongoose";
import { IPost } from "../types";

const postSchema = new mongoose.Schema<IPost>(
  {
    postedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    img: {
      type: String,
      default: "",
    },
    likes: {
      type: Object,
      default: {},
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
  },
  { timestamps: true }
);

export const Post = mongoose.model<IPost>("Post", postSchema);
