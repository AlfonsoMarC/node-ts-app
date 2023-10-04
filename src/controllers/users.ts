import { HttpStatusCodes } from "@/constants/httpStatusCodes";
import User from "@/models/User";
import {
  ICreateUserBody,
  IUpdateUserBody,
  IUserResponse,
  createUserService,
  updateUserService
} from "@/services/users";
import { NextFunction, Request, Response } from "express";

export const createUserController = async (
  req: Request,
  res: Response<IUserResponse>,
  next: NextFunction
) => {
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

export const updateUserController = async (
  req: Request,
  res: Response<IUserResponse>,
  next: NextFunction
) => {
  const { email, username, password, role }: IUpdateUserBody = req.body;
  const { id } = req.params;
  try {
    const updatedUser = await updateUserService({ email, username, password, role, uid: id });
    return res.status(HttpStatusCodes.HTTP_OK).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
