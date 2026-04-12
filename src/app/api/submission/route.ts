// src/app/api/submission/route.ts
import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { submissionService } from '@/services/submission.service';
import { submitFlagSchema } from '@/validations/submission';
import {
  successResponse,
  unauthorizedResponse,
  errorResponse,
  serverErrorResponse,
  rateLimitResponse,
} from '@/lib/api-response';
import { rateLimiters } from '@/lib/rate-limit';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // Auth check
    const session = await auth();
    if (!session?.user?.id) {
      return unauthorizedResponse('You must be logged in to submit a flag.');
    }

    // Rate limiting: 10 submissions per minute per user
    const rl = rateLimiters.submission(session.user.id);
    if (!rl.success) {
      return rateLimitResponse(rl.resetAt - Date.now());
    }

    const body = await request.json();
    const validatedInput = submitFlagSchema.parse(body);

    const result = await submissionService.submitFlag(validatedInput, session.user.id);

    return successResponse(result, result.message);
  } catch (error) {
    if (error instanceof ZodError) {
      const details = Object.fromEntries(
        error.issues.map((issue) => [issue.path.join('.'), [issue.message]]),
      );
      return errorResponse('Validation failed', 422, details);
    }

    if (error instanceof Error) {
      if (error.message.startsWith('COOLDOWN:')) {
        const ms = parseInt(error.message.split(':')[1], 10);
        return rateLimitResponse(ms);
      }
      if (error.message === 'CHALLENGE_NOT_FOUND') {
        return errorResponse('Challenge not found or inactive', 404);
      }
    }

    return serverErrorResponse(error);
  }
}
