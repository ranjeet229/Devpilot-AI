import mongoose from "mongoose";
import { config } from "./config.ts";
import { logger } from "./app.ts";

export async function connectDatabase(): Promise<void> {
  mongoose.set("strictQuery", true);
  await mongoose.connect(config.mongoUri);
  logger.info("MongoDB connected");
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}
