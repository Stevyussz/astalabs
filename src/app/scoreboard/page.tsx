'use client';
// src/app/scoreboard/page.tsx
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ScoreboardTable } from '@/components/features/ScoreboardTable';
import { ScoreboardEntry } from '@/types';
import { PageSpinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/ui/Icons';

export default function ScoreboardPage() {
  const { data: session } = useSession();
  const [entries, setEntries] = useState<ScoreboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchScoreboard = async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      const url = forceRefresh ? '/api/scoreboard?refresh=true' : '/api/scoreboard';
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) {
        setEntries(json.data);
        setLastUpdated(new Date());
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScoreboard();
    // Auto-refresh every 60 seconds
    const interval = setInterval(() => fetchScoreboard(), 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ maxWidth: 1024, margin: '0 auto', padding: '40px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#e2e8f0', letterSpacing: '-0.02em', margin: 0 }}>
            <span style={{ color: '#00ff88', fontFamily: 'JetBrains Mono, monospace' }}>{'>'}_</span> Ranking Operative
          </h1>
          <p style={{ marginTop: 8, fontSize: 14, color: 'rgba(226,232,240,0.5)' }}>
            {lastUpdated ? `Update terakhir: ${lastUpdated.toLocaleTimeString()}` : 'Lagi ngitung ranking...'}
          </p>
        </div>
        <Button
          id="refresh-scoreboard"
          variant="secondary"
          size="sm"
          onClick={() => fetchScoreboard(true)}
          isLoading={isLoading}
        >
          <svg style={{ width: 14, height: 14 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Data
        </Button>
      </div>

      {/* Top 3 podium */}
      {!isLoading && entries.length >= 3 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40, alignItems: 'end' }}>
          {[entries[1], entries[0], entries[2]].map((entry, i) => {
            if (!entry) return null;
            const isPrimary = i === 1; // center = 1st place
            
            // Inline styling logic for podium
            const heights = [120, 160, 100];
            const colors = [
              { border: 'rgba(148,163,184,0.3)', bg: 'rgba(148,163,184,0.05)', text: '#cbd5e1' }, // 2nd (slate)
              { border: 'rgba(251,191,36,0.4)', bg: 'rgba(251,191,36,0.08)', text: '#fbbf24', shadow: '0 0 30px rgba(251,191,36,0.1)' }, // 1st (amber)
              { border: 'rgba(180,83,9,0.3)', bg: 'rgba(180,83,9,0.05)', text: '#d97706' }, // 3rd (amber dark)
            ];
            
            const currentObj = colors[i];
            
            return (
              <div key={entry.id} style={{
                borderRadius: 16,
                border: `1px solid ${currentObj.border}`,
                background: currentObj.bg,
                boxShadow: (currentObj as any).shadow || 'none',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
                padding: '16px 8px',
                height: heights[i],
                position: 'relative',
              }}>
                <div style={{ marginBottom: 8, position: 'absolute', top: -16 }}>
                  <Icons.Medal size={28} color={currentObj.text} style={{ filter: `drop-shadow(0 0 10px ${currentObj.text}66)` }} />
                </div>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 700, color: currentObj.text,
                  boxShadow: isPrimary ? '0 0 0 2px rgba(251,191,36,0.5)' : 'none',
                  marginBottom: 8,
                }}>
                  {entry.username[0]?.toUpperCase()}
                </div>
                <p style={{
                  fontSize: 13, fontWeight: 600,
                  maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  color: isPrimary ? '#e2e8f0' : 'rgba(226,232,240,0.7)',
                  marginBottom: 4,
                }}>
                  {entry.username}
                </p>
                <p style={{ fontSize: 16, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace', color: currentObj.text }}>
                  {entry.score}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {isLoading ? (
        <div style={{ minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PageSpinner />
        </div>
      ) : (
        <ScoreboardTable entries={entries} currentUserId={session?.user?.id} />
      )}
    </div>
  );
}
