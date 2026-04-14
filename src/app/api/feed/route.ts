// src/app/api/feed/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Submission from '@/models/Submission';
import { successResponse, serverErrorResponse } from '@/lib/api-response';

export const dynamic = 'force-dynamic'; // DO NOT cache the Live Feed

export async function GET() {
  try {
    await connectDB();

    // Fetch the last 25 correct submissions (chronological order limit 25)
    const topFeeds = await Submission.find({ isCorrect: true })
      .sort({ createdAt: -1 })
      .limit(25)
      .populate('userId', 'username score')
      .populate('challengeId', 'title category points')
      .lean();

    return successResponse(topFeeds, 'Feed retrieved successfully');
  } catch (error) {
    return serverErrorResponse(error);
  }
}
