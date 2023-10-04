import { Types } from "mongoose";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomError } from "@/models/CustomError";
import { HttpStatusCodes } from "@/constants/httpStatusCodes";
import { IUser } from "@/types/models/user";

const { HTTP_FORBIDDEN } = HttpStatusCodes;

export interface ICreateUserBody extends Omit<IUser, "role" | "uid"> {
  role?: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface IUpdateUserBody extends ICreateUserBody {
  uid?: string;
}

export interface IUserResponse {
  username: string;
  email: string;
  uid: Types.ObjectId;
  role: string;
}

export interface IAuthResponse {
  user: IUserResponse;
  token: string;
}

const generateJWT = (uid: Types.ObjectId, username: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { uid, username };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED ?? "",
      {
        expiresIn: "2h"
      },
      (err, token) => {
        if (err) {
          reject("Token could not been generated");
        }
        resolve(token ?? "");
      }
    );
  });
};

export const createUserService = async ({
  username,
  email,
  password,
  role
}: ICreateUserBody): Promise<IAuthResponse> => {
  const user = new User({ username, email, password, role });

  // Encrypt password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);
  await user.save();

  // Generate JWT
  const token = await generateJWT(user._id, user.username);

  return { user: { username, email, uid: user._id, role: user.role }, token };
};

export const loginService = async ({ email, password }: ILoginBody): Promise<IAuthResponse> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError({ statusCode: HTTP_FORBIDDEN, message: "Invalid email or password" });
  }
  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (isValidPassword) {
    const token = await generateJWT(user._id, user.username);
    return { user: { username: user.username, email, uid: user._id, role: user.role }, token };
  } else {
    throw new Error();
  }
};

export const updateUserService = async ({
  email,
  username,
  password,
  role,
  uid
}: IUpdateUserBody): Promise<IUserResponse> => {
  const updatedUser = await User.findByIdAndUpdate(
    uid,
    { email, username, password, role },
    { returnDocument: "after" }
  );
  if (updatedUser) {
    return {
      username: updatedUser.username,
      email: updatedUser.email,
      uid: updatedUser._id,
      role: updatedUser.role
    };
  } else {
    throw new Error();
  }
};
