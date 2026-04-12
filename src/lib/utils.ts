// src/lib/utils.ts
import { createHash } from 'crypto';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Hash a flag using SHA-256. Used for storing flags and comparing submissions.
 * We use SHA-256 (not bcrypt) for flags because:
 * 1. Flags are not user-chosen (no rainbow table risk if stored with context)
 * 2. We need fast comparison during high-volume CTF events
 */
export function hashFlag(flag: string): string {
  return createHash('sha256').update(flag.trim()).digest('hex');
}

/**
 * Compare a raw flag submission against a stored SHA-256 hash.
 * Constant-time via Node crypto, not a simple string compare.
 */
export function compareFlag(submittedFlag: string, storedHash: string): boolean {
  const submittedHash = hashFlag(submittedFlag);
  // Use timingSafeEqual via Buffer to prevent timing attacks
  const a = Buffer.from(submittedHash, 'hex');
  const b = Buffer.from(storedHash, 'hex');
  if (a.length !== b.length) return false;
  return a.equals(b);
}

/**
 * Tailwind className merger utility.
 * Combines clsx condition handling with tailwind-merge deduplication.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a human-readable string.
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

/**
 * Format a relative time string (e.g., "2 hours ago").
 */
export function formatRelativeTime(date: Date | string): string {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diff = now - then;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return `${seconds}s ago`;
}

/**
 * Safely serialize a Mongoose document to a plain object.
 * Removes `__v` and converts `_id` to `id`.
 */
export function serializeDocument<T extends Record<string, unknown>>(
  doc: T,
): Omit<T, '_id' | '__v'> & { id: string } {
  const { _id, __v, ...rest } = doc as Record<string, unknown> & {
    _id: { toString: () => string };
    __v: unknown;
  };
  return { ...rest, id: _id.toString() } as Omit<T, '_id' | '__v'> & { id: string };
}
