import { ISite } from "@/types/models/site";
import { Schema, model } from "mongoose";

const siteSchema = new Schema<ISite>({
  name: {
    type: String
  }
});

siteSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "site"
});

const Site = model<ISite>("Site", siteSchema);

export default Site;
