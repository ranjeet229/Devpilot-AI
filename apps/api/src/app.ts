import express, { type ErrorRequestHandler } from "express";
import pino from "pino";
import cookieParser from "cookie-parser";
import cors from "cors";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { config } from "./config.ts";
import { clearSessionCookie, createSessionToken, requireAuth, setSessionCookie, type AuthRequest } from "./auth.ts";
import { User } from "./models/User.ts";

export const logger = pino({ level: process.env.LOG_LEVEL ?? "info" });

export const createApp = () => {
  const app = express();
  app.use(cors({
    origin: (origin, callback) => {
      let isDevelopmentLoopbackOrigin = false;
      if (config.nodeEnv !== "production" && origin) {
        try {
          const parsedOrigin = new URL(origin);
          isDevelopmentLoopbackOrigin =
            parsedOrigin.protocol === "http:" &&
            (parsedOrigin.hostname === "localhost" || parsedOrigin.hostname === "127.0.0.1");
        } catch {
          isDevelopmentLoopbackOrigin = false;
        }
      }

      if (!origin || origin === config.webUrl || isDevelopmentLoopbackOrigin) {
        callback(null, true);
        return;
      }
      callback(new Error("Origin not allowed"));
    },
    credentials: true
  }));
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());

  app.get("/health", (_request, response) => {
    response.status(200).json({ status: "ok", service: "api" });
  });

  app.get("/ready", (_request, response) => {
    response.status(200).json({ status: "ready", service: "api" });
  });

  const signupSchema = z.object({
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email().transform((value) => value.toLowerCase()),
    password: z.string().min(8).max(128)
  });

  app.post("/auth/signup", async (request, response, next) => {
    const parsed = signupSchema.safeParse(request.body);
    if (!parsed.success) {
      response.status(400).json({ error: "Invalid signup details", issues: parsed.error.flatten() });
      return;
    }

    try {
      const passwordHash = await bcrypt.hash(parsed.data.password, 12);
      const user = await User.create({ ...parsed.data, passwordHash, roles: ["owner"], status: "active" });
      setSessionCookie(response, createSessionToken(user.id));
      response.status(201).json({
        user: { id: user.id, name: user.name, email: user.email, roles: user.roles }
      });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === 11000
      ) {
        response.status(409).json({ error: "An account with this email already exists" });
        return;
      }
      next(error);
    }
  });

  const signinSchema = z.object({
    email: z.string().trim().email().transform((value) => value.toLowerCase()),
    password: z.string().min(1).max(128)
  });

  app.post("/auth/signin", async (request, response) => {
    const parsed = signinSchema.safeParse(request.body);
    if (!parsed.success) {
      response.status(400).json({ error: "Invalid signin details" });
      return;
    }

    const user = await User.findOne({ email: parsed.data.email }).select("+passwordHash");
    if (!user || user.status !== "active" || !(await user.verifyPassword(parsed.data.password))) {
      response.status(401).json({ error: "Invalid email or password" });
      return;
    }

    setSessionCookie(response, createSessionToken(user.id));
    response.status(200).json({
      user: { id: user.id, name: user.name, email: user.email, roles: user.roles }
    });
  });

  app.post("/auth/logout", requireAuth, (_request, response) => {
    clearSessionCookie(response);
    response.status(204).send();
  });

  app.get("/auth/me", requireAuth, async (request: AuthRequest, response) => {
    const user = await User.findById(request.userId);
    if (!user) {
      response.status(401).json({ error: "Authentication required" });
      return;
    }
    response.status(200).json({
      user: { id: user.id, name: user.name, email: user.email, roles: user.roles }
    });
  });

  const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
    logger.error({ err: error }, "Unhandled API error");
    const status = typeof error.status === "number" ? error.status : 500;
    response.status(status).json({
      error: status >= 500 ? "Internal server error" : error.message
    });
  };
  app.use(errorHandler);

  return app;
};
