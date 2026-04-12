'use client';
// src/components/features/CategoryFilter.tsx
import { ChallengeCategory, ChallengeDifficulty } from '@/types';
import { useState } from 'react';

const CATEGORIES: { value: ChallengeCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua Bidang' },
  { value: 'web', label: 'Web' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'forensics', label: 'Forensik' },
  { value: 'pwn', label: 'Pwn' },
  { value: 'reverse', label: 'Reverse' },
  { value: 'misc', label: 'Lain-lain' },
];

const DIFFICULTIES: { value: ChallengeDifficulty | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua Level' },
  { value: 'easy', label: 'Mudah' },
  { value: 'medium', label: 'Lumayan' },
  { value: 'hard', label: 'Sulit' },
  { value: 'insane', label: 'Gokil' },
];

interface CategoryFilterProps {
  selectedCategory: string;
  selectedDifficulty: string;
  searchQuery: string;
  onCategoryChange: (cat: string) => void;
  onDifficultyChange: (diff: string) => void;
  onSearchChange: (q: string) => void;
}

export function CategoryFilter({
  selectedCategory,
  selectedDifficulty,
  searchQuery,
  onCategoryChange,
  onDifficultyChange,
  onSearchChange,
}: CategoryFilterProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Search */}
      <div style={{ position: 'relative' }}>
        <span style={{
          position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
          color: isSearchFocused ? '#00ff88' : 'rgba(226,232,240,0.3)',
          transition: 'color 0.2s',
          display: 'flex',
        }}>
          <svg style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
          </svg>
        </span>
        <input
          id="challenge-search"
          type="text"
          placeholder="Cari tantangan..."
          value={searchQuery}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%', height: 44, borderRadius: 10,
            background: isSearchFocused ? 'rgba(8,11,16,0.9)' : 'rgba(255,255,255,0.03)',
            border: isSearchFocused ? '1px solid #00ff88' : '1px solid rgba(255,255,255,0.08)',
            padding: '0 16px 0 44px',
            color: '#e2e8f0', fontSize: 13, fontFamily: 'Inter, sans-serif',
            outline: 'none',
            boxShadow: isSearchFocused ? '0 0 0 4px rgba(0,255,136,0.1)' : 'none',
            transition: 'all 0.2s',
          }}
        />
      </div>

      {/* Category filter */}
      <div>
        <p style={{ fontSize: 11, color: 'rgba(226,232,240,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, fontFamily: 'JetBrains Mono, monospace' }}>
          Kategori
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                id={`filter-category-${cat.value}`}
                onClick={() => onCategoryChange(cat.value)}
                style={{
                  padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
                  background: isSelected ? '#00ff88' : 'rgba(255,255,255,0.03)',
                  color: isSelected ? '#080b10' : 'rgba(226,232,240,0.6)',
                  border: isSelected ? '1px solid #00e57a' : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: isSelected ? '0 0 15px rgba(0,255,136,0.2)' : 'none',
                  outline: 'none',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulty filter */}
      <div>
        <p style={{ fontSize: 11, color: 'rgba(226,232,240,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, fontFamily: 'JetBrains Mono, monospace' }}>
          Level Kesulitan
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {DIFFICULTIES.map((diff) => {
            const isSelected = selectedDifficulty === diff.value;
            return (
              <button
                key={diff.value}
                id={`filter-difficulty-${diff.value}`}
                onClick={() => onDifficultyChange(diff.value)}
                style={{
                  padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
                  background: isSelected ? '#00ff88' : 'rgba(255,255,255,0.03)',
                  color: isSelected ? '#080b10' : 'rgba(226,232,240,0.6)',
                  border: isSelected ? '1px solid #00e57a' : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: isSelected ? '0 0 15px rgba(0,255,136,0.2)' : 'none',
                  outline: 'none',
                }}
              >
                {diff.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
