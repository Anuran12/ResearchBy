import mongoose from "mongoose";

// Define a type for the cached connection
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Extend the global object to include the `mongoose` property
declare global {
  var mongoose: MongooseCache | undefined; // Use `var` only in `declare global`
}

// Ensure the MONGODB_URI environment variable is defined
if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

const MONGODB_URI: string = process.env.MONGODB_URI;

// Use a cached global variable for the connection
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached; // Initialize global.mongoose
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((m) => m.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
