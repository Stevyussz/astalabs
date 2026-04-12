'use client';
// src/app/(dashboard)/profile/page.tsx
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { formatDate } from '@/lib/utils';
import { PageSpinner } from '@/components/ui/Spinner';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  score: number;
  solvedChallenges: string[];
  createdAt: Date;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/user/profile');
        const json = await res.json();
        if (json.success) setProfile(json.data);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  if (isLoading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}><PageSpinner /></div>;
  }

  if (!profile) {
    return (
      <div style={{
        maxWidth: 600, margin: '80px auto',
        padding: '60px 24px', textAlign: 'center',
        background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 16
      }}>
        <p style={{ color: 'rgba(226,232,240,0.5)' }}>Gagal memuat profil koneksi.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1024, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#e2e8f0', letterSpacing: '-0.02em', margin: '0 0 40px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 24 }}>
        <span style={{ color: '#00ff88', fontFamily: 'JetBrains Mono, monospace' }}>{'>'}_</span> Identitas Operative
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 32 }} className="responsive-profile-grid">
        {/* Profile card */}
        <div>
          <div style={{
            background: 'rgba(13,17,23,0.7)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16, padding: 32, textAlign: 'center', backdropFilter: 'blur(10px)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{
              width: 96, height: 96, borderRadius: '50%',
              background: 'rgba(0,255,136,0.1)', border: '2px solid rgba(0,255,136,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 36, fontWeight: 800, color: '#00ff88',
              margin: '0 auto 20px',
              boxShadow: '0 0 30px rgba(0,255,136,0.2)'
            }}>
              {profile.username[0]?.toUpperCase() ?? '?'}
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#e2e8f0', marginBottom: 4 }}>{profile.username}</h2>
            <p style={{ fontSize: 13, color: 'rgba(226,232,240,0.5)' }}>{profile.email}</p>
            
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontSize: 40, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace', color: '#00ff88', lineHeight: 1 }}>{profile.score}</p>
              <p style={{ fontSize: 11, color: 'rgba(226,232,240,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 8 }}>Total Reputasi (XP)</p>
            </div>
            
            <div style={{ marginTop: 24 }}>
              <p style={{ fontSize: 24, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace', color: '#e2e8f0', lineHeight: 1 }}>{profile.solvedChallenges.length}</p>
              <p style={{ fontSize: 11, color: 'rgba(226,232,240,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 8 }}>Misi Kelar</p>
            </div>
            
            <p style={{ fontSize: 11, color: 'rgba(226,232,240,0.3)', marginTop: 32, fontFamily: 'JetBrains Mono, monospace' }}>
              Diinisiasi {formatDate(profile.createdAt)}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{
            background: 'rgba(13,17,23,0.7)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16, padding: 32, backdropFilter: 'blur(10px)',
          }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(226,232,240,0.5)', marginBottom: 24 }}>
              Data Lapangan
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              {[
                { label: 'Skor Sekarang', value: profile.score.toLocaleString(), color: '#00ff88' },
                { label: 'Flag Direbut', value: profile.solvedChallenges.length, color: '#00d4ff' },
                { label: 'Koneksi', value: 'Stabil', color: '#34d399' },
                { label: 'Tahun Join', value: new Date(profile.createdAt).getFullYear(), color: '#e2e8f0' },
              ].map((stat) => (
                <div key={stat.label} style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 12, padding: 20
                }}>
                  <p style={{ fontSize: 28, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace', color: stat.color }}>{stat.value}</p>
                  <p style={{ fontSize: 12, color: 'rgba(226,232,240,0.4)', marginTop: 8 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{
            background: 'rgba(13,17,23,0.7)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16, padding: 32, backdropFilter: 'blur(10px)',
          }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(226,232,240,0.5)', marginBottom: 24 }}>
              Progres Misi
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: 'rgba(226,232,240,0.6)' }}>Target dibantai</span>
                <span style={{ color: '#00ff88', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{profile.solvedChallenges.length}</span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%', borderRadius: 999,
                    background: 'linear-gradient(90deg, #00ff88, #00d4ff)',
                    transition: 'width 1.5s ease-out',
                    width: `${Math.min((profile.solvedChallenges.length / 50) * 100, 100)}%`,
                    boxShadow: '0 0 10px rgba(0,255,136,0.5)'
                  }}
                />
              </div>
              <p style={{ fontSize: 11, color: 'rgba(226,232,240,0.3)', textAlign: 'right' }}>dari 50+ list misi</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .responsive-profile-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
