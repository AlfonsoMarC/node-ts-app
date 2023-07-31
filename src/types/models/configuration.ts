import { Document } from "mongoose";

export interface IConfiguration {
  name: string;
  value: any;
}

export interface IConfigurationModel extends IConfiguration, Document {}
