import mongoose from "mongoose";
import { ILogs } from "../types";

const logsSchema = new mongoose.Schema<ILogs>({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["success", "error"],
    required: true,
  },
  path: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

logsSchema.index({ timestamp: 1 }, { expireAfterSeconds: 86400 });
export const Logs = mongoose.model<ILogs>("Logs", logsSchema);
