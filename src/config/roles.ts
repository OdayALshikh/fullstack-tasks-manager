export const roles = {
  admin: process.env.ADMIN_ROLE || "admin",
  user: process.env.USER_ROLE || "user",
} as const;

export type Role = (typeof roles)[keyof typeof roles];
