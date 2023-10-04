/* eslint-disable no-console */
import mongoose from "mongoose";

const dbConnection = async () => {
  const dbcnn = process.env.DB_CNN;
  try {
    if (!dbcnn) {
      throw new Error();
    }
    await mongoose.connect(dbcnn);
    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("Error initializing DB");
  }
};

export default dbConnection;
