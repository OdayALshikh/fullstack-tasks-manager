import { Request, Response, NextFunction } from "express";
import { messages } from "../utils/messages";
import { AppError } from "../utils/AppError";
import mongoose from "mongoose";

export const validateObjectId = (paramName: string) => {
  return (
    req: Request & { lang?: string },
    res: Response,
    next: NextFunction,
  ) => {
    const Lang = req.lang;

    const param = req.params[paramName];
    if (typeof param !== "string" || !mongoose.Types.ObjectId.isValid(param)) {
      return next(new AppError(messages[Lang].general.notFound, 400));
    }
    next();
  };
};
