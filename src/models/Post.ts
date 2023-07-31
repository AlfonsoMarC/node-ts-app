import { IPost } from "@/types/models/post";
import { Schema, model } from "mongoose";

const postSchema = new Schema<IPost>({
  img: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  comment: {
    type: String
  },
  sites: {
    type: Schema.Types.ObjectId,
    ref: "Site"
  },
  trip: {
    type: Schema.Types.ObjectId,
    ref: "Trip"
  }
});

const Post = model<IPost>("Post", postSchema);

export default Post;
