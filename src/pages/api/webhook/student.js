import { connectToDatabase } from "@helpers/database";

export default async function handler(req, res) {
  const { method } = req;

  try {
    const { db } = await connectToDatabase();

    if (method === 'GET') {
      // Fetch data from a collection
      const data = await db.collection('users').find({}).toArray();
      return res.status(200).json(data);
    }
    // Handle other HTTP methods (PUT, DELETE, etc.)
    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
