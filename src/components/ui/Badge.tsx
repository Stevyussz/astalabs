// src/components/ui/Badge.tsx
import { ChallengeCategory, ChallengeDifficulty } from '@/types';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | ChallengeCategory | ChallengeDifficulty;

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string; // Kept for API compatibility, though styles are inline
  style?: React.CSSProperties;
}

// Maps [Color, Background, Border]
const variantStyles: Partial<Record<BadgeVariant, [string, string, string]>> = {
  default: ['rgba(226,232,240,0.7)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.1)'],
  success: ['#34d399', 'rgba(16,185,129,0.15)', 'rgba(16,185,129,0.3)'],
  warning: ['#fbbf24', 'rgba(245,158,11,0.15)', 'rgba(245,158,11,0.3)'],
  danger:  ['#f87171', 'rgba(239,68,68,0.15)', 'rgba(239,68,68,0.3)'],
  info:    ['#00d4ff', 'rgba(0,212,255,0.15)', 'rgba(0,212,255,0.3)'],
  // Categories
  web:       ['#60a5fa', 'rgba(59,130,246,0.15)', 'rgba(59,130,246,0.3)'],
  crypto:    ['#c084fc', 'rgba(168,85,247,0.15)', 'rgba(168,85,247,0.3)'],
  forensics: ['#fbbf24', 'rgba(245,158,11,0.15)', 'rgba(245,158,11,0.3)'],
  pwn:       ['#f87171', 'rgba(239,68,68,0.15)', 'rgba(239,68,68,0.3)'],
  reverse:   ['#fb923c', 'rgba(249,115,22,0.15)', 'rgba(249,115,22,0.3)'],
  misc:      ['#2dd4bf', 'rgba(20,184,166,0.15)', 'rgba(20,184,166,0.3)'],
  // Difficulties
  easy:   ['#34d399', 'rgba(16,185,129,0.15)', 'rgba(16,185,129,0.3)'],
  medium: ['#fbbf24', 'rgba(245,158,11,0.15)', 'rgba(245,158,11,0.3)'],
  hard:   ['#fb923c', 'rgba(249,115,22,0.15)', 'rgba(249,115,22,0.3)'],
  insane: ['#f87171', 'rgba(239,68,68,0.15)', 'rgba(239,68,68,0.3)'],
};

export function Badge({ children, variant = 'default', className, style }: BadgeProps) {
  const [color, bg, border] = variantStyles[variant] ?? variantStyles.default!;

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '2px 8px', borderRadius: 4,
        fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
        fontFamily: 'Inter, sans-serif',
        color: color,
        background: bg,
        border: `1px solid ${border}`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
