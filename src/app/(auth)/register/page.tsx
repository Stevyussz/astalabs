// src/app/(auth)/register/page.tsx
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { RegisterForm } from './RegisterForm';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Buat akun untuk berpartisipasi di CTF.',
};

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user) {
    redirect('/challenges');
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 68px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px',
      position: 'relative',
    }}>
      <div style={{ width: '100%', maxWidth: 460, animation: 'fade-in-up 0.5s ease-out forwards' }}>
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
            <svg style={{ width: 32, height: 32, color: '#00ff88' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', fontWeight: 800, color: '#e2e8f0', letterSpacing: '-0.02em', marginBottom: 8 }}>
            Masuk ke Arena
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(226,232,240,0.5)', lineHeight: 1.5 }}>
            Bikin akun kamu sekarang dan buktiin skill kamu
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
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,255,136,0.1)', filter: 'blur(20px)', borderRadius: 24, pointerEvents: 'none' }} />

          <div style={{
            position: 'relative',
            background: 'rgba(8,11,16,0.95)',
            backdropFilter: 'blur(30px)',
            borderRadius: 23,
            padding: '40px 32px',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.15,
              backgroundImage: 'linear-gradient(rgba(0,255,136,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.2) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }} />

            <div style={{ position: 'relative', zIndex: 10 }}>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
