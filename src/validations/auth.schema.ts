import { z } from "zod";

import { messages, Lang } from "../utils/messages";

export const loginSchema = (lang: Lang) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, messages[lang].user.emailRequired)
      .email(messages[lang].user.emailInvalid),
    password: z.string().trim().min(1, messages[lang].user.passwordMin),
  });

export const registerSchema = (lang: Lang) =>
  z.object({
    firstName: z
      .string()
      .min(2, messages[lang].user.firstNameMin)
      .nonempty(messages[lang].user.firstNameRequired),
    lastName: z
      .string()
      .min(2, messages[lang].user.lastNameMin)
      .nonempty(messages[lang].user.lastNameRequired),
    email: z
      .string()
      .email(messages[lang].user.emailInvalid)
      .nonempty(messages[lang].user.emailRequired),
    password: z
      .string()
      .min(8, messages[lang].user.passwordMin)
      .regex(/[A-Z]/, messages[lang].user.passwordUpper)
      .regex(/[a-z]/, messages[lang].user.passwordLower)
      .regex(/\d/, messages[lang].user.passwordNumber),
    role: z.enum(["user", "admin"]).optional(),
  });
