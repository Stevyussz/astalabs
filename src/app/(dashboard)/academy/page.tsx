import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academy | AstaLabs',
  description: 'Materi edukasi cybersecurity lengkap dari awal sampai advanced.',
};

const MODULES = [
  {
    id: 'web-101',
    title: 'Web Security 101',
    description: 'Pahami pondasi keamanan web. Mulai dari inspek kode sumber, hingga eksploitasi API sederhana.',
    icon: <Icons.Globe size={32} color="#3b82f6" />,
    color: '#3b82f6',
    status: 'tersedia',
    lessons: 3,
  },
  {
    id: 'crypto-dasar',
    title: 'Kriptografi Dasar',
    description: 'Belajar bagaimana pesan disandikan dan disembunyikan menggunakan encoding dan enkripsi klasik.',
    icon: <Icons.Shield size={32} color="#a855f7" />,
    color: '#a855f7',
    status: 'segera',
    lessons: 0,
  },
];

export default function AcademyPage() {
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
        {MODULES.map(mod => (
          <Link
            key={mod.id}
            href={mod.status === 'tersedia' ? `/academy/${mod.id}` : '#'}
            style={{
              textDecoration: 'none',
              cursor: mod.status === 'tersedia' ? 'pointer' : 'default',
              opacity: mod.status === 'tersedia' ? 1 : 0.6,
            }}
          >
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: 24,
              height: '100%',
              transition: 'all 0.2s',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseOver={(e) => {
              if (mod.status === 'tersedia') {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }
            }}
            onMouseOut={(e) => {
              if (mod.status === 'tersedia') {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
            >
              <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.05, transform: 'scale(3)' }}>
                {mod.icon}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {mod.icon}
                </div>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: '#e2e8f0', margin: 0 }}>{mod.title}</h2>
                  <span style={{ fontSize: 12, color: mod.status === 'tersedia' ? '#00ff88' : 'rgba(226,232,240,0.4)', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', fontWeight: 600 }}>
                    {mod.status === 'tersedia' ? `${mod.lessons} Materi` : 'Coming Soon'}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: 14, color: 'rgba(226,232,240,0.5)', lineHeight: 1.6, margin: 0 }}>
                {mod.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
