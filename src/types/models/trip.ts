import { Schema } from "mongoose";
import { ISite } from "./site";
import { IPost } from "./post";

export interface ITrip {
  name: string;
  uid: Schema.Types.ObjectId;
  startDate?: Date;
  endDate?: Date;
  sites?: ISite[];
  posts?: IPost[];
}

export interface ITripModel extends ITrip, Document {}
