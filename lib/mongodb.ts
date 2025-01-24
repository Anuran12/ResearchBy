import mongoose from "mongoose";

// Define a type for the cached connection
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Extend the global object explicitly
const globalForMongoose = global as typeof global & {
  mongoose?: MongooseCache;
};

// Ensure the MONGODB_URI environment variable is defined
if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

// Initialize or retrieve the cached connection object
const cached: MongooseCache = globalForMongoose.mongoose || {
  conn: null,
  promise: null,
};

if (!globalForMongoose.mongoose) {
  globalForMongoose.mongoose = cached;
}

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
      socketTimeoutMS: 45000, // Close sockets after 45s
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;
