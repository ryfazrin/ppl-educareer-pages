import { MongoClient } from 'mongodb';

const uri = "mongodb://mkrs:Ojolali123@46.250.229.129:27017/torism?authSource=admin";

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db('educareer'); // Replace with your actual database name

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}