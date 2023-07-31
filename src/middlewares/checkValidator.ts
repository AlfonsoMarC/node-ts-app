import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "@/models/CustomError";
import { HttpStatusCodes } from "@/constants/httpStatusCodes";
import { ErrorMessages } from "@/constants/checkErrorsMessages";

const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = ErrorMessages;
const { HTTP_BAD_REQUEST } = HttpStatusCodes;

export const checkValidator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req).array();
  const isInternalServerError = errors.some(({ msg }) => msg === INTERNAL_SERVER_ERROR);
  if (isInternalServerError) {
    throw new Error();
  } else if (errors.length) {
    throw new CustomError({
      statusCode: HTTP_BAD_REQUEST,
      message: BAD_REQUEST,
      errors: errors
    });
  }
  next();
};
