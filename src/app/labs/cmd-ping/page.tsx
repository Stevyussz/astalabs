'use client';
import { useState } from 'react';

export default function CmdPingLab() {
  const [ip, setIp] = useState('8.8.8.8');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  // Simulasi Node.js eksekusi child_process.exec()
  const handlePing = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      let result = `PING ${ip} (${ip}) 56(84) bytes of data.\n`;
      result += `64 bytes from ${ip.split(/[;|&]/)[0]}: icmp_seq=1 ttl=117 time=14.2 ms\n`;
      result += `64 bytes from ${ip.split(/[;|&]/)[0]}: icmp_seq=2 ttl=117 time=14.5 ms\n`;

      // Cek apakah ada command injection
      if (ip.includes(';') || ip.includes('|') || ip.includes('&')) {
        const injectedParts = ip.split(/[;|&]/);
        const injectedCmd = injectedParts[injectedParts.length - 1].trim();
        
        if (injectedCmd.includes('cat ') && injectedCmd.includes('flag')) {
          result += `\n$ ${injectedCmd}\nCTF{c0mm4nd_1nj3ct10n_1s_l3th4l}\n`;
        } else if (injectedCmd.includes('ls')) {
          result += `\n$ ${injectedCmd}\nindex.js\npackage.json\nflag.txt\n`;
        } else if (injectedCmd.includes('whoami')) {
          result += `\n$ ${injectedCmd}\nroot\n`;
        } else if (injectedCmd.length > 0) {
          result += `\n$ ${injectedCmd}\nbash: ${injectedCmd.split(' ')[0]}: command not found\n`;
        }
      }

      setOutput(result);
      setLoading(false);
    }, 1000); // Simulasi delay ping
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: '40px 24px', fontFamily: 'monospace', color: '#00ff00' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '8px', borderBottom: '1px solid #333', paddingBottom: '16px' }}>Network Utility: Ping</h1>
        <p style={{ color: '#888', marginBottom: '24px' }}>
          Gunakan layanan ini untuk mengecek konektivitas sebuah server.
        </p>

        <form onSubmit={handlePing} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
             <span style={{ position: 'absolute', left: 16, top: 12, color: '#555' }}>ping -c 4</span>
             <input 
               type="text" 
               value={ip}
               onChange={(e) => setIp(e.target.value)}
               placeholder="8.8.8.8"
               style={{ width: '100%', padding: '12px 12px 12px 100px', background: '#111', border: '1px solid #333', color: '#0f0', outline: 'none' }}
             />
          </div>
          <button 
            type="submit"
            style={{ padding: '0 24px', background: '#004400', border: '1px solid #0f0', color: '#0f0', cursor: 'pointer', fontWeight: 'bold' }}
            disabled={loading}
          >
            {loading ? 'Pinging...' : 'Execute'}
          </button>
        </form>

        <div style={{ background: '#0a0a0a', border: '1px solid #222', minHeight: '300px', padding: '20px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {output ? output : '> Awaiting command...'}
        </div>
      </div>
    </div>
  );
}
