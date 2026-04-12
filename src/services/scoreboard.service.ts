// src/services/scoreboard.service.ts
import { userRepository } from '@/repositories/user.repository';
import { ScoreboardEntry } from '@/types';

interface CacheEntry {
  data: ScoreboardEntry[];
  expiresAt: number;
}

// In-memory cache to avoid hammering DB on every scoreboard view
const cache: CacheEntry = {
  data: [],
  expiresAt: 0,
};

const CACHE_TTL_MS = 60 * 1000; // 60 seconds

export class ScoreboardService {
  /**
   * Get ranked scoreboard with in-memory caching.
   * Cache TTL: 60 seconds.
   */
  async getScoreboard(forceRefresh = false): Promise<ScoreboardEntry[]> {
    const now = Date.now();

    if (!forceRefresh && cache.expiresAt > now && cache.data.length > 0) {
      return cache.data;
    }

    const entries = await userRepository.getScoreboard(100);

    cache.data = entries;
    cache.expiresAt = now + CACHE_TTL_MS;

    return entries;
  }

  /** Invalidate the scoreboard cache (called after score update). */
  invalidateCache(): void {
    cache.expiresAt = 0;
  }
}

export const scoreboardService = new ScoreboardService();
