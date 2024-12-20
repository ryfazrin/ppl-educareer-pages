import { connectToDatabase } from "../../helpers/database";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { nickname } = req.query;

    if (!nickname) {
      return res.status(400).json({ message: 'Nickname is required' });
    }

    try {
      const { db } = await connectToDatabase();

      // Cek apakah nickname pengguna ada di koleksi `users`
      const user = await db.collection('users').findOne({ nickname });

      if (user) {
        return res.status(200).json({ user, found: true });
      } else {
        return res.status(200).json({ found: false });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
