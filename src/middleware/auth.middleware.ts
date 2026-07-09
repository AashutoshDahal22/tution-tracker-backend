import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "@/utils/jwt.js";
import AppError from "@/utils/AppError.js";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {
      throw new AppError("Authorization header is missing", 401);
    }

    // Check Bearer format
    if (!authHeader.startsWith("Bearer ")) {
      throw new AppError("Invalid authorization format", 401);
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AppError("Token is missing", 401);
    }

    // Verify JWT
    const decoded = verifyToken(token);

    // Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};
