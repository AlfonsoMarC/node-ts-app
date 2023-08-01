import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Schema } from "mongoose";
import { CustomError } from "@/models/CustomError";
import User from "@/models/User";

interface IDecodedJwtPayload extends JwtPayload {
  uid: Schema.Types.ObjectId;
}

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-token");
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED) as IDecodedJwtPayload;
    const authUser = await User.findById(uid);
    req.uid = uid;
    req.authUser = authUser;
    next();
  } catch {
    throw new CustomError({ message: "You are not authenticated", statusCode: 401 });
  }
};
