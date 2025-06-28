import mongoose from 'mongoose';

let MONGODB_URI: string | undefined = process.env.MONGODB_URI;

interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var _mongoose: MongooseConnection | undefined;
}

let cached: MongooseConnection;

if (!global._mongoose) {
  cached = global._mongoose = { conn: null, promise: null };
} else {
  cached = global._mongoose;
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    }
    cached.promise = mongoose
      .connect(MONGODB_URI as string, {
        dbName: process.env.MONGODB_DB_NAME || undefined,
      })
      .then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
} 