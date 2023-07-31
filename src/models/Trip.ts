import { ITrip } from "@/types/models/trip";
import { Schema, model } from "mongoose";

const tripSchema = new Schema<ITrip>({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  uid: {
    type: Schema.Types.ObjectId
  },
  sites: [{ type: Schema.Types.ObjectId, ref: "Site" }]
});

tripSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "trip"
});

const Trip = model<ITrip>("Trip", tripSchema);

export default Trip;
