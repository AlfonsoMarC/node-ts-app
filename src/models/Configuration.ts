import { IConfiguration } from "@/types/models/configuration";
import { Schema, model } from "mongoose";

const configurationSchema = new Schema<IConfiguration>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: Schema.Types.Mixed,
    required: true
  }
});

const Configuration = model<IConfiguration>("Configuration", configurationSchema);

export default Configuration;
