import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Icons } from '@/components/ui/Icons';
import { Metadata } from 'next';
import { connectDB } from '@/lib/db';
import Challenge from '@/models/Challenge';
import User from '@/models/User';
import AstaCorpClientUI from './AstaCorpClientUI';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Box: AstaCorp | AstaLabs',
};

export default async function AstaCorpBoxPage() {
  const session = await auth();
  if (!session) redirect('/login');
  
  const user = session.user;

  // Fetch astacorp challenges directly from DB
  await connectDB();
  
  // We identify Box challenges by a unique string in the ID or Category
  const challengesDocs = await Challenge.find({ category: 'box-astacorp' }).sort({ points: 1 }).lean();
                             
  // Get user's solved info
  const userDoc = await User.findOne({ username: ((session.user) as any).username }).lean();
  const solvedIds = (userDoc?.solvedChallenges || []).map((id: any) => id.toString());

  // Convert ObjectIds to strings to pass to client
  const safeChallenges = challengesDocs.map((c: any) => ({
    id: c._id.toString(),
    title: c.title,
    description: c.description,
    points: c.points,
    difficulty: c.difficulty,
    hints: c.hints.map((h: any) => ({ content: h.content, cost: h.cost })),
    isSolved: solvedIds.includes(c._id.toString())
  }));

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
      
      {/* Box Header Information */}
      <div style={{ 
        background: 'linear-gradient(135deg, rgba(8,11,16,1) 0%, rgba(30,58,138,0.2) 100%)',
        border: '1px solid rgba(59,130,246,0.3)',
        borderRadius: 20,
        padding: 40,
        marginBottom: 40,
        display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap'
      }}>
        <div style={{ background: '#0f172a', padding: 32, borderRadius: 24, border: '1px solid rgba(59,130,246,0.5)', boxShadow: '0 0 40px rgba(59,130,246,0.2)' }}>
           <Icons.Globe size={80} color="#3b82f6" />
        </div>
        <div style={{ flex: 1, minWidth: 300 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <h1 style={{ fontSize: 36, fontWeight: 900, color: '#fff', margin: 0 }}>AstaCorp</h1>
            <span style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b', padding: '4px 12px', borderRadius: 8, fontSize: 13, fontWeight: 800 }}>MEDIUM</span>
          </div>
          <p style={{ color: 'rgba(226,232,240,0.7)', fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>
            Website profil perusahaan fiktif yang baru saja rilis. Server utamanya mungkin terlihat aman, namun pengembangnya sering meletakkan kredensial rahasia secara ceroboh dan melupakan basic logic flaw.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
             <a href="/boxes/astacorp" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <button style={{ background: '#3b82f6', color: '#fff', padding: '12px 24px', borderRadius: 8, fontWeight: 800, fontSize: 15, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icons.Target size={18} /> AKSES SERVER TARGET
                </button>
             </a>
             <div style={{ padding: '12px 24px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: 14, fontFamily: 'monospace', display: 'flex', alignItems: 'center' }}>
               Target URL: ./boxes/astacorp
             </div>
          </div>
        </div>
      </div>

      <AstaCorpClientUI challenges={safeChallenges} currentScore={userDoc?.score || 0} />
      
    </div>
  );
}
