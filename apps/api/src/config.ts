import dotenv from "dotenv";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const moduleDirectory = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(moduleDirectory, "../../../.env") });

const required = (name: string, fallback?: string): string => {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const config = {
  nodeEnv: required("NODE_ENV", "development"),
  port: Number(required("API_PORT", "4000")),
  aiServiceUrl: required("AI_SERVICE_URL", "http://localhost:8000"),
  mongoUri: required("MONGODB_URI"),
  redisUrl: required("REDIS_URL"),
  logLevel: required("LOG_LEVEL", "info"),
  jwtSecret: required("JWT_SECRET"),
  webUrl: required("WEB_URL", "http://localhost:3000")
} as const;

if (!Number.isInteger(config.port) || config.port < 1 || config.port > 65535) {
  throw new Error("API_PORT must be a valid TCP port");
}
