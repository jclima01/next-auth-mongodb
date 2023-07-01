import mongoose from "mongoose";

const { DB_URI } = process.env;

if (!DB_URI) {
  throw new Error("DB_URI must be defined");
}

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(DB_URI);
    if (connection.readyState === 1) {
      console.log("MongoDB Connected");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};