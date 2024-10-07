import app from "./app";
import MongoConnection from "./config/MongoConnection";
import { logger } from "./utils";

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    MongoConnection();
    app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server", error);
    process.exit(1);
  }
}

startServer();

process.on("uncaughtException", (error: Error) => {
  logger.error("Uncaught exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise: Promise<unknown>) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
