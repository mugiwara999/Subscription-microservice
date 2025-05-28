import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../config/prisma";
import { env } from "../config/env";

declare global {
  namespace Express {
    interface Request {
      user?: {
        user_id: string;
        email: string;
      };
    }
  }
}

export const authMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { user_id: string; email: string };
    req.user = { user_id: decoded.user_id, email: decoded.email };
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

};
