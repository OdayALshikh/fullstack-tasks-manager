import { z } from "zod";
import { messages, Lang } from "../utils/messages";

// =============================
// Create User Schema
// =============================
export const createUserSchema = (lang: Lang) =>
  z.object({
    firstName: z
      .string()
      .trim()
      .min(1, messages[lang].user.firstNameRequired)
      .min(2, messages[lang].user.firstNameMin),

    lastName: z
      .string()
      .trim()
      .min(1, messages[lang].user.lastNameRequired)
      .min(2, messages[lang].user.lastNameMin),

    email: z
      .string()
      .trim()
      .min(1, messages[lang].user.emailRequired)
      .email(messages[lang].user.emailInvalid),

    password: z
      .string()
      .trim()
      .min(8, messages[lang].user.passwordMin)
      .regex(/[A-Z]/, messages[lang].user.passwordUpper)
      .regex(/[a-z]/, messages[lang].user.passwordLower)
      .regex(/\d/, messages[lang].user.passwordNumber),

    role: z.enum(["user", "admin"]).optional(),
  });

// =============================
// Get Users Query Schema
// =============================
export const getUsersQuerySchema = (lang: Lang) =>
  z.object({
    page: z
      .string()
      .optional()
      .transform((v) => (v ? Number(v) : 1))
      .refine((v) => v >= 1, {
        message: messages[lang].user.invalidPage,
      }),

    limit: z
      .string()
      .optional()
      .transform((v) => (v ? Number(v) : 10))
      .refine((v) => v >= 1 && v <= 100, {
        message: messages[lang].user.invalidLimit,
      }),

    sort: z
      .enum(["firstName", "lastName", "email", "createdAt"])
      .optional()
      .default("createdAt")
      .refine(
        (v) => ["firstName", "lastName", "email", "createdAt"].includes(v),
        {
          message: messages[lang].user.invalidSort,
        },
      ),

    order: z
      .enum(["asc", "desc"])
      .optional()
      .default("desc")
      .refine((v) => ["asc", "desc"].includes(v), {
        message: messages[lang].user.invalidOrder,
      }),

    role: z.string().optional(),
  });

export const updateUserSchema = (lang: Lang) =>
  z
    .object({
      firstName: z.string().min(2, messages[lang].user.firstNameMin).optional(),

      lastName: z.string().min(2, messages[lang].user.lastNameMin).optional(),

      email: z.string().email(messages[lang].user.emailInvalid).optional(),

      role: z.enum(["admin", "user"]).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: messages[lang].general.validationFailed,
    });
