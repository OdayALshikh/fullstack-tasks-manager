import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.model";
import { AppError } from "../utils/AppError";
import { messages, Lang } from "../utils/messages";

import { Role } from "../config/roles";

// Minimal user interface to store in req.user
interface MinimalUser {
  id: string;
  role: Role;
}

interface AuthRequest extends Request {
  user?: MinimalUser;
}

interface JwtPayload {
  id: string;
  role: Role;
}
// Middleware to protect routes and attach user info to req.user
export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const lang: Lang = req.lang || "en";
    let token: string | undefined;
    if (req.cookies?.token) {
      token = req.cookies.token;
    }
    // Also check Authorization header for Bearer token
    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      // Extract token from "Bearer <token
      token = req.headers.authorization.split(" ")[1];
    }
    // If no token found, user is not logged in
    if (!token) {
      return next(new AppError(messages[lang].protect.notLoggedIn, 401));
    }
    // Verify token and get user info
    if (!process.env.JWT_SECRET) {
      return next(new AppError("JWT_SECRET not set", 500));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    //

    //Assign minimal user info to req.user

    req.user = {
      id: decoded.id.toString(),
      role: decoded.role as Role,
    };

    next();
  } catch (error) {
    const lang: Lang = req.lang || "en";

    next(new AppError(messages[lang].protect.invalidToken, 401));
  }
};
