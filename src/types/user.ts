export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  role?: "admin" | "user";
  CreateAT: Date;
  preferredLang?: "en" | "ar" | "de";
}

export type AppErrorDetails = Record<string, string>;
