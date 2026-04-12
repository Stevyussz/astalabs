// src/app/api/challenge/route.ts
import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { challengeService } from '@/services/challenge.service';
import { filterChallengeSchema } from '@/validations/challenge';
import { successResponse, serverErrorResponse, errorResponse } from '@/lib/api-response';
import { ZodError } from 'zod';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const { searchParams } = new URL(request.url);

    const rawFilter = {
      category: searchParams.get('category') ?? undefined,
      difficulty: searchParams.get('difficulty') ?? undefined,
      search: searchParams.get('search') ?? undefined,
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
    };

    const filter = filterChallengeSchema.parse(rawFilter);
    const solvedIds = session?.user?.id
      ? [] // Will be populated from user's solvedChallenges in a real fetch
      : [];

    const result = await challengeService.getChallenges(filter, solvedIds);

    return successResponse(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse('Invalid filter parameters', 422);
    }
    return serverErrorResponse(error);
  }
}
