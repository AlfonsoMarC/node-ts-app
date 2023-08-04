import { HttpStatusCodes } from "@/constants/httpStatusCodes";
import User from "@/models/User";
import { ICreateUserBody, createUserService } from "@/services/auth";
import { NextFunction, Request, Response } from "express";

export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
  const { email, username, password, role }: ICreateUserBody = req.body;
  try {
    const { user } = await createUserService({ email, username, password, role });
    return res.status(HttpStatusCodes.HTTP_CREATED).json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    return res.status(HttpStatusCodes.HTTP_NO_CONTENT).end();
  } catch (err) {
    next(err);
  }
};
