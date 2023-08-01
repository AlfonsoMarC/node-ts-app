import { Document, Types } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: string;
  uid: Types.ObjectId;
}

export interface IUserModel extends IUser, Document {}
