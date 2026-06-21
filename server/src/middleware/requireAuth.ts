import type {Request, Response, NextFunction} from "express";
import { jwtVerify } from "jose";
import { config } from "../config/config";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;
  const secret = new TextEncoder().encode(config.jwtSecret)
  if (!token) {
    return res.status(401).json({error: "Unauthorized"});
  }
  try {
    const decoded = await jwtVerify(token, secret);
    (req as any).user = decoded.payload;
    next();
  } catch (error) {
    return res.status(401).json({error: "Unauthorized"});
  }
} 