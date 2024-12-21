import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.printf(
      ({ timestamp, level, message }) =>
        `${timestamp} [${level.toUpperCase()}]: ${message}`,
    ),
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: "logs/%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m", // Rotate after 20 MB
      maxFiles: "14d", // Keep logs for 14 days
    }),
  ],
});

export default logger;
