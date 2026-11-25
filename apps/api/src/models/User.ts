import bcrypt from "bcryptjs";
import mongoose, { Model } from "mongoose";
import type { HydratedDocument } from "mongoose";

export type UserRole = "owner" | "admin" | "member";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  roles: UserRole[];
  status: "active" | "disabled";
  createdAt: Date;
  updatedAt: Date;
}

interface IUserMethods {
  verifyPassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, object, IUserMethods>;

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    roles: { type: [String], enum: ["owner", "admin", "member"], default: ["owner"] },
    status: { type: "String", enum: ["active", "disabled"], default: "active" }
  },
  { timestamps: true, versionKey: false }
);

userSchema.methods.verifyPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.passwordHash);
};

export const User =
  (mongoose.models.User as UserModel | undefined) ??
  mongoose.model<IUser, UserModel>("User", userSchema);

export type UserDocument = HydratedDocument<IUser, IUserMethods>;
