"use client";

import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface RadarProps {
  categoryCounts: Record<string, number>;
}

export function RadarSkillChart({ categoryCounts }: RadarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Normalize data for the chart
  const data = [
    { subject: 'WEB', A: categoryCounts['web'] || 0, fullMark: 10 },
    { subject: 'CRYPTO', A: categoryCounts['crypto'] || 0, fullMark: 10 },
    { subject: 'PWN', A: categoryCounts['pwn'] || 0, fullMark: 10 },
    { subject: 'FORENSICS', A: categoryCounts['forensics'] || 0, fullMark: 10 },
    { subject: 'REVERSE', A: categoryCounts['reverse'] || 0, fullMark: 10 },
    { subject: 'MISC/BOX', A: (categoryCounts['misc'] || 0) + (categoryCounts['box-astacorp'] || 0), fullMark: 5 },
  ];

  if (!mounted) {
    return <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00ff88', fontFamily: 'monospace' }}>INITIALIZING RADAR HUD...</div>;
  }

  // Calculate the sum to see if it's completely empty. If so, just show an empty hexagon or 0 values.
  const total = data.reduce((sum, item) => sum + item.A, 0);

  return (
    <div style={{
      width: '100%', 
      height: 350, 
      background: 'linear-gradient(135deg, rgba(8,11,16,0.8), rgba(13,17,23,0.9))',
      border: '1px solid rgba(0,255,136,0.1)',
      borderRadius: 16,
      boxShadow: 'inset 0 0 40px rgba(0,255,136,0.03)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* HUD Accents */}
      <div style={{ position: 'absolute', top: 16, left: 24, fontSize: 10, color: 'rgba(0,255,136,0.5)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: 2 }}>
        OP_RADAR_SKILL_MATRIX
      </div>
      <div style={{ position: 'absolute', bottom: 16, right: 24, fontSize: 10, color: 'rgba(59,130,246,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>
        SYS_VER: 2.1.4
      </div>

      <ResponsiveContainer width="100%" height="100%" style={{ marginTop: 20 }}>
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.05)" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: 'rgba(226,232,240,0.6)', fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, Math.max(5, total > 10 ? 20 : 10)]} 
            tick={false} 
            axisLine={false} 
          />
          <Tooltip 
            contentStyle={{ background: 'rgba(13,17,23,0.9)', border: '1px solid rgba(0,255,136,0.2)', borderRadius: 8, color: '#e2e8f0', fontSize: 12, fontFamily: 'monospace' }} 
            itemStyle={{ color: '#00ff88', fontWeight: 'bold' }} 
          />
          <Radar
            name="Solve Count"
            dataKey="A"
            stroke="#00ff88"
            strokeWidth={2}
            fill="url(#colorUv)"
            fillOpacity={1}
            isAnimationActive={true}
            animationDuration={1500}
            animationEasing="ease-out"
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="#00ff88" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
