import { Schema, model } from "mongoose";
import { IUser } from "@/types/models/user";
import { UserRoles } from "@/constants/userRoles";

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: Object.values(UserRoles), required: true, default: UserRoles.USER }
});

const User = model<IUser>("User", userSchema);

export default User;
