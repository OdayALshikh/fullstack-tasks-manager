import { Request, Response, NextFunction } from "express";
import { Lang, messages } from "../utils/messages";

export const languageMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const langHeader = req.headers["lang"];

  if (typeof langHeader === "string" && langHeader in messages) {
    req.lang = langHeader as Lang;
  } else {
    req.lang = "en";
  }

  next();
};
