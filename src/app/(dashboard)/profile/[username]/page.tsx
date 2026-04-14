import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import Challenge from '@/models/Challenge';
import { Icons } from '@/components/ui/Icons';
import { calculateBadges } from '@/lib/badgeUtils';
import { getLevelProgress } from '@/lib/levelUtils';
import { RadarSkillChart } from '@/components/ui/RadarSkillChart';

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `${decodeURIComponent(resolvedParams.username)} | Hacker Profile`,
    description: `Public CTF records for Hacker ${decodeURIComponent(resolvedParams.username)}`
  };
}

// Icon Mapping
const getIcon = (name: string, size = 24, color = '#fff') => {
  if (name === 'user') return <Icons.User size={size} color={color} />;
  if (name === 'globe') return <Icons.Globe size={size} color={color} />;
  if (name === 'shield') return <Icons.Shield size={size} color={color} />;
  if (name === 'search') return <Icons.Search size={size} color={color} />;
  if (name === 'terminal') return <Icons.Terminal size={size} color={color} />;
  if (name === 'target') return <Icons.Target size={size} color={color} />;
  return <Icons.Zap size={size} color={color} />;
};

export default async function HackerProfilePage({ params }: { params: Promise<{ username: string }> }) {
  await connectDB();
  const resolvedParams = await params;
  const rawUsername = decodeURIComponent(resolvedParams.username);
  
  // Force Turbopack to NOT tree-shake the Challenge model (vital for mongoose populate!)
  void Challenge;

  const userDoc = await User.findOne({ username: { $regex: new RegExp(`^${rawUsername}$`, 'i') } })
    .populate('solvedChallenges', 'category points')
    .lean() as any;

  if (!userDoc) {
    notFound();
  }

  const solvedChallenges = userDoc.solvedChallenges || [];
  const levelInfo = getLevelProgress(userDoc.score);
  const badges = calculateBadges(solvedChallenges);

  // Compute stats for Radar Chart
  const categoryCounts: Record<string, number> = {};
  solvedChallenges.forEach((ch: any) => {
    categoryCounts[ch.category] = (categoryCounts[ch.category] || 0) + 1;
  });

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px' }}>
      
      {/* ── CARD HEADER ── */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(13,17,23,0.9) 0%, rgba(8,11,16,1) 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 24,
        padding: 40,
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow effect */}
        <div style={{ position: 'absolute', top: -50, right: -50, width: 250, height: 250, background: 'rgba(0,255,136,0.1)', filter: 'blur(80px)', borderRadius: '50%' }} />
        
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Avatar Area */}
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 120, height: 120, borderRadius: '50%',
              background: 'rgba(0,255,136,0.1)',
              border: '2px solid rgba(0,255,136,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 48, fontWeight: 900, color: '#00ff88',
              boxShadow: '0 0 30px rgba(0,255,136,0.2)'
            }}>
              {userDoc.username[0]?.toUpperCase()}
            </div>
            {/* Level Badge Overlay */}
            <div style={{
              position: 'absolute', bottom: -5, right: -5,
              background: '#0ea5e9', color: '#fff',
              border: '4px solid #080b10',
              borderRadius: '50%', width: 44, height: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 16,
              boxShadow: '0 0 15px rgba(14,165,233,0.5)'
            }}>
              {levelInfo.currentLevel}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <h1 style={{ fontSize: 36, fontWeight: 900, color: '#e2e8f0', margin: 0, letterSpacing: '-0.02em' }}>
                {userDoc.username}
              </h1>
            </div>
            
            <p style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: 8, fontSize: 14, color: '#94a3b8', fontWeight: 600, letterSpacing: '1px', marginBottom: 24 }}>
              <Icons.Shield size={16} /> {levelInfo.title.toUpperCase()}
            </p>

            {/* Level Progress */}
            <div style={{ maxWidth: 400 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>
                <span style={{ color: '#00ff88', fontFamily: 'JetBrains Mono, monospace' }}>{userDoc.score} XP</span>
                <span style={{ color: 'rgba(226,232,240,0.4)' }}>{levelInfo.nextLevelXP} XP (Lvl {levelInfo.currentLevel + 1})</span>
              </div>
              <div style={{ height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${levelInfo.progressPercentage}%`,
                  background: 'linear-gradient(90deg, #00ff88, #0ea5e9)',
                  boxShadow: '0 0 10px rgba(0,255,136,0.5)',
                  borderRadius: 4
                }} />
              </div>
              <p style={{ fontSize: 12, color: 'rgba(226,232,240,0.4)', marginTop: 8 }}>
                {levelInfo.remainingXpToNext} XP ke level berikutnya.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS & RADAR MATRIX ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.5fr) minmax(300px, 1.5fr)', gap: 32, marginTop: 40 }}>
         
         {/* Left col: Basic Stats */}
         <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
           <div style={{ background: 'linear-gradient(180deg, rgba(14,165,233,0.05) 0%, rgba(14,165,233,0.01) 100%)', border: '1px solid rgba(14,165,233,0.2)', borderRadius: 16, padding: 32, textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontSize: 13, color: 'rgba(226,232,240,0.5)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Total XP</p>
              <p style={{ fontSize: 48, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace', color: '#0ea5e9', margin: 0, textShadow: '0 0 20px rgba(14,165,233,0.5)' }}>{userDoc.score}</p>
           </div>
           <div style={{ background: 'linear-gradient(180deg, rgba(245,158,11,0.05) 0%, rgba(245,158,11,0.01) 100%)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 16, padding: 32, textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontSize: 13, color: 'rgba(226,232,240,0.5)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Flags Hacked</p>
              <p style={{ fontSize: 48, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace', color: '#f59e0b', margin: 0, textShadow: '0 0 20px rgba(245,158,11,0.5)' }}>{solvedChallenges.length}</p>
           </div>
         </div>

         {/* Right col: Skill Radar */}
         <RadarSkillChart categoryCounts={categoryCounts} />
      </div>

      {/* ── BADGES SECTION ── */}
      <div style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#e2e8f0', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icons.Medal size={24} color="#00ff88" /> Lencana Operasi ({badges.length})
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {badges.map((b) => (
            <div key={b.id} style={{
              background: b.glow,
              border: `1px solid ${b.color}40`,
              borderRadius: 16,
              padding: '20px 16px',
              display: 'flex', gap: 16, alignItems: 'center',
              boxShadow: `inset 0 0 20px ${b.color}10`,
            }}>
              <div style={{ padding: 10, background: `${b.color}20`, borderRadius: 12 }}>
                {getIcon(b.iconType, 24, b.color)}
              </div>
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 800, color: b.color }}>{b.name}</h3>
                <p style={{ margin: 0, fontSize: 12, color: 'rgba(226,232,240,0.6)', lineHeight: 1.4 }}>{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
