import { connectToDatabase } from '../../helpers/database'; // Create a helper to connect to DB

// API handler for job-market
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Fetch job listings
      await getJobs(req, res);
      break;

    case 'POST':
      // Create a new job listing
      await createJob(req, res);
      break;

    case 'PUT':
      // Update a job listing
      await updateJob(req, res);
      break;

    case 'DELETE':
      // Delete a job listing
      await deleteJob(req, res);
      break;

    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}

// Helper function to get job listings
const getJobs = async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const jobs = await db.collection('job_market').find({}).toArray(); // Replace 'job_market' with your actual collection name
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to create a new job listing
const createJob = async (req, res) => {
  const { title, company, location, description, requirements, expiration_date } = req.body;

  // Validate required fields
  if (!title || !company || !location || !description || !expiration_date) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const { db } = await connectToDatabase();
    const newJob = {
      title,
      company,
      location,
      description,
      requirements: requirements || [],
      expiration_date,
      status: 'open', // Default status for new jobs
      created_at: new Date().toISOString(),
      candidates: [],
      contact_info: {}, // Can be extended based on your requirements
      created_by: req.user.id, // If you want to associate with a user, or remove it if not needed
    };

    const result = await db.collection('job_market').insertOne(newJob);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to update an existing job listing
const updateJob = async (req, res) => {
  const { jobId, title, company, location, description, requirements, expiration_date } = req.body;

  if (!jobId) {
    return res.status(400).json({ message: 'Job ID is required' });
  }

  try {
    const { db } = await connectToDatabase();
    const updateData = {
      ...(title && { title }),
      ...(company && { company }),
      ...(location && { location }),
      ...(description && { description }),
      ...(requirements && { requirements }),
      ...(expiration_date && { expiration_date }),
    };

    const result = await db.collection('job_market').updateOne(
      { _id: new ObjectId(jobId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job updated successfully' });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to delete a job listing
const deleteJob = async (req, res) => {
  const { jobId } = req.query;

  if (!jobId) {
    return res.status(400).json({ message: 'Job ID is required' });
  }

  try {
    const { db } = await connectToDatabase();
    const result = await db.collection('job_market').deleteOne({ _id: new ObjectId(jobId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
