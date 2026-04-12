// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'AstaLabs | Capture The Flag',
    template: '%s | AstaLabs',
  },
  description:
    'Platform CTF paling gokil buat kamu asah skill hacking. Sikat misi web, crypto, forensics, pwn, sampe reverse engineering buat kejar ranking!',
  keywords: ['CTF', 'capture the flag', 'hacking', 'keamanan siber', 'tantangan', 'AstaLabs', 'belajar hacking'],
  authors: [{ name: 'AstaLabs' }],
  robots: 'index, follow',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Forces responsive lockdown to prevent weird zooms
  themeColor: '#00ff88',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen flex-col bg-cyber-dark text-foreground antialiased">
        <SessionProvider>
          <Navbar />
          <main style={{ flex: 1, paddingTop: 68, minHeight: 'calc(100vh - 200px)' }}>
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
