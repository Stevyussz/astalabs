// src/lib/rate-limit.ts

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimiterOptions {
  /** Max requests allowed per window */
  limit: number;
  /** Window duration in milliseconds */
  windowMs: number;
  /** Key prefix to namespace different limiters */
  prefix?: string;
}

// In-memory store — suitable for single-instance deployments
// For multi-instance setups, replace with Redis
const store = new Map<string, RateLimitEntry>();

// Cleanup expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt < now) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
  limit: number;
}

/**
 * Sliding window rate limiter.
 * Returns whether the request is allowed and metadata for headers.
 */
export function rateLimit(identifier: string, options: RateLimiterOptions): RateLimitResult {
  const { limit, windowMs, prefix = 'rl' } = options;
  const key = `${prefix}:${identifier}`;
  const now = Date.now();

  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    // New window
    const newEntry: RateLimitEntry = { count: 1, resetAt: now + windowMs };
    store.set(key, newEntry);
    return { success: true, remaining: limit - 1, resetAt: newEntry.resetAt, limit };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0, resetAt: entry.resetAt, limit };
  }

  entry.count += 1;
  return { success: true, remaining: limit - entry.count, resetAt: entry.resetAt, limit };
}

/**
 * Pre-configured rate limiters for specific endpoints.
 */
export const rateLimiters = {
  /** 10 submissions per minute per user */
  submission: (userId: string) =>
    rateLimit(userId, { limit: 10, windowMs: 60_000, prefix: 'sub' }),

  /** 5 register attempts per hour per IP */
  register: (ip: string) =>
    rateLimit(ip, { limit: 5, windowMs: 60 * 60_000, prefix: 'reg' }),

  /** 10 login attempts per 15 minutes per IP */
  login: (ip: string) =>
    rateLimit(ip, { limit: 10, windowMs: 15 * 60_000, prefix: 'login' }),

  /** General API: 100 req/min */
  api: (identifier: string) =>
    rateLimit(identifier, { limit: 100, windowMs: 60_000, prefix: 'api' }),
};

// ─── Cooldown System ─────────────────────────────────────────────────────────

const cooldownStore = new Map<string, number>();

/**
 * Enforce a per-user, per-challenge cooldown between submissions.
 * Prevents rapid brute-force attempts.
 * @returns milliseconds until the cooldown expires, or 0 if clear
 */
export function checkSubmissionCooldown(
  userId: string,
  challengeId: string,
  cooldownMs = 5000,
): number {
  const key = `cooldown:${userId}:${challengeId}`;
  const lastSubmit = cooldownStore.get(key);
  const now = Date.now();

  if (lastSubmit && now - lastSubmit < cooldownMs) {
    return cooldownMs - (now - lastSubmit);
  }

  cooldownStore.set(key, now);
  return 0;
}
