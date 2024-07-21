import mongoose from "mongoose";
import("colors");

//connectdb Function

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected ${conn.connection.host}`.bgGreen.black);
  } catch (error) {
    console.log(`Mongodb Connection Error:- , ${error.message}`.bgRed);
    process.exit(1);
  }
};

export default connectdb;
