"use client";

import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [glitchText, setGlitchText] = useState('404_NOT_FOUND');

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        let glitched = '404_NOT_FOUND'.split('');
        const pos = Math.floor(Math.random() * glitched.length);
        glitched[pos] = chars[Math.floor(Math.random() * chars.length)];
        setGlitchText(glitched.join(''));
      } else {
        setGlitchText('404_NOT_FOUND');
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#04070a',
      padding: 24,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decor */}
      <div style={{ position: 'absolute', opacity: 0.1, fontFamily: 'monospace', color: '#00ff88', fontSize: 10, wordBreak: 'break-all', left: 0, right: 0, top: 0, bottom: 0, zIndex: 0, pointerEvents: 'none' }}>
        {Array.from({ length: 50 }).map(() => '011000100110111101111000').join(' ')}
      </div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 600,
        width: '100%',
        textAlign: 'center',
        background: 'rgba(13,17,23,0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0,255,136,0.2)',
        borderRadius: 24,
        padding: 48,
        boxShadow: '0 0 50px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,255,136,0.05)'
      }}>
        <div style={{ marginBottom: 24, position: 'relative', display: 'inline-block' }}>
          <Icons.Shield size={80} color="#f87171" style={{ filter: 'drop-shadow(0 0 20px rgba(248,113,113,0.4))' }} />
          <div style={{ position: 'absolute', bottom: -10, right: -10, background: '#f87171', color: '#000', fontWeight: 900, padding: 4, borderRadius: 4, fontSize: 12 }}>
            ERROR
          </div>
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 900,
          color: '#f87171',
          margin: '0 0 16px 0',
          fontFamily: 'JetBrains Mono, monospace',
          letterSpacing: '-2px',
          textShadow: '0 0 10px rgba(248,113,113,0.5)'
        }}>
          {glitchText}
        </h1>

        <div style={{ background: 'rgba(248,113,113,0.1)', padding: 16, borderRadius: 8, marginBottom: 32, borderLeft: '4px solid #f87171' }}>
          <p style={{ color: '#fca5a5', fontSize: 16, lineHeight: 1.6, margin: 0 }}>
            TARGET_ACQUISITION_FAILED. Data yang kamu cari tidak berada di dalam ruang siber ini, atau Hacker tersebut belum terdaftar di <em>Database Mainframe</em>.
          </p>
        </div>

        <Link href="/" style={{ textDecoration: 'none' }}>
          <button style={{
            background: 'linear-gradient(90deg, rgba(0,255,136,0.1) 0%, rgba(0,255,136,0.2) 100%)',
            border: '1px solid #00ff88',
            color: '#00ff88',
            padding: '16px 32px',
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            transition: 'all 0.2s',
            boxShadow: '0 0 20px rgba(0,255,136,0.1)'
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = '#00ff88'; e.currentTarget.style.color = '#000'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, rgba(0,255,136,0.1) 0%, rgba(0,255,136,0.2) 100%)'; e.currentTarget.style.color = '#00ff88'; }}
          >
            <Icons.Terminal size={20} />
            KEMBALI KE BASECAMP
          </button>
        </Link>
      </div>
    </div>
  );
}
