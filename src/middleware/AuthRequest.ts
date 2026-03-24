import { Request } from "express";
import { Role } from "../config/roles";

export interface AuthRequest extends Request {
  user?: { role: Role };
}
