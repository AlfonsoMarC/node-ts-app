import { Request, Response, NextFunction } from "express";
import {
  IAuthResponse,
  ICreateUserBody,
  ILoginBody,
  createUserService,
  loginService
} from "@/services/users";
import { HttpStatusCodes } from "@/constants/httpStatusCodes";

const { HTTP_OK, HTTP_CREATED } = HttpStatusCodes;

export const registerController = async (
  req: Request,
  res: Response<IAuthResponse>,
  next: NextFunction
) => {
  const { username, email, password }: ICreateUserBody = req.body;
  try {
    const { user, token }: IAuthResponse = await createUserService({
      username,
      email,
      password
    });
    return res.status(HTTP_CREATED).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export const loginController = async (
  req: Request,
  res: Response<IAuthResponse>,
  next: NextFunction
) => {
  const { email, password }: ILoginBody = req.body;
  try {
    const { user, token }: IAuthResponse = await loginService({
      email,
      password
    });
    return res.status(HTTP_OK).json({ user, token });
  } catch (err) {
    next(err);
  }
};
