import { Request, Response, NextFunction } from "express";
import { IAuthResponse, registerService, loginService } from "@/services/auth";
import IUser from "@/types/models/user";
import { HttpStatusCodes } from "@/constants/httpStatusCodes";

const { HTTP_OK, HTTP_CREATED } = HttpStatusCodes;

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password }: IUser = req.body;
  try {
    const { user, token }: IAuthResponse = await registerService({
      username,
      email,
      password
    });
    return res.status(HTTP_CREATED).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: IUser = req.body;
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
