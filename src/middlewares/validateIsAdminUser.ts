import { HttpStatusCodes } from "@/constants/httpStatusCodes";
import { UserRoles } from "@/constants/userRoles";
import { CustomError } from "@/models/CustomError";
import { NextFunction, Request, Response } from "express";

export const validateIsAdminUser = (req: Request, res: Response, next: NextFunction) => {
  const authUser = req.authUser;
  if (!authUser) {
    throw new Error();
  }
  if (authUser.role !== UserRoles.ADMIN) {
    throw new CustomError({
      message: "You don´t have admin permissions",
      statusCode: HttpStatusCodes.HTTP_FORBIDDEN
    });
  }
  next();
};
