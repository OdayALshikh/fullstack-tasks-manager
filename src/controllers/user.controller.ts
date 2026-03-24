import { Request, Response, NextFunction } from "express";
import User from "../models/User.model";
import { AppError } from "../utils/AppError";
import {
  createUserSchema,
  getUsersQuerySchema,
  updateUserSchema,
} from "../validations/user.schema";
import { AppErrorDetails } from "../types/user";
import { messages, Lang } from "../utils/messages";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // || req.user?.preferredLang
    const lang = req.lang;
    // 2️⃣ Get the schema with the selected language
    const schema = getUsersQuerySchema(lang);
    // 3️⃣ Validate query parameters
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.issues });
    }

    // 4️⃣ Extract validated data
    const { page, limit, sort, order, role } = parsed.data;

    // 5️⃣ Build filter object
    const filter: Record<string, any> = {};
    if (role) filter.role = role.trim().toLowerCase();

    // 6️⃣ Calculate pagination
    const skip = (page - 1) * limit;
    const sortOrder = order === "asc" ? 1 : -1;

    // // Pagination///

    // current page or default 1
    // const rawPage = Number(req.query.page);
    // const page = Number.isNaN(rawPage) ? 1 : Math.max(rawPage, 1);

    // // items per page (prevents zero and negative values)
    // const rawLimit = Number(req.query.limit);
    // const safeLimit = Number.isNaN(rawLimit) ? 10 : rawLimit;

    // const limit = Math.min(Math.max(safeLimit, 1), 100);

    // // number of items to skip
    // const skip = (page - 1) * limit;
    // // Get all users (excluding passwords)

    // // total users count
    // console.time("getUsersExecution");

    // // ----------------------------
    // // Sorting
    // // ----------------------------

    // const allowedSortFields = ["firstName", "lastName", "email", "createdAt"];
    // const sortField = (req.query.sort as string) || "createdAt";
    // if (!allowedSortFields.includes(sortField)) {
    //   return next(new AppError("Invalid sort field", 400));
    // }
    // const sortOrder = req.query.order === "asc" ? 1 : -1;

    // ///FILTER
    // const filter: Record<string, unknown> = {};

    // فلترة حسب role
    // if (req.query.role)
    //   filter.role = (req.query.role as string).trim().toLowerCase();

    const [totalUsers, users] = await Promise.all([
      User.countDocuments(filter),
      User.find(filter)
        .lean()
        .sort({ [sort]: sortOrder })
        .skip(skip)
        .limit(limit)
        .select("-password"),
    ]);

    console.timeEnd("getUsersExecution");

    // Return the list of all users
    // - status: success
    // - results: number of users
    // - users: array of user objects (password excluded)
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      status: "success",
      pagination: {
        page,
        limit,
        totalUsers,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      results: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    //Search if Id  Exist
    const user = await User.findById(id).select("-password");
    // check if user dont Exist
    if (!user) {
      return next(new AppError("Userid not found", 404));
    }
    //retrun user
    // status success
    res.status(200).json({ status: "success", user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const { email, firstName, lastName, password, role = "user" } = req.body;
    // if (!email || !firstName || !lastName || !password) {
    //   return next(new AppError("All fields are required", 400));
    // }
    //|| req.user?.preferredLang
    const lang = req.lang;

    // 2️⃣ Get the schema with the selected language
    const schema = createUserSchema(lang);
    // 3️⃣ Validate query parameters
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      const errors: AppErrorDetails = Object.fromEntries(
        parsed.error.issues.map((err) => [
          err.path.length > 0 ? err.path.join(".") : "general",
          err.message,
        ]),
      );

      return next(new AppError("Validation failed", 400, errors));
    }

    const { email, firstName, lastName, password } = parsed.data;
    const role = "user";

    const emailLower = email.toLowerCase();

    const existingUser = await User.findOne({ email: emailLower });
    if (existingUser) {
      return next(
        new AppError("Validation failed", 400, {
          email: messages[lang].user.emailAlreadyExists,
        }),
      );
    }
    // creat object from moudel User
    const newUser = new User({
      firstName,
      lastName,
      email: emailLower,
      password,
      role,
    });
    await newUser.save();
    res.status(201).json({
      message: messages[lang].user.registrationSuccess,
      user: { firstName, lastName, email: emailLower, role },
    });
  } catch (error) {
    //  Forward errors to the error middleware

    next(error);
  }
};

// Controller to delete a user by ID
export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    //find user by Id and Delet
    const deletedUser = await User.findByIdAndDelete(id);

    //if user dont Exist ,return 404 erorr
    if (!deletedUser) {
      return next(new AppError("Userid not found", 404));
    }

    // Return success response with deleted user info
    res.status(200).json({ status: "success", deletedUser });
  } catch (error) {
    next(error);
  }
};

export const UpdateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    // Only these fields are allowed to be updated

    // const allowUpdates = ["firstName", "lastName", "email", "role"];

    // // Extract update field names from request body
    // const updateKeys = Object.keys(updates);

    // // Check if request body is empty
    // if (updateKeys.length === 0) {
    //   return next(new AppError("No data provided for update", 400));
    // }

    // // Validate update fields

    // const isValidOperation = updateKeys.every((key) =>
    //   allowUpdates.includes(key),
    // );

    // if (!isValidOperation) {
    //   return next(new AppError("Invalid update fields", 400));
    // }
    // Find user by ID

    const lang = req.lang;

    const schema = updateUserSchema(lang);
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(new AppError(result.error.issues[0].message, 400));
    }

    const updates = result.data;

    const user = await User.findById(id).select("-password");
    if (!user) {
      return next(new AppError(messages[lang].user.userNotFound, 404));
    }

    // Handle email update and prevent duplication
    if (updates.email) {
      const emailLower = updates.email.toLowerCase();

      if (emailLower && emailLower !== user.email.toLowerCase()) {
        const existEmail = await User.findOne({ email: emailLower });

        if (existEmail) {
          return next(new AppError(messages[lang].user.emailInUse, 400));
        }

        user.email = emailLower; // Mongoose will handle lowercase automatically
      }
    }
    // Check email duplication

    Object.assign(user, updates);

    const updatedUser = await user.save();

    // Remove password before sending response and return updated user

    const { password, ...safeUser } = updatedUser.toObject();

    res.status(200).json({
      status: "success",
      message: messages[lang].user.updateSuccess,

      updatedUser: safeUser,
    });
  } catch (error) {
    next(error);
  }
};
