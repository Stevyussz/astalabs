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
    title: `Operative: ${resolvedParams.username} | AstaLabs`,
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
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: 'calc(100vh - 68px)' }}>
      {/* --- PREMIUM HACKER BACKGROUND --- */}
      <div style={{ 
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.9), rgba(13,17,23,0.95)), url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 10H90V90H10V10Z\' fill=\'none\' stroke=\'%2300ff88\' stroke-opacity=\'0.03\'/%3E%3C/svg%3E")',
        zIndex: -1 
      }} />
      <div className="matrix-scan-line" />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        <header style={{ display: 'flex', alignItems: 'flex-end', gap: 20, marginBottom: 48, borderBottom: '1px solid rgba(0,255,136,0.1)', paddingBottom: 32 }}>
          <div style={{ 
            width: 100, height: 100, borderRadius: 20, 
            background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 48, fontWeight: 900, color: '#080b10',
            boxShadow: '0 0 30px rgba(0,255,136,0.3)',
            fontFamily: 'JetBrains Mono, monospace'
          }}>
            {user.username[0]?.toUpperCase() ?? '?'}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1, letterSpacing: '-0.02em' }}>
                {user.username}
              </h1>
              <div style={{ 
                padding: '6px 12px', borderRadius: 8, background: 'rgba(0,255,136,0.1)', 
                border: '1px solid rgba(0,255,136,0.3)', color: '#00ff88', 
                fontSize: 12, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' 
              }}>
                LEVEL 0{Math.floor(user.score / 1000) + 1}
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', margin: 0, fontSize: 14, fontFamily: 'JetBrains Mono, monospace' }}>
              Operative #{user._id.toString().slice(-6).toUpperCase()} • Joined {formatDate(user.createdAt)}
            </p>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {/* Rank & Global Stats */}
          <div className="profile-glass-card" style={{ padding: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <h3 style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>Peringkat Global</h3>
              <Icons.Target size={20} color="#00ff88" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontSize: 64, fontWeight: 900, color: '#00ff88', fontFamily: 'JetBrains Mono, monospace', lineHeight: 1 }}>#{userRank}</span>
              <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>Top 1%</span>
            </div>
            <p style={{ marginTop: 24, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
              Berasimilasi dengan server radar utama. Operative ini berada di jajaran elit pencari flag.
            </p>
          </div>

          {/* XP & Reputation */}
          <div className="profile-glass-card" style={{ padding: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <h3 style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>Total Reputasi (XP)</h3>
              <Icons.Zap size={20} color="#00d4ff" />
            </div>
            <div style={{ fontSize: 64, fontWeight: 900, color: '#fff', fontFamily: 'JetBrains Mono, monospace', lineHeight: 1 }}>
              {user.score.toLocaleString()}
            </div>
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8, fontFamily: 'JetBrains Mono, monospace' }}>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>NEXT LEVEL</span>
                <span style={{ color: '#00d4ff' }}>{user.score}/{ (Math.floor(user.score / 1000) + 1) * 1000 } XP</span>
              </div>
              <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', width: `${(user.score % 1000) / 10}%`, 
                  background: 'linear-gradient(90deg, #00d4ff, #00ff88)', 
                  boxShadow: '0 0 15px rgba(0,212,255,0.4)' 
                }} />
              </div>
            </div>
          </div>

          {/* Misi Selesai */}
          <div className="profile-glass-card" style={{ padding: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <h3 style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>Misi Diretas</h3>
              <Icons.Grid size={20} color="#a855f7" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontSize: 64, fontWeight: 900, color: '#a855f7', fontFamily: 'JetBrains Mono, monospace', lineHeight: 1 }}>{user.solvedChallenges.length}</span>
              <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>Tantangan</span>
            </div>
            <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
               {user.solvedChallenges.slice(0, 5).map((s, i) => (
                 <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#a855f7', boxShadow: '0 0 8px #a855f7' }} />
               ))}
               <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'JetBrains Mono, monospace' }}>Tracking active...</span>
            </div>
          </div>
        </div>

        {/* --- ACHIEVEMENTS / BADGES --- */}
        <section style={{ marginTop: 48 }}>
           <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
             Lencana Operative <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.05)' }} />
           </h3>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              {[
                { name: 'First Blood', desc: 'Selesaikan misi pertama.', unlocked: user.solvedChallenges.length > 0, icon: '🩸' },
                { name: 'Byte Master', desc: 'XP Mencapai 500+.', unlocked: user.score >= 500, icon: '💾' },
                { name: 'Silent Ghost', desc: 'Retas 5+ Tantangan.', unlocked: user.solvedChallenges.length >= 5, icon: '👻' },
                { name: 'Elite Operative', desc: 'Ranking 1-5 Global.', unlocked: userRankIndex !== -1 && userRankIndex < 5, icon: '👑' },
              ].map(badge => (
                <div key={badge.name} style={{ 
                  padding: 24, borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', 
                  background: badge.unlocked ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.4)',
                  opacity: badge.unlocked ? 1 : 0.3,
                  transition: 'all 0.3s',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: 32, marginBottom: 12, filter: badge.unlocked ? 'grayscale(0)' : 'grayscale(1)' }}>{badge.icon}</div>
                  <h4 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700, color: badge.unlocked ? '#00ff88' : '#fff' }}>{badge.name}</h4>
                  <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{badge.desc}</p>
                </div>
              ))}
           </div>
        </section>
      </div>

      <style>{`
        .profile-glass-card {
           background: rgba(13, 17, 23, 0.6);
           border: 1px solid rgba(255, 255, 255, 0.08);
           border-radius: 20px;
           backdrop-filter: blur(12px);
           box-shadow: 0 15px 35px rgba(0,0,0,0.2);
           transition: transform 0.3s ease;
        }
        .profile-glass-card:hover { transform: translateY(-5px); border-color: rgba(0,255,136,0.2); }
        
        .matrix-scan-line {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 255, 136, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02));
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
          z-index: 0;
          opacity: 0.3;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
