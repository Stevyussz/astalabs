"use client";

import React, { useEffect, useState } from 'react';
import { Icons } from '@/components/ui/Icons';

interface FeedItem {
  _id: string;
  createdAt: string;
  bloodTier?: number;
  userId: {
    username: string;
    score: number;
  };
  challengeId: {
    title: string;
    category: string;
    points: number;
  };
}

export function LiveAttackFeed() {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    try {
      const res = await fetch('/api/feed');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setFeed(data.data);
      }
    } catch (e) {
      console.error("Failed to fetch attack feed", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
    const interval = setInterval(fetchFeed, 15000); // refresh every 15 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080b10', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ color: '#00ff88', fontFamily: 'monospace', animation: 'pulse 1s infinite' }}>[ INTERCEPTING GLOBAL COMMS... ]</p>
      </div>
    );
  }

  return (
    <div style={{ 
      background: '#080b10', 
      border: '1px solid rgba(255,255,255,0.05)', 
      borderRadius: 16, 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: 480
    }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', animation: 'pulse 2s infinite' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', opacity: 0.5 }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e', opacity: 0.5 }} />
        </div>
        <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#e2e8f0', letterSpacing: 1, fontFamily: 'JetBrains Mono, monospace' }}>GLOBAL_ATTACK_FEED</h3>
      </div>

      {/* Feed List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }} className="custom-scrollbar">
        {feed.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'rgba(226,232,240,0.4)', fontSize: 13, marginTop: 40, fontFamily: 'monospace' }}>No recent activity intercepted.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {feed.map((item, idx) => {
               // Determine exact visuals
               let isBlood = !!item.bloodTier;
               let accent = isBlood ? '#ef4444' : '#00ff88';
               let bg = isBlood ? 'rgba(239,68,68,0.05)' : 'transparent';
               let bloodText = '';
               
               if (item.bloodTier === 1) bloodText = 'FIRST BLOOD 🩸';
               if (item.bloodTier === 2) bloodText = 'SECOND BLOOD 🩸';
               if (item.bloodTier === 3) bloodText = 'THIRD BLOOD 🩸';

               const timeStr = new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

               return (
                 <div key={item._id} style={{ 
                   padding: '12px 20px', 
                   borderBottom: '1px solid rgba(255,255,255,0.02)',
                   background: bg,
                   transition: 'background 0.2s',
                   display: 'flex',
                   gap: 16
                 }}
                 className="hover:bg-white/5"
                 >
                    <div style={{ color: 'rgba(226,232,240,0.4)', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', paddingTop: 2 }}>
                      [{timeStr}]
                    </div>
                    <div>
                      {isBlood && (
                        <div style={{ display: 'inline-block', fontSize: 10, fontWeight: 900, background: '#ef4444', color: '#fff', padding: '2px 8px', borderRadius: 4, marginBottom: 6, letterSpacing: 1 }}>
                          {bloodText}
                        </div>
                      )}
                      <p style={{ margin: 0, fontSize: 14, color: 'rgba(226,232,240,0.8)', lineHeight: 1.5 }}>
                        <a href={`/profile/${item.userId?.username}`} style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>{item.userId?.username}</a> 
                        {' '}hacked{' '}
                        <span style={{ color: accent, fontWeight: 700 }}>{item.challengeId?.title}</span> 
                        <span style={{ fontSize: 12, color: 'rgba(226,232,240,0.5)', marginLeft: 8 }}>({item.challengeId?.category})</span>
                      </p>
                    </div>
                 </div>
               );
            })}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); borderRadius: 4px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); }
      `}} />
    </div>
  );
}
