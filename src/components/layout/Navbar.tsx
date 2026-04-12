'use client';
// src/components/layout/Navbar.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

const navLinks = [
  { href: '/academy', label: 'Academy' },
  { href: '/challenges', label: 'Playground' },
  { href: '/scoreboard', label: 'Ranking' },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 50,
      background: 'rgba(8,11,16,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 4px 40px rgba(0,0,0,0.6)',
    }}>
      {/* Green glow line at bottom */}
      <div style={{
        position: 'absolute', bottom: -1, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg,transparent,rgba(0,255,136,0.4),transparent)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        <div style={{ display: 'flex', height: 68, alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 22, fontWeight: 800, color: '#00ff88', letterSpacing: '-0.02em' }}>{'>'}_</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, fontWeight: 700, color: '#e2e8f0', letterSpacing: '-0.02em' }}>
              Asta<span style={{ color: '#00ff88' }}>Labs</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden-mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '8px 16px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  ...(pathname === link.href
                    ? { color: '#00ff88', background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.25)' }
                    : { color: 'rgba(226,232,240,0.65)', background: 'transparent', border: '1px solid transparent' }),
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth buttons – desktop */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="hidden-mobile">
            {status === 'loading' ? (
              <div style={{ height: 16, width: 96, borderRadius: 8, background: 'rgba(255,255,255,0.08)', animation: 'shimmer 1.5s linear infinite' }} />
            ) : session?.user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Link href="/profile" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'rgba(0,255,136,0.15)',
                    border: '1.5px solid rgba(0,255,136,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#00ff88', fontSize: 14, fontWeight: 700,
                  }}>
                    {session.user.username?.[0]?.toUpperCase() ?? '?'}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', lineHeight: 1.2 }}>{session.user.username}</span>
                    <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', color: '#00ff88', lineHeight: 1.2 }}>{session.user.score} pts</span>
                  </div>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  style={{
                    padding: '6px 14px', borderRadius: 8, fontSize: 13,
                    fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                    background: 'transparent', color: 'rgba(226,232,240,0.6)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  Keluar
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Link
                  href="/login"
                  style={{
                    padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                    textDecoration: 'none', transition: 'all 0.2s',
                    color: 'rgba(226,232,240,0.75)',
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  style={{
                    padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                    textDecoration: 'none', transition: 'all 0.2s',
                    color: '#080b10',
                    background: '#00ff88',
                    border: '1px solid rgba(0,255,136,0.5)',
                    boxShadow: '0 0 16px rgba(0,255,136,0.3)',
                  }}
                >
                  Join
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger – mobile */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              padding: 8, borderRadius: 8, border: 'none', cursor: 'pointer',
              background: 'transparent', color: 'rgba(226,232,240,0.7)',
              transition: 'all 0.2s',
            }}
            className="show-mobile"
          >
            <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(8,11,16,0.98)',
          backdropFilter: 'blur(20px)',
          padding: '16px 24px 20px',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block', padding: '12px 14px', borderRadius: 10,
                fontSize: 15, fontWeight: 500, textDecoration: 'none',
                marginBottom: 6, transition: 'all 0.2s',
                ...(pathname === link.href
                  ? { color: '#00ff88', background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.2)' }
                  : { color: 'rgba(226,232,240,0.7)', background: 'transparent', border: '1px solid transparent' }),
              }}
            >
              {link.label}
            </Link>
          ))}

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16, marginTop: 10, display: 'flex', gap: 12 }}>
            {session?.user ? (
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                style={{
                  flex: 1, padding: '12px', borderRadius: 10, fontSize: 14,
                  fontWeight: 600, cursor: 'pointer', background: 'rgba(239,68,68,0.1)',
                  color: '#f87171', border: '1px solid rgba(239,68,68,0.2)',
                }}
              >
                Keluar
              </button>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)} style={{
                  flex: 1, textAlign: 'center', padding: '12px', borderRadius: 10,
                  fontSize: 14, fontWeight: 600, textDecoration: 'none',
                  color: 'rgba(226,232,240,0.8)', border: '1px solid rgba(255,255,255,0.1)',
                }}>Masuk</Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} style={{
                  flex: 1, textAlign: 'center', padding: '12px', borderRadius: 10,
                  fontSize: 14, fontWeight: 700, textDecoration: 'none',
                  color: '#080b10', background: '#00ff88',
                  boxShadow: '0 0 20px rgba(0,255,136,0.3)',
                }}>Join</Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
