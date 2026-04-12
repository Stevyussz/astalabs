// src/app/api/challenge/[id]/route.ts
import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { challengeService } from '@/services/challenge.service';
import { successResponse, notFoundResponse, serverErrorResponse } from '@/lib/api-response';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!id.match(/^[a-f\d]{24}$/i)) {
      return notFoundResponse('Challenge not found');
    }

    const solvedIds = session?.user
      ? [] // Populated via user profile lookup in real use
      : [];

    const challenge = await challengeService.getChallengeDetail(id, solvedIds);
    if (!challenge) {
      return notFoundResponse('Challenge not found');
    }

    return successResponse(challenge);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
