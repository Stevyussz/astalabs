'use client';
// src/components/features/ChallengeCard.tsx
import Link from 'next/link';
import { PublicChallenge } from '@/types';
import { Badge } from '@/components/ui/Badge';

interface ChallengeCardProps {
  challenge: PublicChallenge;
}

const difficultyPoints: Record<string, string> = {
  easy: '#34d399',   // emerald-400
  medium: '#fbbf24', // amber-400
  hard: '#fb923c',   // orange-400
  insane: '#f87171', // red-400
};

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const diffColor = difficultyPoints[challenge.difficulty] || '#e2e8f0';
  
  return (
    <Link href={`/challenges/${challenge.id}`} id={`challenge-${challenge.id}`} style={{ textDecoration: 'none' }}>
      <div
        className="challenge-card"
        style={{
          position: 'relative',
          padding: 24, borderRadius: 16,
          background: 'rgba(255,255,255,0.03)',
          border: challenge.isSolved ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.08)',
          cursor: 'pointer', transition: 'all 0.3s',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = 'translateY(-4px)';
          el.style.background = 'rgba(255,255,255,0.06)';
          if (challenge.isSolved) {
            el.style.borderColor = 'rgba(16,185,129,0.6)';
            el.style.boxShadow = '0 0 25px rgba(16,185,129,0.15)';
          } else {
            el.style.borderColor = 'rgba(0,255,136,0.3)';
            el.style.boxShadow = '0 0 25px rgba(0,255,136,0.1)';
          }
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = 'translateY(0)';
          el.style.background = 'rgba(255,255,255,0.03)';
          if (challenge.isSolved) {
            el.style.borderColor = 'rgba(16,185,129,0.3)';
            el.style.boxShadow = 'none';
          } else {
            el.style.borderColor = 'rgba(255,255,255,0.08)';
            el.style.boxShadow = 'none';
          }
        }}
      >
        {/* Solved indicator */}
        {challenge.isSolved && (
          <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', alignItems: 'center', gap: 4, color: '#34d399', fontSize: 12, fontWeight: 600 }}>
            <svg style={{ width: 14, height: 14 }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Sikat
          </div>
        )}

        {/* Header */}
        <h3 style={{ fontSize: 18, fontWeight: 600, color: '#e2e8f0', marginBottom: 16, paddingRight: 64, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {challenge.title}
        </h3>

        {/* Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          <Badge variant={challenge.category}>{challenge.category}</Badge>
          <Badge variant={challenge.difficulty}>{challenge.difficulty}</Badge>
        </div>

        {/* Description */}
        <p style={{ fontSize: 14, color: 'rgba(226,232,240,0.5)', marginBottom: 20, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 42 }}>
          {challenge.description}
        </p>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 20, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace', color: diffColor }}>
            {challenge.points} pts
          </span>
          <span style={{ fontSize: 12, color: 'rgba(226,232,240,0.4)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg style={{ width: 14, height: 14 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
            </svg>
            {challenge.solveCount} operative
          </span>
        </div>
      </div>
    </Link>
  );
}
