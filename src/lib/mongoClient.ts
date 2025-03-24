import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URI;

if (!MONGO_URL) throw new Error("is not define mongo url");

let isConnected = false;

export const connectDb = async () => {
  if (isConnected) {
    console.log("✅ Already connected to MongoDB");
    return;
  }

  try {
    const { connection } = await mongoose.connect(MONGO_URL,{
      dbName:"admin-panel",
      bufferCommands:false
    });
    isConnected = connection.readyState === 1;
    console.log('🚀 Connected to MongoDB')
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit();
  }
};
