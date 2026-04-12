// src/lib/api-response.ts
import { NextResponse } from 'next/server';
import { ApiSuccess, ApiError } from '@/types';

/**
 * Creates a typed 200/201 success response.
 */
export function successResponse<T>(
  data: T,
  message?: string,
  status: 200 | 201 = 200,
): NextResponse<ApiSuccess<T>> {
  return NextResponse.json({ success: true, data, message }, { status });
}

/**
 * Creates a typed error response.
 */
export function errorResponse(
  error: string,
  status: 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500 = 400,
  details?: Record<string, string[]>,
): NextResponse<ApiError> {
  return NextResponse.json({ success: false, error, details }, { status });
}

/**
 * 401 Unauthorized shorthand.
 */
export function unauthorizedResponse(message = 'Unauthorized'): NextResponse<ApiError> {
  return errorResponse(message, 401);
}

/**
 * 403 Forbidden shorthand.
 */
export function forbiddenResponse(message = 'Forbidden'): NextResponse<ApiError> {
  return errorResponse(message, 403);
}

/**
 * 404 Not Found shorthand.
 */
export function notFoundResponse(message = 'Not found'): NextResponse<ApiError> {
  return errorResponse(message, 404);
}

/**
 * 409 Conflict shorthand.
 */
export function conflictResponse(message: string): NextResponse<ApiError> {
  return errorResponse(message, 409);
}

/**
 * 429 Too Many Requests shorthand.
 */
export function rateLimitResponse(retryAfterMs: number): NextResponse<ApiError> {
  const response = errorResponse('Too many requests. Please slow down.', 429);
  response.headers.set('Retry-After', String(Math.ceil(retryAfterMs / 1000)));
  return response;
}

/**
 * 500 Internal Server Error shorthand — logs the real error server-side.
 */
export function serverErrorResponse(error: unknown): NextResponse<ApiError> {
  console.error('[API Error]', error);
  return errorResponse('An internal server error occurred.', 500);
}
