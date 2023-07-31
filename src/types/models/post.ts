import { Schema } from "mongoose";

export interface IPost {
  img: string;
  title: string;
  comment: string;
  sites: Schema.Types.ObjectId;
  trip: Schema.Types.ObjectId;
}

export interface IPostModel extends IPost, Document {}
