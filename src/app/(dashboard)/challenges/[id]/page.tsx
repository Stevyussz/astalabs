'use client';
// src/app/(dashboard)/challenges/[id]/page.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { PublicChallenge } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { FlagSubmitForm } from '@/components/features/FlagSubmitForm';
import { HintAccordion } from '@/components/features/HintAccordion';
import { PageSpinner } from '@/components/ui/Spinner';
import { Icons } from '@/components/ui/Icons';
import { formatRelativeTime } from '@/lib/utils';

export default function ChallengeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const [challenge, setChallenge] = useState<PublicChallenge | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const res = await fetch(`/api/challenge/${id}`);
        const json = await res.json();
        if (json.success) {
          setChallenge(json.data);
          setSolved(json.data.isSolved ?? false);
        }
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [id]);

  if (isLoading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}><PageSpinner /></div>;
  if (!challenge) {
    return (
      <div style={{
        maxWidth: 600, margin: '80px auto',
        padding: '60px 24px', textAlign: 'center',
        background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 16
      }}>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
          <Icons.AlertTriangle size={64} color="rgba(226,232,240,0.2)" />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#e2e8f0', marginBottom: 8 }}>Target ilang dari radar</h1>
        <p style={{ color: 'rgba(226,232,240,0.5)', marginBottom: 24 }}>Misi ini nggak ada atau mungkin udah ditutup.</p>
        <Link href="/challenges" style={{ color: '#00ff88', textDecoration: 'none', fontWeight: 600 }}>
          ← Balik ke list misi
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1024, margin: '0 auto', padding: '40px 24px' }}>
      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(226,232,240,0.4)', marginBottom: 24, fontWeight: 500 }}>
        <Link href="/challenges" style={{ textDecoration: 'none', color: 'inherit' }}>Misi</Link>
        <span>/</span>
        <span style={{ color: 'rgba(226,232,240,0.7)' }}>{challenge.title}</span>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: 32 }} className="responsive-detail-grid">
        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Title & meta */}
          <div style={{
            background: 'rgba(13,17,23,0.7)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16, padding: 32, backdropFilter: 'blur(10px)',
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Badge variant={challenge.category}>{challenge.category}</Badge>
              <Badge variant={challenge.difficulty}>{challenge.difficulty}</Badge>
              {solved && <Badge variant="success">Solved ✓</Badge>}
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#e2e8f0', marginBottom: 24 }}>{challenge.title}</h1>

            {/* Description */}
            <div style={{
              background: 'rgba(0,0,0,0.3)', padding: 20, borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.05)',
            }}>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'rgba(226,232,240,0.8)',
                lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0
              }}>
                {challenge.description}
              </p>
            </div>
          </div>

          {/* Flag submission */}
          <div style={{
            background: 'rgba(13,17,23,0.7)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16, padding: 32, backdropFilter: 'blur(10px)',
          }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(226,232,240,0.5)', marginBottom: 20 }}>
              Submit Flag
            </h2>
            {session?.user ? (
              <FlagSubmitForm
                challengeId={challenge.id}
                isSolved={solved}
                onSolved={() => setSolved(true)}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <p style={{ color: 'rgba(226,232,240,0.5)', marginBottom: 20, fontSize: 15 }}>Butuh akses otorisasi buat submit flag.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                  <Link href="/login" style={{
                    display: 'inline-flex', alignItems: 'center', height: 40, padding: '0 24px', borderRadius: 8,
                    background: '#00ff88', color: '#080b10', fontWeight: 700, textDecoration: 'none', fontSize: 14,
                  }}>Login Sekarang</Link>
                  <Link href="/register" style={{
                    display: 'inline-flex', alignItems: 'center', height: 40, padding: '0 24px', borderRadius: 8,
                    background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(226,232,240,0.7)', fontWeight: 500, textDecoration: 'none', fontSize: 14,
                  }}>Join Murid</Link>
                </div>
              </div>
            )}
          </div>

          {/* Hints */}
          {challenge.hints && challenge.hints.length > 0 && (
            <div style={{
              background: 'rgba(13,17,23,0.7)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: 32, backdropFilter: 'blur(10px)',
            }}>
              <HintAccordion hints={challenge.hints} />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Point card */}
          <div style={{
            background: 'rgba(13,17,23,0.7)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16, padding: 24, textAlign: 'center', backdropFilter: 'blur(10px)',
          }}>
            <p style={{ fontSize: 12, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(226,232,240,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
              Bounty XP
            </p>
            <p style={{ fontSize: 36, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace', color: '#00ff88', textShadow: '0 0 20px rgba(0,255,136,0.3)' }}>
              {challenge.points}
            </p>
          </div>

          {/* Stats card */}
          <div style={{
            background: 'rgba(13,17,23,0.7)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16, padding: 24, backdropFilter: 'blur(10px)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 14, color: 'rgba(226,232,240,0.4)' }}>Operative</span>
              <span style={{ fontSize: 14, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', color: '#e2e8f0' }}>{challenge.solveCount}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, color: 'rgba(226,232,240,0.4)' }}>Status</span>
              <span style={{ fontSize: 14, color: '#00ff88' }}>Deployed</span>
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .responsive-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
