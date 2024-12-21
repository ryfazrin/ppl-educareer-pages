import { connectToDatabase } from "@/helpers/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      await syncStudent(req, res);
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}

const getNickname = (email) => {
  const match = email.match(/^([^@]+)/);
  return match ? match[1] : null;
};

const syncStudent = async (req, res) => {
  const { secret, email, ...userData } = req.body;

  if (!secret || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const { db } = await connectToDatabase();

    // Step 1: Validasi token dan mendapatkan instance group
    const group = await db.collection('group').findOne({ secret: secret });

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Step 2: Tambahkan student ke collection 'students'
    const studentAccount = {
      email: email,
      role: 'student',
      nickname: getNickname(email)
    }
    const student = await db.collection('users').insertOne(studentAccount);

    if (!student.acknowledged) {
      return res.status(500).json({ message: 'Failed to add student' });
    }

    const studenDetail = await db.collection('user_details').insertOne({
      ...userData, user_id: new ObjectId(student.insertedId)
    })

    // Step 3: Tambahkan student ke group.members
    const updatedGroup = await db.collection('group').updateOne(
        { _id: new ObjectId(group._id) }, // Pastikan group._id adalah ObjectId
        { $push: { members: new ObjectId(student.insertedId) } } // Tambahkan student.insertedId sebagai ObjectId
    );

    // Debugging untuk hasil pembaruan
    console.log('Group Update Result:', updatedGroup);

    if (!updatedGroup.matchedCount) {
      return res.status(404).json({ message: 'Group not found for update' });
    }

    if (!updatedGroup.modifiedCount) {
      return res.status(500).json({ message: 'Failed to update group members' });
    }

    return res.status(200).json({
      message: 'Student added to group successfully',
      studentId: student.insertedId,
    });

  } catch (error) {
    console.error('Error syncing student:', error);
    res.status(500).json({ message: 'Server error' });
  }
}