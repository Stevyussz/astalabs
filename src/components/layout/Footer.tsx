// src/components/layout/Footer.tsx
import Link from 'next/link';

export function Footer() {
  return (
    <footer style={{
      position: 'relative',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      background: 'rgba(8,11,16,0.95)',
      padding: '32px 24px',
      zIndex: 10,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 18, fontWeight: 800, color: '#00ff88' }}>{'>'}_</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>AstaLabs</span>
          </div>

          {/* Links */}
          <nav style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { href: '/challenges', label: 'Tantangan' },
              { href: '/scoreboard', label: 'Papan Skor' },
              { href: '/register', label: 'Daftar' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="footer-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p style={{ fontSize: 12, color: 'rgba(226,232,240,0.35)', fontFamily: 'JetBrains Mono, monospace' }}>
            © {new Date().getFullYear()} AstaLabs. Amankan flag, amankan dunia.
          </p>
        </div>
      </div>
    </footer>
  );
}
