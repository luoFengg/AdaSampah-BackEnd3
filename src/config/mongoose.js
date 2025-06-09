import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/adasampah";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Koneksi ke MongoDB (Mongoose) berhasil");
  } catch (error) {
    console.error("Gagal koneksi ke MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
