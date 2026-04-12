// src/app/api/auth/register/route.ts
import { NextRequest } from 'next/server';
import { authService } from '@/services/auth.service';
import { registerSchema } from '@/validations/auth';
import {
  successResponse,
  errorResponse,
  conflictResponse,
  serverErrorResponse,
  rateLimitResponse,
} from '@/lib/api-response';
import { rateLimiters } from '@/lib/rate-limit';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 registrations per hour per IP
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown';
    const rl = rateLimiters.register(ip);
    if (!rl.success) {
      return rateLimitResponse(rl.resetAt - Date.now());
    }

    const body = await request.json();
    const validatedInput = registerSchema.parse(body);

    const user = await authService.register(validatedInput);

    return successResponse(user, 'Account created successfully!', 201);
  } catch (error) {
    if (error instanceof ZodError) {
      const details = Object.fromEntries(
        error.issues.map((issue) => [issue.path.join('.'), [issue.message]]),
      );
      return errorResponse('Validation failed', 422, details);
    }

    if (error instanceof Error) {
      if (error.message === 'EMAIL_TAKEN') {
        return conflictResponse('An account with this email already exists.');
      }
      if (error.message === 'USERNAME_TAKEN') {
        return conflictResponse('This username is already taken.');
      }
    }

    return serverErrorResponse(error);
  }
}
