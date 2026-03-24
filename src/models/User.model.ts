import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../types/user";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

// Create a user schema using the IUser interface and Mongoose Document

const userSchema: Schema<IUser & Document> = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "FIRSTNAME_REQUIRED"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "LASTNAME_REQUIRED"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "EMAIL_REQUIRED"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (value: string) => /^\S+@\S+\.\S+$/.test(value),
        message: "EMAIL_INVALID",
      },
    },
    password: {
      type: String,
      required: [true, "PASSWORD_REQUIRED"],
      trim: true,
      validate: {
        validator: (value: string) => {
          // على الأقل 8 محارف + حرف كبير + حرف صغير + رقم
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
        },
        message: "PASSWORD_WEAK",
      },
    },
    role: { type: String, enum: ["admin", "user"] },
  },
  { timestamps: true },
);

// Hash the password on create or update, only if it has been modified
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

  this.password = await bcrypt.hash(this.password, saltRounds);
});
const User = mongoose.model<IUser & Document>("User", userSchema);
export default User;
