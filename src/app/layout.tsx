// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://astalabs.yusrilastaghina.my.id'),
  title: {
    default: 'AstaLabs CTF | Belajar Cybersecurity & Hacking by Yusril Astaghina',
    template: '%s | AstaLabs CTF by Yusril',
  },
  description:
    'AstaLabs CTF adalah platform Capture The Flag dan Cybersecurity Academy paling komprehensif di Indonesia. Dibangun oleh Yusril Astaghina (Stevyussz). Tingkatkan skill Web Security, Kriptografi, Forensik, PWN, dan pelajari hacking secara nyata.',
  keywords: ['AstaLabs', 'AstaLabs CTF', 'astalabs yusril', 'apa itu astalabs', 'CTF indonesia', 'capture the flag', 'hacking academy', 'belajar cybersecurity', 'Yusril Astaghina', 'Stevyussz', 'AstaLabs Expert CTF'],
  authors: [{ name: 'Yusril Astaghina', url: 'https://github.com/Stevyussz' }],
  creator: 'Yusril Astaghina',
  publisher: 'AstaLabs',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: 'AstaLabs CTF by Yusril Astaghina',
    description: 'Platform latihan CTF (Capture The Flag) real-world terbaik di Indonesia. Asah keahlian Web Security & Hacking di Akademi AstaLabs.',
    url: 'https://astalabs.yusrilastaghina.my.id',
    siteName: 'AstaLabs CTF',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AstaLabs CTF' }],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AstaLabs CTF | Belajar Hacking Nyata',
    description: 'Platform CTF dan Cybersecurity buatan Yusril Astaghina. Hack the box, pelajari SQLi, SSRF, RCE di real-case environment.',
    creator: '@Stevyussz',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "AstaLabs CTF",
              "alternateName": ["AstaLabs", "AstaLabs Yusril", "AstaLabs CTF by Yusril Astaghina"],
              "url": "https://astalabs.yusrilastaghina.my.id",
              "description": "Platform pembelajaran cybersecurity dan Capture The Flag (CTF) terbesar.",
              "author": {
                "@type": "Person",
                "name": "Yusril Astaghina",
                "alternateName": "Stevyussz"
              },
              "publisher": {
                "@type": "Organization",
                "name": "AstaLabs"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [{
                "@type": "Question",
                "name": "Apa itu AstaLabs CTF?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "AstaLabs CTF adalah platform pelatihan Cybersecurity dan arena kompetisi Capture The Flag (CTF) yang dikembangkan oleh Yusril Astaghina. Platform ini menyajikan misi-misi nyata mulai dari Web Security, Kriptografi, hingga forensik digital."
                }
              }, {
                "@type": "Question",
                "name": "Siapa pembuat AstaLabs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "AstaLabs diciptakan dan dikembangkan oleh spesialis cybersecurity bernama Yusril Astaghina (dikenal juga dengan alias Stevyussz)."
                }
              }]
            })
          }}
        />
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
