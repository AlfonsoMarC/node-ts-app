import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Schema } from "mongoose";
import { CustomError } from "@/models/CustomError";
import User from "@/models/User";
import { HttpStatusCodes } from "@/constants/httpStatusCodes";

interface IDecodedJwtPayload extends JwtPayload {
  uid: Schema.Types.ObjectId;
}

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-token");
  const secret = process.env.SECRET_JWT_SEED;

  try {
    if (!token || !secret) {
      throw new Error();
    }
    const { uid } = jwt.verify(token, secret) as IDecodedJwtPayload;
    const authUser = await User.findById(uid);
    if (!authUser) {
      throw new Error();
    }

    req.uid = uid;
    req.authUser = authUser;
    next();
  } catch {
    throw new CustomError({
      message: "You are not authenticated",
      statusCode: HttpStatusCodes.HTTP_UNAUTHORIZED
    });
  }
};
