
import { connectToDatabase } from "@/helpers/database";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { company_id } = req.query;

    try {
      const { db } = await connectToDatabase();

      // Cek apakah nickname pengguna ada di koleksi `users`
      const companies = await db.collection('company').aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'created_by',
            foreignField: '_id',
            as: 'created_by'
          }
        },
        {
          $unwind: '$created_by'
        }
      ]).toArray();

      return res.status(200).json({ companies });
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
