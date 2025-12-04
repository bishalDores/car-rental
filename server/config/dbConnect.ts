import mongoose from "mongoose";

export async function dbConnect() {
  try {
    let connectionString = "";
    if (process.env.NODE_ENV === "development") connectionString = process.env.MONGO_URI_LOCAL!;
    else connectionString = process.env.MONGO_URI!;

    mongoose.connect(connectionString).then(() => {
      console.log("Connected to Mongo DB");
    });
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
