import { connectToDatabase } from '@/helpers/database';
import {ObjectId} from "mongodb"; // Create a helper to connect to DB

// API handler for job-market
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      // Create a new job listing
      await applyJob(req, res);
      break;

    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}

// Helper function to create a new job listing
const applyJob = async (req, res) => {
  const { userId, jobId } = req.body;

  // Validate required fields
  if (!userId || !jobId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const { db } = await connectToDatabase();

    // Check if the job exists
    const job = await db.collection('job_market').findOne({ _id: ObjectId(jobId) });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Add candidate to the job
    const result = await db.collection('job_market').updateOne(
        { _id: ObjectId(jobId) },
        { $addToSet: { candidates: ObjectId(userId) } } // Prevent duplicate candidates
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: 'Candidate already applied or no changes made' });
    }

    res.status(200).json({ message: 'Candidate successfully added to the job', jobId, userId });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
