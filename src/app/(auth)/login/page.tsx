// src/app/(auth)/login/page.tsx
import type { Metadata } from 'next';
import { LoginForm } from './LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Masuk ke akun AstaLabs Anda.',
};

export default function LoginPage() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 68px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px',
      position: 'relative',
    }}>
      <div style={{ width: '100%', maxWidth: 440, animation: 'fade-in-up 0.5s ease-out forwards' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 64, height: 64, borderRadius: 16,
            background: 'rgba(0,255,136,0.1)',
            border: '1px solid rgba(0,255,136,0.25)',
            marginBottom: 20,
            boxShadow: '0 0 30px rgba(0,255,136,0.1) inset'
          }}>
            <span style={{ fontSize: 24, fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, color: '#00ff88' }}>{'>'}_</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', fontWeight: 800, color: '#e2e8f0', letterSpacing: '-0.02em', marginBottom: 8 }}>
            Balik lagi, operative?
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(226,232,240,0.5)', lineHeight: 1.5 }}>
            Login ke akun kamu buat lanjutin peretasan
          </p>
        </div>

        {/* Card */}
        <div style={{
          position: 'relative',
          padding: 1,
          borderRadius: 24,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(0,255,136,0.3), rgba(255,255,255,0.05))',
          boxShadow: '0 10px 50px rgba(0,0,0,0.5)',
        }}>
          {/* Outer glow */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,255,136,0.1)', filter: 'blur(20px)', borderRadius: 24, pointerEvents: 'none' }} />

          <div style={{
            position: 'relative',
            background: 'rgba(8,11,16,0.95)',
            backdropFilter: 'blur(30px)',
            borderRadius: 23,
            padding: '40px 32px',
            overflow: 'hidden',
          }}>
            {/* Inner subtle grid */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.15,
              backgroundImage: 'linear-gradient(rgba(0,255,136,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.2) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }} />

            <div style={{ position: 'relative', zIndex: 10 }}>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
