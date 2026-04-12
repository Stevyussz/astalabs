// src/app/api/scoreboard/route.ts
import { NextRequest } from 'next/server';
import { scoreboardService } from '@/services/scoreboard.service';
import { successResponse, serverErrorResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const forceRefresh = request.nextUrl.searchParams.get('refresh') === 'true';
    const entries = await scoreboardService.getScoreboard(forceRefresh);

    return successResponse(entries);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
