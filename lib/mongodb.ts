import mongoose from "mongoose";

declare global {
  namespace NodeJS {
    interface Global {
      mongoose?: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
      };
    }
  }
}

// Ensure MONGODB_URI is defined
if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

const MONGODB_URI: string = process.env.MONGODB_URI;

// Use a global variable to cache the connection
const globalWithMongoose = global as typeof globalThis & {
  mongoose?: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

const cached = globalWithMongoose.mongoose;

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
