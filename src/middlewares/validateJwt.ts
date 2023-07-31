import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Schema } from "mongoose";
import { CustomError } from "@/models/CustomError";

interface IDecodedJwtPayload extends JwtPayload {
  uid: Schema.Types.ObjectId;
}

export const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-token");
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED) as IDecodedJwtPayload;
    req.uid = uid;
    next();
  } catch {
    throw new CustomError({ message: "You are not authenticated", statusCode: 401 });
  }
};
