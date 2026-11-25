import { createApp, logger } from "./app.ts";
import { config } from "./config.ts";
import { connectDatabase, disconnectDatabase } from "./db.ts";

const app = createApp();
let server: ReturnType<typeof app.listen> | undefined;

await connectDatabase();
server = app.listen(config.port, () => {
  logger.info({ port: config.port }, "API listening");
});

const shutdown = (signal: string) => {
  logger.info({ signal }, "Shutdown requested");
  server?.close(async (error) => {
    await disconnectDatabase();
    if (error) {
      logger.error({ err: error }, "Failed to close API server");
      process.exitCode = 1;
    }
  });
};

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));
