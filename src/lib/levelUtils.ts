// src/lib/levelUtils.ts

export const XP_PER_LEVEL = 200;

/**
 * Validates and converts XP into a standardized Level number.
 */
export function calculateLevel(xp: number): number {
  if (xp < 0) return 1;
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

/**
 * Returns human-readable rank titles based on User Level.
 */
export function getRankTitle(level: number): string {
  if (level === 1) return 'Script Kiddie';
  if (level === 2) return 'Novice Explorer';
  if (level === 3) return 'Cyber Scout';
  if (level === 4) return 'Network Ranger';
  if (level === 5) return 'Junior Operative';
  if (level === 6) return 'Security Analyst';
  if (level === 7) return 'Senior Exploiter';
  if (level === 8) return 'Red Team Operator';
  if (level === 9) return 'Elite Hacker';
  if (level === 10) return 'Master Pwn';
  return 'Advanced Persistent Threat';
}

/**
 * Computes information required for drawing a progress bar to the next level.
 */
export function getLevelProgress(xp: number) {
  const currentLevel = calculateLevel(xp);
  const xpForCurrentLevel = (currentLevel - 1) * XP_PER_LEVEL;
  const xpForNextLevel = currentLevel * XP_PER_LEVEL;
  
  const currentLevelProgressXp = xp - xpForCurrentLevel;
  const percentage = Math.min(100, Math.max(0, (currentLevelProgressXp / XP_PER_LEVEL) * 100));

  return {
    currentLevel,
    title: getRankTitle(currentLevel),
    nextLevelXP: xpForNextLevel,
    currentXP: xp,
    progressPercentage: percentage,
    remainingXpToNext: xpForNextLevel - xp,
  };
}
