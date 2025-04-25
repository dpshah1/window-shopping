// lib/mongodb.js
import { MongoClient } from 'mongodb'

if (!process.env.DATABASE_KEY) {
  throw new Error('Please define the DATABASE_KEY environment variable inside .env.local')
}

const uri = process.env.DATABASE_KEY
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value is preserved across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export async function connectToDatabase() {
  const client = await clientPromise
  const db = client.db('window-shopping')
  return { client, db }
}
