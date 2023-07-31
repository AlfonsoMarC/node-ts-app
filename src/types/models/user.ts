import { Document } from "mongoose";

export default interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IUserModel extends IUser, Document {}
