import { Schema } from "mongoose";

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      uid: Schema.Types.ObjectId;
    }
  }
}
