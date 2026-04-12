// src/app/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'AstaLabs | Hack. Belajar. Sikat Ranking.',
  description: 'Join kompetisi CTF paling gokil. Sikat misi hacking real-world: web, crypto, forensics, pwn, dan banyak lagi.',
};

const stats = [
  { label: 'MISI BERBAHAYA', value: '50+', icon: <Icons.Target size={32} color="#00ff88" /> },
  { label: 'KATEGORI', value: '6', icon: <Icons.Grid size={32} color="#00ff88" /> },
  { label: 'HACKER AKTIF', value: '∞', icon: <Icons.Users size={32} color="#00ff88" /> },
  { label: 'MAX XP', value: '10K', icon: <Icons.Zap size={32} color="#00ff88" /> },
];

const categories = [
  { name: 'Web', icon: <Icons.Globe size={44} />, color: '#3b82f6', glow: 'rgba(59,130,246,0.2)', desc: 'Injeksi SQL, XSS, SSRF' },
  { name: 'Crypto', icon: <Icons.Shield size={44} />, color: '#a855f7', glow: 'rgba(168,85,247,0.2)', desc: 'Sandi, Hashing, RSA' },
  { name: 'Forensics', icon: <Icons.Search size={44} />, color: '#f59e0b', glow: 'rgba(245,158,11,0.2)', desc: 'Steganografi, OSINT' },
  { name: 'Pwn', icon: <Icons.Terminal size={44} />, color: '#ef4444', glow: 'rgba(239,68,68,0.2)', desc: 'Buffer overflow, ROP' },
  { name: 'Reverse', icon: <Icons.Cpu size={44} />, color: '#f97316', glow: 'rgba(249,115,22,0.2)', desc: 'Disassembly, decompilation' },
  { name: 'Misc', icon: <Icons.Box size={44} />, color: '#14b8a6', glow: 'rgba(20,184,166,0.2)', desc: 'Pemrograman, teka-teki' },
];

export default function HomePage() {
  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '80px 24px 100px',
        textAlign: 'center',
      }}>

        {/* Headline */}
        <h1 style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 auto 28px' }}>
          <span style={{ display: 'block', color: '#e2e8f0' }}>Hack.<span style={{ opacity: 0.6 }}> Belajar.</span></span>
          <span style={{
            display: 'block', marginTop: 12, paddingBottom: 8,
            background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 24px rgba(0,255,136,0.5))',
          }}>
            Capture The Flag.
          </span>
        </h1>

        {/* Subheading */}
        <p style={{ maxWidth: 600, margin: '0 auto 48px', fontSize: 'clamp(1rem,2.5vw,1.2rem)', color: 'rgba(226,232,240,0.6)', lineHeight: 1.7 }}>
          Asah skill hacking kamu lewat tantangan nyata: web exploitation, crypto, reverse engineering, dan masih banyak lagi.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/register" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            height: 52, padding: '0 32px', borderRadius: 12,
            fontSize: 15, fontWeight: 700, textDecoration: 'none',
            color: '#080b10', background: '#00ff88',
            boxShadow: '0 0 30px rgba(0,255,136,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
            border: '1px solid rgba(0,255,136,0.6)',
            transition: 'all 0.25s',
          }}>
            Gas Hacking! →
          </Link>
          <Link href="/challenges" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            height: 52, padding: '0 32px', borderRadius: 12,
            fontSize: 15, fontWeight: 600, textDecoration: 'none',
            color: 'rgba(226,232,240,0.85)',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.12)',
            transition: 'all 0.25s',
          }}>
            Cek List Misi
          </Link>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(13,17,23,0.6)',
        padding: '48px 24px',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 32, textAlign: 'center',
        }}>
          {stats.map(stat => (
            <div key={stat.label}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{stat.icon}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 36, fontWeight: 800, color: '#00ff88', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(226,232,240,0.4)', letterSpacing: '0.1em', marginTop: 8 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 500, color: '#00ff88', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
            KATEGORI MISI
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, color: '#e2e8f0', letterSpacing: '-0.02em' }}>
            Enam Spektrum{' '}
            <span style={{ background: 'linear-gradient(135deg, #00ff88, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Eksploitasi
            </span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
        }}>
          {categories.map(cat => (
            <Link
              key={cat.name}
              href={`/challenges?category=${cat.name.toLowerCase()}`}
              id={`category-${cat.name.toLowerCase()}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                className="category-card"
                style={{ '--cat-color': cat.color, '--cat-glow': cat.glow } as React.CSSProperties}
              >
                <div style={{ color: cat.color, marginBottom: 16, display: 'block' }}>{cat.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: cat.color, marginBottom: 8 }}>{cat.name}</h3>
                <p style={{ fontSize: 13, color: 'rgba(226,232,240,0.5)', lineHeight: 1.6 }}>{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '80px 24px',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          {/* Terminal */}
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 13, textAlign: 'left',
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(0,255,136,0.2)',
            borderRadius: 12,
            padding: '16px 20px',
            marginBottom: 40,
            boxShadow: '0 0 30px rgba(0,255,136,0.05), inset 0 1px 0 rgba(0,255,136,0.1)',
          }}>
            <span style={{ color: 'rgba(226,232,240,0.3)' }}>$ </span>
            <span style={{ color: '#00ff88' }}>./astalabs --join</span>
            <span className="cursor-blink" style={{ color: '#00ff88', marginLeft: 2 }}>_</span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', fontWeight: 800, color: '#e2e8f0', marginBottom: 16 }}>
            Udah siap buktiin skill kamu?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(226,232,240,0.55)', marginBottom: 36, lineHeight: 1.7 }}>
            Bikin akun sekarang terus sikat semua misinya. Tiap flag yang kamu dapet bakal bawa nama kamu ke puncak leaderboard.
          </p>
          <Link href="/register" id="cta-register-bottom" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            height: 52, padding: '0 40px', borderRadius: 12,
            fontSize: 15, fontWeight: 700, textDecoration: 'none',
            color: '#080b10', background: '#00ff88',
            boxShadow: '0 0 30px rgba(0,255,136,0.4)',
            border: '1px solid rgba(0,255,136,0.5)',
          }}>
            Join Gratis Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}
