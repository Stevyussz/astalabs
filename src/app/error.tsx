"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('SYSTEM_FAULT_DETECTED:', error);
  }, [error]);

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
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 600,
        width: '100%',
        textAlign: 'center',
        background: 'rgba(239,68,68,0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(239,68,68,0.2)',
        borderRadius: 24,
        padding: 48,
        boxShadow: '0 0 50px rgba(0,0,0,0.8), inset 0 0 20px rgba(239,68,68,0.05)'
      }}>
        <div style={{ marginBottom: 24 }}>
          <Icons.AlertTriangle size={80} color="#ef4444" style={{ filter: 'drop-shadow(0 0 20px rgba(239,68,68,0.4))' }} />
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 2.5rem)',
          fontWeight: 900,
          color: '#ef4444',
          margin: '0 0 16px 0',
          fontFamily: 'JetBrains Mono, monospace',
          letterSpacing: '-1px'
        }}>
          SYSTEM_FAULT
        </h1>

        <div style={{ background: 'rgba(0,0,0,0.4)', padding: 16, borderRadius: 8, marginBottom: 32, borderLeft: '4px solid #ef4444', textAlign: 'left' }}>
          <p style={{ color: '#fca5a5', fontSize: 15, lineHeight: 1.6, margin: '0 0 8px 0', fontFamily: 'monospace' }}>
            {process.env.NODE_ENV === 'development' ? error.message : "Eksekusi gagal. Terdapat anomali pada logic server AstaLabs."}
          </p>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Error terlaporkan ke terminal log.</span>
        </div>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => reset()}
            style={{
              background: 'rgba(239,68,68,0.2)',
              border: '1px solid #ef4444',
              color: '#ef4444',
              padding: '16px 32px',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#000'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; e.currentTarget.style.color = '#ef4444'; }}
          >
            <Icons.Zap size={20} />
            RETRY EXECUTION
          </button>

          <Link href="/" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              padding: '16px 32px',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <Icons.Terminal size={20} />
              DASHBOARD
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
