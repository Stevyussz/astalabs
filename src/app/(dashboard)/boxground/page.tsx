import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Icons } from '@/components/ui/Icons';
import { Metadata } from 'next';
import { calculateLevel } from '@/lib/levelUtils';

export const metadata: Metadata = {
  title: 'Boxground | AstaLabs',
  description: 'Simulasi server nyata dengan rangkaian kerentanan tingkat lanjut.',
};

const BOXES = [
  {
    id: 'astacorp',
    title: 'AstaCorp Public Web',
    difficulty: 'Medium',
    flags: 10,
    icon: <Icons.Globe size={40} color="#3b82f6" />,
    color: '#3b82f6',
    description: 'Sebuah profil web perusahaan lama. Target utama: Dapatkan akses Admin, temukan file bayangan, dan ledakkan sistem lewat manipulasi endpoint.',
    tags: ['Web', 'OSINT', 'Injection'],
    status: 'ACTIVE',
  },
  {
    id: 'crypto-vault',
    title: 'Crypto Vault Node',
    difficulty: 'Hard',
    flags: 10,
    icon: <Icons.Shield size={40} color="#a855f7" />,
    color: '#a855f7',
    description: 'Simpul komunikasi jaringan rahasia. Target utama: Dekripsi transmisi acak, temukan kelemahan generator kunci, dan bajak tiket sesi admin.',
    tags: ['Crypto', 'Forensics', 'JWT'],
    status: 'BUILDING',
  },
];

export default async function BoxgroundHub() {
  const session = await auth();
  if (!session) redirect('/login');

  const userLevel = calculateLevel(session.user.score);
  const isLocked = userLevel < 5;

  return (
    <div style={{ maxWidth: 1024, margin: '0 auto', padding: '40px 24px' }}>
      <header style={{ marginBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
          <div style={{ padding: 12, background: 'rgba(168,85,247,0.1)', borderRadius: 12 }}>
            <Icons.Box size={32} color="#a855f7" />
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>
            BOXGROUND
          </h1>
        </div>
        <p style={{ fontSize: 16, color: 'rgba(226,232,240,0.6)', lineHeight: 1.6, maxWidth: 800 }}>
          Selamat datang di zona merah. Tiap 'Box' adalah satu simulasi web/server tersendiri yang mengandung <strong>banyak target operasi (Flags) sekaligus</strong> layaknya ekosistem infrastruktur sungguhan.
        </p>

        {isLocked && (
          <div style={{ marginTop: 24, padding: '16px 24px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 16 }}>
            <Icons.Lock size={32} color="#f87171" style={{ flexShrink: 0 }} />
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, color: '#fca5a5' }}>AKSES DITOLAK: OTORISASI LEVEL RENDAH</h3>
              <p style={{ margin: 0, fontSize: 14, color: '#fecaca', lineHeight: 1.5 }}>
                Level Pangkat Anda saat ini adalah <strong>Lvl {userLevel}</strong>. Arena pelatihan Expert (Boxground) ditujukan untuk hacker yang sudah berpengalaman. Buktikan diri lo dengan mencapai minimal <strong>Level 5</strong> melalui penyelesaian Misi di Playground standar.
              </p>
            </div>
          </div>
        )}
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
        {BOXES.map(box => {
          const disabled = box.status !== 'ACTIVE' || isLocked;
          
          const CardContent = (
            <div className="box-card" style={{
              background: 'rgba(13,17,23,0.6)',
              border: `1px solid rgba(255,255,255,0.06)`,
              borderRadius: 16,
              padding: 32,
              height: '100%',
              transition: 'all 0.3s',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.05, transform: 'scale(4)' }}>
                {box.icon}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: 16, borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                    {box.icon}
                  </div>
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>{box.title}</h2>
                    <div style={{ display: 'flex', gap: 8, fontSize: 12, fontWeight: 700, fontFamily: 'monospace' }}>
                      <span style={{ color: box.difficulty === 'Medium' ? '#f59e0b' : box.difficulty === 'Hard' ? '#ef4444' : '#00ff88' }}>
                         [{box.difficulty.toUpperCase()}]
                      </span>
                      <span style={{ color: '#94a3b8' }}>•</span>
                      <span style={{ color: '#00d4ff' }}>{box.flags} FLAGS</span>
                    </div>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 24, flex: 1 }}>
                {box.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {box.tags.map(t => (
                    <span key={t} style={{ fontSize: 11, background: 'rgba(255,255,255,0.05)', color: '#94a3b8', padding: '4px 8px', borderRadius: 4 }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{ 
                  fontSize: 12, fontWeight: 800, letterSpacing: '1px', 
                  background: isLocked ? 'rgba(255,255,255,0.1)' : box.status === 'ACTIVE' ? 'rgba(0,255,136,0.1)' : 'rgba(239,68,68,0.1)', 
                  color: isLocked ? '#94a3b8' : box.status === 'ACTIVE' ? '#00ff88' : '#ef4444', 
                  padding: '6px 12px', borderRadius: 6 
                }}>
                  {isLocked ? 'LOCKED (LVL 5)' : box.status}
                </div>
              </div>
            </div>
          );

          if (disabled) {
            return (
              <div key={box.id} style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                {CardContent}
              </div>
            );
          }

          return (
            <Link key={box.id} href={`/boxground/${box.id}`} style={{ textDecoration: 'none' }}>
              {CardContent}
            </Link>
          );
        })}
      </div>

      <style>{`
        a .box-card:hover {
           border-color: rgba(168,85,247,0.4) !important;
           transform: translateY(-5px);
           box-shadow: 0 15px 35px rgba(0,0,0,0.4);
        }
      `}</style>
    </div>
  );
}
