import { Request, Response, NextFunction } from "express";
import { Model } from "mongoose";
import { CustomError } from "@/models/CustomError";
import { HttpStatusCodes } from "@/constants/httpStatusCodes";

export const validateModelExistsById = (model: Model<any>) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const id = req.params.id;
    const item = await model.findById(id);
    if (!item) {
      throw new CustomError({
        message: `Model ${model.modelName} does not exists with id ${id}`,
        statusCode: HttpStatusCodes.HTTP_NOT_FOUND
      });
    }
    next();
  };
};
