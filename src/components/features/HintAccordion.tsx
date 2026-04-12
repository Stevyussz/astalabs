'use client';
// src/components/features/HintAccordion.tsx
import { useState } from 'react';
import { IHint } from '@/types';

interface HintAccordionProps {
  hints: IHint[];
}

export function HintAccordion({ hints }: HintAccordionProps) {
  const [revealedHints, setRevealedHints] = useState<Set<number>>(new Set());

  if (!hints || hints.length === 0) return null;

  const toggleHint = (index: number) => {
    setRevealedHints((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{
        fontSize: 12, color: 'rgba(226,232,240,0.4)', textTransform: 'uppercase',
        letterSpacing: '0.1em', fontFamily: 'JetBrains Mono, monospace', marginBottom: 12
      }}>
        Petunjuk Tersedia ({hints.length})
      </p>
      
      {hints.map((hint, index) => {
        const isRevealed = revealedHints.has(index);
        return (
          <div
            key={index}
            style={{
              borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden', background: 'rgba(255,255,255,0.02)'
            }}
          >
            <button
              id={`hint-toggle-${index}`}
              onClick={() => toggleHint(index)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', textAlign: 'left', background: 'transparent',
                border: 'none', cursor: 'pointer', outline: 'none'
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 500, color: 'rgba(226,232,240,0.7)', fontFamily: 'Inter, sans-serif' }}>
                Petunjuk {index + 1}
                {hint.cost > 0 && (
                  <span style={{ marginLeft: 8, fontSize: 12, color: 'rgba(251,191,36,0.7)' }}>
                    (-{hint.cost} pts)
                  </span>
                )}
              </span>
              <svg
                style={{
                  width: 16, height: 16, color: 'rgba(226,232,240,0.4)',
                  transition: 'transform 0.2s',
                  transform: isRevealed ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isRevealed && (
              <div style={{
                padding: '4px 16px 16px 16px', background: 'rgba(255,255,255,0.02)',
                borderTop: '1px solid rgba(255,255,255,0.08)'
              }}>
                <p style={{
                  fontSize: 14, color: 'rgba(226,232,240,0.7)', fontFamily: 'JetBrains Mono, monospace',
                  lineHeight: 1.6, margin: 0
                }}>
                  {hint.content}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
