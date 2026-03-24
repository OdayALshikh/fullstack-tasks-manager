import { IUser } from "../types/user";
import { Lang } from "../utils/messages";
import { AuthUser } from "./authUser";

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthUser;
    lang: Lang;
  }
}
