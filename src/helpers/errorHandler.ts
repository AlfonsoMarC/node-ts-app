import { Request, Response, NextFunction } from "express";
import { CustomError, ICustomError } from "@/models/CustomError";

export const errorHandler = (
  err: ICustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err);
  }
  return res.status(500).json({ statusCode: 500, msg: "Internal server error" });
};
