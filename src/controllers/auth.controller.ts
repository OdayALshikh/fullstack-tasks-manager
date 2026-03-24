import { Request, Response, NextFunction } from "express";
import User from "../models/User.model";
import { AppError } from "../utils/AppError";
import { messages, Lang } from "../utils/messages";
import { loginSchema, registerSchema } from "../validations/auth.schema";
import bcrypt from "bcrypt";
import { AppErrorDetails } from "../types/user";

import jwt from "jsonwebtoken";

// create fuction to register user in data base
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const { email, firstName, lastName, password, role = "user" } = req.body;
    // if (!email || !firstName || !lastName || !password) {
    //   return next(new AppError("All fields are required", 400));
    // }
    const lang: Lang = (req.headers["lang"] as Lang) || "en";

    // Validate request body using Zod schema

    const parsed = registerSchema(lang).safeParse(req.body);
    // If validation fails, return 400 Bad Request

    if (!parsed.success) {
      const errors: AppErrorDetails = Object.fromEntries(
        parsed.error.issues.map((err) => [
          err.path.length > 0 ? err.path.join(".") : "general",
          err.message,
        ]),
      );

      return next(new AppError("Validation failed", 400, errors));
    }

    // Extract email ,lastName,firstName and password from validated data

    const { email, firstName, lastName, password } = parsed.data;
    const role = "user";

    const normalizedEmail = email.toLowerCase();
    //Search if Email already Exist

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return next(new AppError(messages[lang].user.emailAlreadyExists, 400));
    }
    const newUser = new User({
      firstName,
      lastName,
      email: normalizedEmail,
      password,
      role,
    });
    // save user in data base
    const savedUser = await newUser.save();
    res.status(201).json({
      message: messages[lang].user.registrationSuccess,
    });
  } catch (error) {
    //  Forward errors to the error middleware

    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Get language from headers (default to English)

    const lang: Lang = (req.headers["lang"] as Lang) || "en";
    // Validate request body using Zod schema

    const schema = loginSchema(lang);
    const parsed = schema.safeParse(req.body);
    // If validation fails, return 400 Bad Request

    if (!parsed.success) {
      return next(new AppError("Validation failed", 400));
    }

    // Extract email and password from validated data

    const { email, password } = parsed.data;
    // Normalize email to lowercase for consistency

    const emailLower = email.toLowerCase();
    const user = await User.findOne({ email: emailLower });

    // If user not found, return invalid credentials

    if (!user) {
      return next(new AppError(messages[lang].auth.invalidCredentials, 401));
    }
    // Compare provided password with hashed password in database

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    // If password does not match, return invalid credentials

    if (!isPasswordCorrect) {
      return next(new AppError(messages[lang].auth.invalidCredentials, 401));
    }
    // Ensure JWT secret exists
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );
    // Create secure HTTP-only cookie to store token
    const isProduction = process.env.NODE_ENV === "production";

    res
      .cookie("token", token, {
        httpOnly: true, // Prevents access from JavaScript (protects against XSS)
        secure: isProduction, // HTTPS only in production
        sameSite: isProduction ? "strict" : "lax", // Protects against CSRF attacks
        maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
      })
      // Send success response with basic user data

      .status(200)
      .json({
        status: "success",
        message: messages[lang].auth.loginSuccess,
        data: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  const lang: Lang = req.lang;
  try {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
    });
    //Send success response

    res.status(200).json({
      status: "success",
      message: messages[lang].auth.logoutSuccess,
    });
  } catch (error) {
    next(error);
  }
};
