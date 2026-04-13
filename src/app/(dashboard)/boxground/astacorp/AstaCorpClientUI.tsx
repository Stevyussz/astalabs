'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

type Challenge = {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty: string;
  isSolved: boolean;
  hints: { content: string; cost: number }[];
};

export default function AstaCorpClientUI({ challenges, currentScore }: { challenges: Challenge[], currentScore: number }) {
  const [flags, setFlags] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);

  const handleSubmit = async (challengeId: string) => {
    const flagInput = flags[challengeId]?.trim();
    if (!flagInput) {
      alert('Masukkan flag terlebih dahulu!');
      return;
    }

    setSubmitting(challengeId);
    try {
      const res = await fetch('/api/submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeId, flag: flagInput })
      });
      const data = await res.json();
      
      if (data.success) {
        alert(data.message || 'FLAG DITERIMA. Sistem dibobol!');
        setTimeout(() => window.location.reload(), 500);
      } else {
        alert(data.message || 'FLAG SALAH. Akses Ditolak.');
      }
    } catch (err: any) {
      alert('Terjadi kesalahan sistem.');
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <div style={{ marginTop: 40 }}>
      {challenges.length === 0 ? (
        <div style={{ padding: 40, background: 'rgba(255,255,255,0.02)', borderRadius: 16, textAlign: 'center', color: '#94a3b8' }}>
          Data misi belum di-injeksi ke dalam matriks. Jalankan Seeder.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#e2e8f0', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Icons.Target size={24} color="#00ff88" />
            MISI OPERASI ASTACORP ({challenges.filter(c => c.isSolved).length} / {challenges.length})
          </h2>
          
          {challenges.map((ch, idx) => (
            <div key={ch.id} style={{ 
              background: ch.isSolved ? 'rgba(0,255,136,0.05)' : 'rgba(13,17,23,0.8)',
              border: ch.isSolved ? '1px solid rgba(0,255,136,0.3)' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: 24,
              display: 'flex', gap: 24, flexWrap: 'wrap',
              opacity: ch.isSolved ? 0.7 : 1,
              transition: 'all 0.3s'
            }}>
              <div style={{ width: 48, height: 48, borderRadius: 24, background: ch.isSolved ? 'rgba(0,255,136,0.2)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 20, fontWeight: 800, color: ch.isSolved ? '#00ff88' : '#e2e8f0' }}>
                {ch.isSolved ? '✓' : (idx + 1)}
              </div>
              
              <div style={{ flex: 1, minWidth: 250 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 18, color: ch.isSolved ? '#00ff88' : '#fff' }}>{ch.title}</h3>
                  <span style={{ fontSize: 12, fontWeight: 800, color: '#94a3b8' }}>{ch.points} XP</span>
                </div>
                
                <div style={{ color: 'rgba(226,232,240,0.6)', fontSize: 14, lineHeight: 1.6, marginBottom: 16, whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: ch.description }} />
                
                {ch.hints && ch.hints.length > 0 && !ch.isSolved && (
                  <div style={{ marginTop: 12, marginBottom: 16 }}>
                    <p style={{ margin: '0 0 8px 0', fontSize: 12, color: '#f59e0b', fontWeight: 600 }}>Tersedia {ch.hints.length} Hint (Mengkonsumsi XP)</p>
                    {/* Buka Hint UI bisa ditambahkan di sini, untuk sementara kita fokus pada FLAG submission */}
                     <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: 4 }}>Hint dapat diakses via mode Terminal.</span>
                  </div>
                )}
              </div>

              {!ch.isSolved && (
                <div style={{ width: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', marginBottom: 8, letterSpacing: '1px' }}>KUMPULKAN FLAG</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input 
                      type="text" 
                      placeholder="CTF{...}"
                      value={flags[ch.id] || ''}
                      onChange={(e) => setFlags({ ...flags, [ch.id]: e.target.value })}
                      style={{ flex: 1, padding: '10px 12px', background: '#000', border: '1px solid rgba(255,255,255,0.1)', color: '#00ff88', borderRadius: 8, outline: 'none', fontFamily: 'monospace' }}
                    />
                    <button 
                      onClick={() => handleSubmit(ch.id)}
                      disabled={submitting === ch.id}
                      style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, padding: '0 16px', fontWeight: 700, cursor: submitting === ch.id ? 'not-allowed' : 'pointer' }}
                    >
                      {submitting === ch.id ? 'VERIFY...' : 'SUBMIT'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
