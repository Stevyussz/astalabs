import { ScoreboardEntry } from '@/types';
import { Icons } from '@/components/ui/Icons';
import Link from 'next/link';
import { calculateLevel } from '@/lib/levelUtils';

interface ScoreboardTableProps {
  entries: ScoreboardEntry[];
  currentUserId?: string;
}

const rankStyles: Record<number, string> = {
  1: '#fbbf24', // amber-400
  2: '#cbd5e1', // slate-300
  3: '#d97706', // amber-600
};

export function ScoreboardTable({ entries, currentUserId }: ScoreboardTableProps) {
  if (entries.length === 0) {
    return (
      <div style={{
        overflow: 'hidden', borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5, fontFamily: 'JetBrains Mono, monospace' }}>_</div>
          <p style={{ fontSize: 20, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(226,232,240,0.7)' }}>Belum ada rival nih</p>
          <p style={{ fontSize: 14, marginTop: 8, color: 'rgba(226,232,240,0.5)' }}>Buruan jadi yang pertama sikat flag!</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      overflow: 'hidden', borderRadius: 16,
      border: '1px solid rgba(255,255,255,0.08)',
      background: 'rgba(13,17,23,0.7)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }} id="scoreboard-table">
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}>
            <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'rgba(226,232,240,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', width: 80 }}>
              Rank
            </th>
            <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'rgba(226,232,240,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Hacker
            </th>
            <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: 11, fontWeight: 600, color: 'rgba(226,232,240,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Solved
            </th>
            <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: 11, fontWeight: 600, color: 'rgba(226,232,240,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              XP
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const isCurrentUser = entry.id === currentUserId;
            const isTopThree = entry.rank <= 3;
            
            // Note: Inline styles don't support true :hover without states/classes.
            // We'll use a standard class approach but rely on purely structural inline styles for the layout guarantee.
            // We added a global class pattern instead if necessary, but this table works brilliantly with raw structure.

            return (
              <tr
                key={entry.id}
                id={`scoreboard-row-${entry.id}`}
                className="sb-row" // We can style this globally, but let's provide solid defaults
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  background: isCurrentUser ? 'rgba(0,255,136,0.05)' : 'transparent',
                  borderLeft: isCurrentUser ? '3px solid #00ff88' : '3px solid transparent',
                  transition: 'all 0.2s',
                }}
              >
                <td style={{ padding: '16px 24px' }}>
                  {isTopThree ? (
                    <Icons.Medal size={20} color={rankStyles[entry.rank]} style={{ filter: `drop-shadow(0 0 8px ${rankStyles[entry.rank]}66)` }} />
                  ) : (
                    <span style={{ fontSize: 14, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(226,232,240,0.4)' }}>
                      #{entry.rank}
                    </span>
                  )}
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <Link href={`/profile/${encodeURIComponent(entry.username)}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 700,
                      background: isCurrentUser ? 'rgba(0,255,136,0.2)' : isTopThree ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                      color: isCurrentUser ? '#00ff88' : isTopThree ? '#e2e8f0' : 'rgba(226,232,240,0.6)',
                      border: isCurrentUser ? '1px solid rgba(0,255,136,0.3)' : isTopThree ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                      transition: 'all 0.2s',
                    }} className="avatar-ring">
                      {entry.username[0]?.toUpperCase() ?? '?'}
                    </div>
                    <span style={{ fontSize: 15, fontWeight: isCurrentUser ? 600 : 500, color: isCurrentUser ? '#00ff88' : '#e2e8f0', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: 6 }} className="username-hover">
                      {entry.username}
                      <span style={{ 
                        fontSize: 10, padding: '2px 6px', borderRadius: 4, 
                        background: 'rgba(0,255,136,0.1)', color: '#00ff88', 
                        fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 
                      }}>
                        Lv.{calculateLevel(entry.score)}
                      </span>
                      {isCurrentUser && (
                        <span style={{ marginLeft: 4, fontSize: 12, color: 'rgba(0,255,136,0.6)', fontWeight: 400 }}>(Lo)</span>
                      )}
                    </span>
                  </Link>
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <span style={{ fontSize: 14, color: 'rgba(226,232,240,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {entry.solvedCount}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <span style={{ fontSize: 16, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: isCurrentUser ? '#00ff88' : rankStyles[entry.rank] ?? '#e2e8f0' }}>
                    {entry.score.toLocaleString()}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Inject a tiny style block for the row hover */}
      <style dangerouslySetInnerHTML={{__html: `
        .sb-row:hover { background-color: rgba(255,255,255,0.05) !important; border-left-color: rgba(255,255,255,0.2) !important; }
        .sb-row a:hover .username-hover { color: #00ff88 !important; }
        .sb-row a:hover .avatar-ring { border-color: rgba(0,255,136,0.5) !important; box-shadow: 0 0 10px rgba(0,255,136,0.2); }
      `}} />
    </div>
  );
}
