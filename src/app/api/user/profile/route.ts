// src/app/api/user/profile/route.ts
import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { userRepository } from '@/repositories/user.repository';
import { successResponse, unauthorizedResponse, notFoundResponse, serverErrorResponse } from '@/lib/api-response';

export async function GET(_request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }

    const user = await userRepository.findById(session.user.id);
    if (!user) {
      return notFoundResponse('User not found');
    }

    // Project only safe fields
    const profile = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      score: user.score,
      solvedChallenges: user.solvedChallenges.map(String),
      createdAt: user.createdAt,
    };

    return successResponse(profile);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
