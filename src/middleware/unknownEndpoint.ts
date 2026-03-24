import { Request, Response, NextFunction } from "express";
import { Lang, messages } from "../utils/messages";

export const unknownEndpoint = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const lang = req.lang;
  res.status(404).json({
    status: "fail",
    message: messages[lang].general.notFound,
  });
};
