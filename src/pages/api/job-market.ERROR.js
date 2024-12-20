import { connectToDatabase } from '../../helpers/database'; // Create a helper to connect to DB

// API handler for job-market
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Fetch job listings
      await getJobs(req, res);
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

    // Aggregation pipeline to join 'job_market' with 'users' collection
    const pipeline = [
      // Perform $lookup to join job_market with users based on created_by
      {
        $lookup: {
          from: 'users', // Join with 'users' collection
          localField: 'created_by', // Field in job_market to match
          foreignField: '_id', // Field in users collection to match
          as: 'user_info', // Alias for the joined data
        }
      },
      // Filter only those where the user's role is 'company'
      {
        $match: {
          'user_info.role': 'company',
        }
      },
      // Project necessary fields from job_market and user_info
      {
        $project: {
          title: 1,
          company: 1,
          location: 1,
          status: 1,
          expiration_date: 1,
          created_at: 1,
          candidates: 1,
          description: 1,
          requirements: 1,
          contact_info: 1,
          created_by: 1, // If you want to include created_by in the result
          user_info: { 
            role: 1, 
            _id: 1,
            nickname: 1,
            email: 1
          }, // Include user role and _id if needed
        }
      }
    ];

    // Execute the aggregation pipeline
    const jobs = await db.collection('job_market').aggregate(pipeline).toArray();
    
    // Return the resulting jobs
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
