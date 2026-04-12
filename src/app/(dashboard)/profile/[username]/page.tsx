import { notFound } from 'next/navigation';
import { userRepository } from '@/repositories/user.repository';
import { formatDate } from '@/lib/utils';
import { Icons } from '@/components/ui/Icons';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Profil: ${resolvedParams.username} | AstaLabs`,
    description: `Statistik operative ${resolvedParams.username} di AstaLabs.`,
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const resolvedParams = await params;
  const usernameDecoded = decodeURIComponent(resolvedParams.username);
  
  const user = await userRepository.findByUsername(usernameDecoded);

  if (!user) {
    return (
      <div style={{ maxWidth: 800, margin: '80px auto', padding: '60px 24px', textAlign: 'center' }}>
         <Icons.Users size={64} color="rgba(255,255,255,0.1)" />
         <h2 style={{ marginTop: 24, fontSize: 24, fontWeight: 'bold' }}>Operative Tidak Ditemukan</h2>
         <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>Hacker dengan identitas "{usernameDecoded}" tidak terdaftar di sistem matriks kami.</p>
      </div>
    );
  }

  const rankData = await userRepository.getScoreboard(100);
  const userRankIndex = rankData.findIndex(u => u.username === user.username);
  const userRank = userRankIndex !== -1 ? userRankIndex + 1 : '100+';

  return (
    <div style={{ maxWidth: 1024, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#e2e8f0', letterSpacing: '-0.02em', margin: '0 0 40px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 24 }}>
        <span style={{ color: '#00ff88', fontFamily: 'JetBrains Mono, monospace' }}>{'>'}_</span> Profil Publik
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: 32 }} className="responsive-profile-grid">
        {/* Profile Info */}
        <div style={{
          background: 'rgba(13,17,23,0.7)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16, padding: 32, textAlign: 'center', backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
        }}>
          <div style={{
            width: 96, height: 96, borderRadius: '50%',
            background: 'rgba(0,255,136,0.1)', border: '2px solid rgba(0,255,136,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, fontWeight: 800, color: '#00ff88', margin: '0 auto 20px',
            boxShadow: '0 0 30px rgba(0,255,136,0.2)'
          }}>
            {user.username[0]?.toUpperCase() ?? '?'}
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#e2e8f0', marginBottom: 4 }}>{user.username}</h2>
          <div style={{ display: 'inline-flex', padding: '4px 12px', borderRadius: 999, background: 'rgba(59,130,246,0.1)', color: '#3b82f6', fontSize: 12, fontWeight: 600, border: '1px solid rgba(59,130,246,0.3)', margin: '12px 0 24px' }}>
            Operative Aktif
          </div>
          
          <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ fontSize: 40, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace', color: '#00ff88', lineHeight: 1 }}>#{userRank}</p>
            <p style={{ fontSize: 11, color: 'rgba(226,232,240,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 8 }}>Peringkat Global</p>
          </div>
          
          <p style={{ fontSize: 11, color: 'rgba(226,232,240,0.3)', marginTop: 32, fontFamily: 'JetBrains Mono, monospace' }}>
            Diinisiasi {formatDate(user.createdAt)}
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Top Row Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'rgba(13,17,23,0.7)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32, backdropFilter: 'blur(10px)' }}>
              <p style={{ fontSize: 48, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace', color: '#00ff88', lineHeight: 1 }}>{user.score}</p>
              <p style={{ fontSize: 13, color: 'rgba(226,232,240,0.5)', marginTop: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Reputasi (XP)</p>
            </div>
            
            <div style={{ background: 'rgba(13,17,23,0.7)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32, backdropFilter: 'blur(10px)' }}>
              <p style={{ fontSize: 48, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace', color: '#00d4ff', lineHeight: 1 }}>{user.solvedChallenges.length}</p>
              <p style={{ fontSize: 13, color: 'rgba(226,232,240,0.5)', marginTop: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Target Diretas</p>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ background: 'rgba(13,17,23,0.7)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32, backdropFilter: 'blur(10px)' }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(226,232,240,0.5)', marginBottom: 24 }}>
              Progres Kampanye
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: 'rgba(226,232,240,0.6)' }}>Tingkat Penyelesaian</span>
                <span style={{ color: '#00ff88', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{user.solvedChallenges.length} Tantangan</span>
              </div>
              <div style={{ height: 10, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%', borderRadius: 999,
                    background: 'linear-gradient(90deg, #00ff88, #00d4ff)',
                    width: `${Math.min((user.solvedChallenges.length / 50) * 100, 100)}%`,
                    boxShadow: '0 0 10px rgba(0,255,136,0.5)'
                  }}
                />
              </div>
              <p style={{ fontSize: 11, color: 'rgba(226,232,240,0.3)', textAlign: 'right' }}>dari 50+ list misi di database</p>
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
