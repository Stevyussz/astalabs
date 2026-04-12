'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';
import { Badge } from '@/components/ui/Badge';

export default function Web101Module() {
  const [activeTab, setActiveTab] = useState<'theory' | 'playground'>('theory');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 68px)', overflow: 'hidden' }}>
      {/* Header bar */}
      <div style={{ height: 60, borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(8,11,16,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/academy" style={{ color: 'rgba(226,232,240,0.5)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 18, marginRight: 8 }}>←</span> Academy
          </Link>
          <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icons.Globe size={20} color="#3b82f6" />
            <span style={{ fontWeight: 600, color: '#e2e8f0' }}>Web Security 101</span>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex md:hidden gap-2">
          <button
            onClick={() => setActiveTab('theory')}
            style={{ padding: '6px 12px', borderRadius: 8, background: activeTab === 'theory' ? 'rgba(0,255,136,0.1)' : 'transparent', color: activeTab === 'theory' ? '#00ff88' : '#e2e8f0', border: activeTab === 'theory' ? '1px solid rgba(0,255,136,0.3)' : '1px solid transparent', fontSize: 13, fontWeight: 600 }}
          >
            Materi
          </button>
          <button
            onClick={() => setActiveTab('playground')}
            style={{ padding: '6px 12px', borderRadius: 8, background: activeTab === 'playground' ? 'rgba(0,255,136,0.1)' : 'transparent', color: activeTab === 'playground' ? '#00ff88' : '#e2e8f0', border: activeTab === 'playground' ? '1px solid rgba(0,255,136,0.3)' : '1px solid transparent', fontSize: 13, fontWeight: 600 }}
          >
            Terminal
          </button>
        </div>
      </div>

      {/* Main Split View */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Left: Theory (Visible on desktop or when mobile tab is theory) */}
        <div className={`md:flex flex-col w-full md:w-1/2 border-r border-white/10 bg-[#0c1015] ${activeTab === 'theory' ? 'block' : 'hidden'}`} style={{ overflowY: 'auto' }}>
          <div style={{ padding: '40px 32px', maxWidth: 600, margin: '0 auto' }}>
            <Badge variant="easy" style={{ marginBottom: 16 }}>Pemula</Badge>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: '#e2e8f0', marginBottom: 24, lineHeight: 1.2 }}>Bab 1: Menembus Kode Sumber (Source Code)</h1>
            
            <div style={{ fontSize: 15, color: 'rgba(226,232,240,0.7)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p>
                Halo operative! Selamat datang di kelask pertama Web Security. Di materi ini, kita bakal bahas kesalahan fundamental yang paling sering dilakukan developer: <strong>Ninggalin komentar rahasia di Frontend.</strong>
              </p>
              
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#e2e8f0', marginTop: 24, marginBottom: 8 }}>Apa itu Inspect Element?</h2>
              <p>
                Browser merender website bedasarkan kode HTML, CSS, dan JavaScript yang dikirim oleh server. Tapi tahukah kamu kalau kita bisa melihat kode mentahnya secara langsung?
              </p>
              <div style={{ padding: 16, background: 'rgba(0,0,0,0.3)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#a8c7fa' }}>
                <span style={{ color: '#8b949e' }}>&lt;!-- Ini adalah komentar HTML --&gt;</span><br />
                &lt;div&gt;Halo Dunia&lt;/div&gt;<br />
                <span style={{ color: '#8b949e' }}>&lt;!-- Jangan lupa hapus password admin ini sebelum rilis: admin123 --&gt;</span>
              </div>
              <p>
                Developer sering banget ninggalin catatan untuk diri mereka sendiri, dan lupa nge-hapusnya sebelum website *Live* (Production). Kalau kamu tekan <kbd style={{ background: '#333', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace' }}>Ctrl + U</kbd> atau klik kanan &gt; <strong>Inspect</strong>, kamu bisa melihat semuanya.
              </p>

              <div style={{ background: 'rgba(59,130,246,0.1)', borderLeft: '4px solid #3b82f6', padding: '16px 20px', borderRadius: '0 8px 8px 0', marginTop: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0', marginBottom: 8, fontFamily: 'JetBrains Mono,monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Tugas Praktik</h3>
                <p style={{ color: 'rgba(226,232,240,0.8)', fontSize: 14 }}>
                  Di panel Terminal Live Playground (sebelah kanan), sebuah sistem rahasia sedang berjalan. Coba gunakan fitur "View Page Source" atau "Inspect Element" pada area playground tersebut untuk menemukan *flag* yang disembunyikan developer.
                </p>
              </div>

              <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <p style={{ fontSize: 14, color: 'rgba(226,232,240,0.5)', marginBottom: 16 }}>Bisa pecahkan misterinya?</p>
                <Link href="/challenges" style={{
                  display: 'inline-flex', padding: '10px 20px', background: '#00ff88', color: '#080b10', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: 14, alignItems: 'center', gap: 8
                }}>
                  Submit Flag di Misi
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Playground (Visible on desktop or when mobile tab is playground) */}
        <div className={`md:flex flex-col w-full md:w-1/2 bg-[#080b10] relative ${activeTab === 'playground' ? 'block' : 'hidden'}`}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 40, background: '#1e293b', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#eab308' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
            <div style={{ margin: '0 auto', fontSize: 12, fontFamily: 'JetBrains Mono,monospace', color: 'rgba(255,255,255,0.4)', userSelect: 'none' }}>
              astalabs-terminal ~ /labs/mata-batin
            </div>
          </div>
          
          <div style={{ marginTop: 40, flex: 1, backgroundColor: '#fff' }}>
            <iframe 
              src="/labs/mata-batin" 
              style={{ width: '100%', height: '100%', border: 'none', background: '#080b10' }}
              title="AstaLabs Live Playground"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
