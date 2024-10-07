import { createLogger, format, transports } from "winston";

const logFormat = format.combine(
  format.timestamp(),
  format.colorize(),
  format.align(),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

export const logger = createLogger({
  level: "info",
  format: logFormat,
  transports: [new transports.Console()],
});
