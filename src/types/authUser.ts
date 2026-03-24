import { Role } from "../config/roles";

export interface AuthUser {
  id: string;
  role: Role;
}
