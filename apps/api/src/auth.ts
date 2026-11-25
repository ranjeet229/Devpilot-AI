import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { config } from "./config.ts";
import { User } from "./models/User.ts";

export interface AuthRequest extends Request {
  userId?: string;
}

export function createSessionToken(userId: string): string {
  return jwt.sign({ sub: userId }, config.jwtSecret, { expiresIn: "7d", issuer: "devpilot-api" });
}

export function setSessionCookie(response: Response, token: string): void {
  response.cookie("devpilot_session", token, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/"
  });
}

export function clearSessionCookie(response: Response): void {
  response.clearCookie("devpilot_session", { httpOnly: true, sameSite: "lax", path: "/" });
}

export async function requireAuth(request: AuthRequest, response: Response, next: NextFunction): Promise<void> {
  const token = request.cookies?.devpilot_session as string | undefined;
  if (!token) {
    response.status(401).json({ error: "Authentication required" });
    return;
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret, { issuer: "devpilot-api" }) as JwtPayload;
    if (typeof payload.sub !== "string") {
      response.status(401).json({ error: "Invalid session" });
      return;
    }
    const user = await User.findById(payload.sub).select("+passwordHash");
    if (!user || user.status !== "active") {
      response.status(401).json({ error: "Session is no longer active" });
      return;
    }
    request.userId = payload.sub;
    next();
  } catch {
    response.status(401).json({ error: "Invalid or expired session" });
  }
}
