import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Academy | AstaLabs',
  description: 'Materi edukasi cybersecurity lengkap dari awal sampai advanced.',
};

import { COURSES } from '@/data/academy';

// Mapping icons dynamically based on course ID
const getIconForCourse = (courseId: string) => {
  if (courseId.includes('web')) return <Icons.Globe size={32} color="#3b82f6" />;
  if (courseId.includes('crypto')) return <Icons.Shield size={32} color="#a855f7" />;
  return <Icons.Box size={32} color="#00ff88" />;
};

const getColorForCourse = (courseId: string) => {
  if (courseId.includes('web')) return '#3b82f6';
  if (courseId.includes('crypto')) return '#a855f7';
  return '#00ff88';
};

export default async function AcademyPage() {
  const session = await auth();
  
  
  if (!session) {
    redirect('/login');
  }

  const userCreatedAt = session?.user ? (session.user as any).createdAt : null;
  
  if (userCreatedAt) {
    const createdAt = new Date(userCreatedAt).getTime();
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    if (now - createdAt < oneHour) {
      const remainingMinutes = Math.ceil((oneHour - (now - createdAt)) / 60000);
      
      return (
        <div style={{ minHeight: 'calc(100vh - 68px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
          <div style={{ 
            background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', 
            borderRadius: '16px', padding: '40px', maxWidth: '500px',
            animation: 'pulse 3s infinite',
            boxShadow: '0 0 40px rgba(239,68,68,0.1) inset' 
          }}>
            <Icons.Lock size={48} color="#ef4444" />
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444', marginTop: '24px', marginBottom: '12px', letterSpacing: '2px', fontFamily: 'JetBrains Mono, monospace' }}>
              AKSES DITOLAK
            </h1>
            <p style={{ color: 'rgba(226,232,240,0.7)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
              Sistem radar kami mendeteksi bahwa akun Anda masih terlalu baru. Prosedur standar AstaLabs mengharuskan karantina selama 1 jam untuk verifikasi <i>background check</i> operative.
            </p>
            <div style={{ background: '#000', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'JetBrains Mono, monospace', color: '#f59e0b', fontSize: '14px' }}>
              Waktu Karantina Tersisa: {remainingMinutes} Menit
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div style={{ maxWidth: 1024, margin: '0 auto', padding: '40px 24px' }}>
      <header style={{ marginBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 24 }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#e2e8f0', letterSpacing: '-0.02em', margin: 0 }}>
          <span style={{ color: '#00ff88', fontFamily: 'JetBrains Mono, monospace' }}>{'>'}_</span> Academy
        </h1>
        <p style={{ marginTop: 8, fontSize: 15, color: 'rgba(226,232,240,0.5)', lineHeight: 1.6 }}>
          Pilih modul kelas untuk mulai belajar. Pahami teorinya, lalu selesaikan misi di Playground.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        {COURSES.map(mod => {
          const icon = getIconForCourse(mod.id);
          const status = mod.chapters.length > 0 ? 'tersedia' : 'segera';
          
          return (
            <Link
              key={mod.id}
              href={status === 'tersedia' ? `/academy/${mod.id}/${mod.chapters[0]?.id || '1'}` : '#'}
              style={{
                textDecoration: 'none',
                cursor: status === 'tersedia' ? 'pointer' : 'default',
                opacity: status === 'tersedia' ? 1 : 0.6,
              }}
            >
              <div className={`academy-card ${status === 'tersedia' ? 'academy-card-available' : ''}`} style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                padding: 24,
                height: '100%',
                transition: 'all 0.2s',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.05, transform: 'scale(3)' }}>
                  {icon}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {icon}
                  </div>
                  <div>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: '#e2e8f0', margin: 0 }}>{mod.title}</h2>
                    <span style={{ fontSize: 12, color: status === 'tersedia' ? '#00ff88' : 'rgba(226,232,240,0.4)', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', fontWeight: 600 }}>
                      {status === 'tersedia' ? `${mod.chapters.length} Materi` : 'Coming Soon'}
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(226,232,240,0.5)', lineHeight: 1.6, margin: 0 }}>
                  {mod.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <style>{`
        .academy-card-available:hover {
          border-color: rgba(255,255,255,0.2) !important;
          transform: translateY(-4px) !important;
        }
      `}</style>
    </div>
  );
}
