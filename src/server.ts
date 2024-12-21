import app from "./app";
import env from "@config/env";
import logger from "@config/logger";

const PORT = env.PORT;

/**
 * Start the server
 */
const server = app.listen(PORT, () => {
  logger.info(`hey there!`);
  logger.info(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

/**
 * Graceful Shutdown
 */
const gracefulShutdown = () => {
  logger.info("Shutting down gracefully...");
  server.close(() => {
    logger.info("Server closed.");
    process.exit(0);
  });
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
