// src/lib/badgeUtils.ts

export type BadgeId = 'initiate' | 'web_master' | 'crypto_wizard' | 'forensic_analyst' | 'pwn_master' | 'box_conqueror';

export interface Badge {
  id: BadgeId;
  name: string;
  description: string;
  iconType: string;
  color: string;
  glow: string;
}

export const BADGE_DEFINITIONS: Record<BadgeId, Omit<Badge, 'id'>> = {
  initiate: {
    name: 'Initiate',
    description: 'Bergabung dengan AstaLabs Academy dan siap menjadi Hacker.',
    iconType: 'user',
    color: '#94a3b8',
    glow: 'rgba(148,163,184,0.2)',
  },
  web_master: {
    name: 'Web Specialist',
    description: 'Menyelesaikan 5+ Misi Eksploitasi Web.',
    iconType: 'globe',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.2)',
  },
  crypto_wizard: {
    name: 'Crypto Wizard',
    description: 'Menyelesaikan 5+ Misi Kriptografi.',
    iconType: 'shield',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.2)',
  },
  forensic_analyst: {
    name: 'Forensic Analyst',
    description: 'Menyelesaikan 5+ Misi Forensik Digital.',
    iconType: 'search',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.2)',
  },
  pwn_master: {
    name: 'Pwn Master',
    description: 'Menyelesaikan 5+ Misi Eksploitasi Biner (Pwn).',
    iconType: 'terminal',
    color: '#ef4444',
    glow: 'rgba(239,68,68,0.2)',
  },
  box_conqueror: {
    name: 'AstaCorp Conqueror',
    description: 'Berhasil menembus target simulasi Server Boxground AstaCorp.',
    iconType: 'target',
    color: '#00ff88',
    glow: 'rgba(0,255,136,0.2)',
  },
};

/**
 * Parses populated challenges and calculates earned badges dynamically.
 */
export function calculateBadges(solvedChallenges: { category: string }[]): Badge[] {
  const earned: Badge[] = [{ id: 'initiate', ...BADGE_DEFINITIONS.initiate }];
  
  const categoryCounts: Record<string, number> = {};
  solvedChallenges.forEach((ch) => {
    categoryCounts[ch.category] = (categoryCounts[ch.category] || 0) + 1;
  });

  if ((categoryCounts['web'] || 0) >= 5) {
    earned.push({ id: 'web_master', ...BADGE_DEFINITIONS.web_master });
  }
  
  if ((categoryCounts['crypto'] || 0) >= 5) {
    earned.push({ id: 'crypto_wizard', ...BADGE_DEFINITIONS.crypto_wizard });
  }

  if ((categoryCounts['forensics'] || 0) >= 5) {
    earned.push({ id: 'forensic_analyst', ...BADGE_DEFINITIONS.forensic_analyst });
  }

  if ((categoryCounts['pwn'] || 0) >= 5) {
    earned.push({ id: 'pwn_master', ...BADGE_DEFINITIONS.pwn_master });
  }

  if ((categoryCounts['box-astacorp'] || 0) >= 1) {
    earned.push({ id: 'box_conqueror', ...BADGE_DEFINITIONS.box_conqueror });
  }

  return earned;
}
