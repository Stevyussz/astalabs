'use client';
// src/app/(dashboard)/challenges/page.tsx
import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { ChallengeCard } from '@/components/features/ChallengeCard';
import { CategoryFilter } from '@/components/features/CategoryFilter';
import { Icons } from '@/components/ui/Icons';
import { PageSpinner } from '@/components/ui/Spinner';
import { PublicChallenge, PaginatedResult } from '@/types';

export default function ChallengesPage() {
  const { data: session } = useSession();
  const [challenges, setChallenges] = useState<PublicChallenge[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [search, setSearch] = useState('');

  const fetchChallenges = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (category !== 'all') params.set('category', category);
      if (difficulty !== 'all') params.set('difficulty', difficulty);
      if (search) params.set('search', search);

      const res = await fetch(`/api/challenge?${params.toString()}`);
      const json = await res.json();

      if (json.success) {
        const result = json.data as PaginatedResult<PublicChallenge>;
        setChallenges(result.items);
        setTotal(result.total);
      }
    } catch (error) {
      console.error('Failed to fetch challenges:', error);
    } finally {
      setIsLoading(false);
    }
  }, [category, difficulty, search]);

  useEffect(() => {
    const timer = setTimeout(fetchChallenges, search ? 400 : 0);
    return () => clearTimeout(timer);
  }, [fetchChallenges, search]);

  const solvedCount = challenges.filter((c) => c.isSolved).length;

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 24 }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#e2e8f0', letterSpacing: '-0.02em', margin: 0 }}>
          <span style={{ color: '#00ff88', fontFamily: 'JetBrains Mono, monospace' }}>{'>'}_</span> Daftar Misi
        </h1>
        <p style={{ marginTop: 8, fontSize: 15, color: 'rgba(226,232,240,0.5)', lineHeight: 1.6 }}>
          {session?.user
            ? `${solvedCount} ke-solve — gaskeun lanjutin!`
            : 'Login dulu buat nyatet progres kamu dan submit flag.'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr', gap: 32, alignItems: 'start' }} className="responsive-challenges-grid">
        {/* Sidebar filters */}
        <aside style={{ position: 'sticky', top: 90 }}>
          <div style={{
            background: 'rgba(13,17,23,0.7)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: 24,
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            backdropFilter: 'blur(10px)',
          }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#00ff88', marginBottom: 20 }}>
              Misi & Filter
            </h2>
            <CategoryFilter
              selectedCategory={category}
              selectedDifficulty={difficulty}
              searchQuery={search}
              onCategoryChange={setCategory}
              onDifficultyChange={setDifficulty}
              onSearchChange={setSearch}
            />
          </div>
        </aside>

        {/* Challenge grid */}
        <div>
          {/* Results header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: 'rgba(226,232,240,0.5)' }}>
              {isLoading ? 'Scanning matriks...' : `${total} misi ketemu`}
            </p>
          </div>

          {isLoading ? (
            <div style={{ minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PageSpinner />
            </div>
          ) : challenges.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '80px 24px',
              border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 16,
              background: 'rgba(255,255,255,0.02)'
            }}>
              <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
                <Icons.Radar size={64} color="rgba(226,232,240,0.2)" />
              </div>
              <p style={{ fontSize: 18, fontWeight: 600, color: '#e2e8f0', marginBottom: 4 }}>Target ilang dari radar</p>
              <p style={{ fontSize: 14, color: 'rgba(226,232,240,0.5)' }}>Coba cek lagi pencarian atau filter kamu.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 20,
            }}>
              {challenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .responsive-challenges-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
