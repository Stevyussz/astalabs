'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Icons } from '@/components/ui/Icons';
import { Badge } from '@/components/ui/Badge';
import { getCourseById, Course, Chapter } from '@/data/academy';

import { use } from 'react';

// For Next.js 16+, params should be unrolled or accessed carefully 
// if it's async under the hood, but in 'use client' page, Next recommends `React.use()` for Promise wrapped params or we can just fetch it inside useEffect if needed.
// However, typically in client components standard params work, but let's use the new Next.js 15/16 standard.
export default function AcademyChapterPage({ params }: { params: Promise<{ courseId: string; chapterId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { data: session, status } = useSession();

  const course = getCourseById(resolvedParams.courseId);
  const chapterIdx = course?.chapters.findIndex(c => c.id === resolvedParams.chapterId) ?? -1;
  const currentChapter = course?.chapters[chapterIdx];

  const [activeTab, setActiveTab] = useState<'theory' | 'playground'>('theory');

  if (!course || !currentChapter) {
    return notFound();
  }

  // --- HACKER LOADING STATE ---
  if (status === 'loading') {
    return (
      <div style={{ minHeight: 'calc(100vh - 68px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#080b10' }}>
        <div style={{ fontSize: '48px', color: '#00ff88', marginBottom: '20px', animation: 'pulse 1s infinite', fontFamily: 'JetBrains Mono, monospace' }}>
          {'[||||||  ]'}
        </div>
        <p style={{ color: '#00ff88', fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', letterSpacing: '0.2em' }}>
          DECRYPTING MODULE...
        </p>
      </div>
    );
  }

  // --- TIME LOCK LOGIC (1 Hour Karantina) ---
  const userCreatedAt = session?.user ? (session.user as any).createdAt : null;
  if (userCreatedAt) {
    const createdAt = new Date(userCreatedAt).getTime();
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    if (now - createdAt < oneHour) {
      const remainingMinutes = Math.ceil((oneHour - (now - createdAt)) / 60000);
      return (
        <div style={{ minHeight: 'calc(100vh - 68px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center', backgroundColor: '#080b10' }}>
          <div style={{ 
            background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', 
            borderRadius: '16px', padding: '40px', maxWidth: '500px',
            animation: 'pulse 3s infinite',
            boxShadow: '0 0 40px rgba(239,68,68,0.1) inset' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <Icons.Lock size={48} color="#ef4444" />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444', marginBottom: '12px', letterSpacing: '2px', fontFamily: 'JetBrains Mono, monospace' }}>
              AKSES DITOLAK
            </h1>
            <p style={{ color: 'rgba(226,232,240,0.7)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
              Anda belum diizinkan membuka arsip rahasia ini. Akun baru harus melewati masa karantina selama 1 jam.
            </p>
            <div style={{ background: '#000', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'JetBrains Mono, monospace', color: '#f59e0b', fontSize: '14px', marginBottom: '24px' }}>
              Waktu Karantina Tersisa: {remainingMinutes} Menit
            </div>
            <button onClick={() => router.push('/academy')} style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold' }}>Kembali</button>
          </div>
        </div>
      );
    }
  }

  const hasLab = !!currentChapter.labUrl;
  
  // Always default to theory on load, or if changing lessons
  useEffect(() => {
    setActiveTab('theory');
  }, [currentChapter.id]);

  const prevChapter = chapterIdx > 0 ? course.chapters[chapterIdx - 1] : null;
  const nextChapter = chapterIdx < course.chapters.length - 1 ? course.chapters[chapterIdx + 1] : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 68px)', overflow: 'hidden' }}>
      {/* Header bar */}
      <div style={{ height: 60, borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(8,11,16,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/academy" style={{ color: 'rgba(226,232,240,0.5)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 18, marginRight: 8 }}>←</span> Modul
          </Link>
          <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icons.Globe size={20} color="#3b82f6" />
            <span style={{ fontWeight: 600, color: '#e2e8f0' }} className="hidden sm:inline-block">{course.title}</span>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        {hasLab && (
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
        )}
      </div>

      {/* Main Split View */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* === LEFT SIDEBAR: CHAPTER LIST (Desktop Only) === */}
        <div className="hidden lg:flex w-64 flex-col border-r border-white/10 bg-[#080b10] flex-shrink-0" style={{ overflowY: 'auto' }}>
          <div style={{ padding: '24px 16px 12px', fontSize: 11, fontWeight: 600, color: 'rgba(226,232,240,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Daftar Bab
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '0 12px', gap: 4 }}>
            {course.chapters.map((ch, idx) => {
              const isActive = ch.id === currentChapter.id;
              return (
                <Link
                  key={ch.id}
                  href={`/academy/${course.id}/${ch.id}`}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 500,
                    textDecoration: 'none',
                    color: isActive ? '#00ff88' : 'rgba(226,232,240,0.7)',
                    background: isActive ? 'rgba(0,255,136,0.08)' : 'transparent',
                    border: isActive ? '1px solid rgba(0,255,136,0.2)' : '1px solid transparent',
                    display: 'flex', alignItems: 'center', gap: 8,
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ width: 20, height: 20, borderRadius: '4px', background: isActive ? 'rgba(0,255,136,0.15)' : 'rgba(255,255,255,0.05)', color: isActive ? '#00ff88' : 'rgba(226,232,240,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>
                    {idx + 1}
                  </div>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ch.title.split(': ')[1] || ch.title}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* === CENTER: THEORY === */}
        <div className={`md:flex flex-col w-full ${hasLab ? 'md:w-1/2 lg:w-[calc(50%-128px)]' : 'lg:w-[calc(100%-256px)]'} border-r border-white/10 bg-[#0c1015] ${activeTab === 'theory' ? 'block' : 'hidden'}`} style={{ overflowY: 'auto' }}>
          <div style={{ padding: '40px 32px', maxWidth: hasLab ? 600 : 800, margin: '0 auto', width: '100%' }}>
            <Badge variant="easy" style={{ marginBottom: 16 }}>{course.title}</Badge>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#e2e8f0', marginBottom: 24, lineHeight: 1.3 }}>{currentChapter.title}</h1>
            
            <div 
              style={{ fontSize: 15, color: 'rgba(226,232,240,0.75)', lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{ __html: currentChapter.content }}
            />

            {hasLab && currentChapter.labInstruction && (
              <div style={{ background: 'rgba(59,130,246,0.1)', borderLeft: '4px solid #3b82f6', padding: '16px 20px', borderRadius: '0 8px 8px 0', marginTop: 32 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0', marginBottom: 8, fontFamily: 'JetBrains Mono,monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Tugas Lab Praktik</h3>
                <p style={{ color: 'rgba(226,232,240,0.8)', fontSize: 14, lineHeight: 1.6 }}>
                  {currentChapter.labInstruction}
                </p>
              </div>
            )}

            {/* Prev / Next Navigation in Footer */}
            <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               {prevChapter ? (
                  <Link href={`/academy/${course.id}/${prevChapter.id}`} style={{ fontSize: 14, color: 'rgba(226,232,240,0.6)', textDecoration: 'none', display: 'flex', gap: 6 }}>
                    <span>&larr;</span> Sebelumnya
                  </Link>
               ) : <div/>}

               {nextChapter ? (
                 <Link href={`/academy/${course.id}/${nextChapter.id}`} style={{ padding: '10px 20px', background: '#e2e8f0', color: '#080b10', fontWeight: 600, borderRadius: 8, textDecoration: 'none', fontSize: 14 }}>
                   Bab Selanjutnya &rarr;
                 </Link>
               ) : (
                 <Link href="/challenges" style={{ padding: '10px 20px', background: '#00ff88', color: '#080b10', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: 14 }}>
                   Tamat! Tundukkan Misi Asli
                 </Link>
               )}
            </div>
          </div>
        </div>

        {/* === RIGHT: PLAYGROUND === */}
        {hasLab && (
          <div className={`md:flex flex-col w-full md:w-1/2 lg:w-1/2 bg-[#080b10] relative ${activeTab === 'playground' ? 'flex' : 'hidden'} flex-shrink-0 min-h-[60vh] md:min-h-0`}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 40, background: '#1e293b', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8, zIndex: 10 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#eab308' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
              <div style={{ margin: '0 auto', fontSize: 12, fontFamily: 'JetBrains Mono,monospace', color: 'rgba(255,255,255,0.4)', userSelect: 'none' }}>
                astalabs-terminal ~ {currentChapter.labUrl}
              </div>
            </div>
            
            <div style={{ marginTop: 40, flex: 1, backgroundColor: '#080b10' }}>
              <iframe 
                src={currentChapter.labUrl} 
                style={{ width: '100%', height: '100%', border: 'none', background: '#080b10' }}
                title="AstaLabs Live Playground"
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
          </div>
        )}

        {!hasLab && (
          <div className="hidden md:flex flex-col w-1/2 lg:w-[256px] flex-shrink-0 bg-[#080b10] relative items-center justify-center border-l border-white/5">
             <div style={{ textAlign: 'center', opacity: 0.1 }}>
                <Icons.Target size={80} />
                <p style={{ marginTop: 16, fontFamily: 'JetBrains Mono,monospace', fontSize: 12 }}>RELAX. MURNI TEORI MENTAH.</p>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
