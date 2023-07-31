import { Types } from "mongoose";
import IUser from "@/types/models/user";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomError } from "@/models/CustomError";
import { HttpStatusCodes } from "@/constants/httpStatusCodes";

export interface IAuthResponse {
  user: { username: string; email: string; uid: Types.ObjectId };
  token: string;
}

interface IUserLogin {
  email: string;
  password: string;
}

const { HTTP_FORBIDDEN } = HttpStatusCodes;

const generateJWT = (uid: Types.ObjectId, username: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { uid, username };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h"
      },
      (err, token) => {
        if (err) {
          reject("Token could not been generated");
        }
        resolve(token);
      }
    );
  });
};

export const registerService = async ({
  username,
  email,
  password
}: IUser): Promise<IAuthResponse> => {
  const user = new User({ username, email, password });

  // Encrypt password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);
  await user.save();

  // Generate JWT
  const token = await generateJWT(user._id, user.username);

  return { user: { username, email, uid: user._id }, token };
};

export const loginService = async ({ email, password }: IUserLogin): Promise<IAuthResponse> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError({ statusCode: HTTP_FORBIDDEN, message: "Invalid email or password" });
  }
  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (isValidPassword) {
    const token = await generateJWT(user._id, user.username);
    return { user: { username: user.username, email, uid: user._id }, token };
  }
};
