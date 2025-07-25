import mongoose, { Mongoose } from 'mongoose'

declare global {
  // Allow global `mongoose` to be reused across reloads in dev
  var mongoose: {
    conn: Mongoose | null
    promise: Promise<Mongoose> | null
  }
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const mongoUri = process.env.MONGO_URI
    if (!mongoUri) throw new Error('MONGO_URI is not defined in environment variables')

    cached.promise = mongoose.connect(mongoUri)
  }

  cached.conn = await cached.promise
  return cached.conn
}
