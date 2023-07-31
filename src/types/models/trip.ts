import { Schema } from "mongoose";
import { ISite } from "./site";
import { IPost } from "./post";

export interface ITripRequestBody {
  name: string;
  startDate?: Date;
  endDate?: Date;
  sites?: ISite[];
  posts?: IPost[];
}

export interface ITrip extends ITripRequestBody {
  uid: Schema.Types.ObjectId;
}

export interface ITripModel extends ITrip, Document {}
