import { connectDB } from './src/lib/db';
import User from './src/models/User';

async function testUserQuery() {
  await connectDB();
  const rawUsername = 'Stevyxyz'; // Simulating URL param
  const user = await User.findOne({ username: { $regex: new RegExp(`^${rawUsername}$`, 'i') } }).lean();
  console.log('Test User Search Result:', user);
  process.exit(0);
}

testUserQuery();
