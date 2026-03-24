import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { messages, Lang } from "../utils/messages";
import { Role } from "../config/roles";

export const authorize =
  (...allowedRoles: Role[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const lang: Lang = req.lang || "en";
    // Check if user exists on request (set by protect middleware)
    if (!req.user) {
      return next(new AppError(messages[lang].protect.notLoggedIn, 401));
    }

    const userRole = req.user.role as Role;

    //  Check if user's role is allowed
    if (!allowedRoles.includes(userRole)) {
      return next(new AppError(messages[lang].auth.unauthorized, 403));
    }

    //  If everything is fine, continue
    next();
  };
