import { MongoClient, Db } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'testdb';

const client = new MongoClient(MONGO_URI);

let db: Db;

export const connectDB = async (): Promise<Db> => {
  if (db) return db;
  await client.connect();
  db = client.db(DB_NAME);
  console.log('Connected to MongoDB');
  return db;
};

export default client;