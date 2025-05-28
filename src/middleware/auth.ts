import { Request, Response, NextFunction } from "express";
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

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { user_id: string; email: string };
    req.user = { user_id: decoded.user_id, email: decoded.email };
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }

};
