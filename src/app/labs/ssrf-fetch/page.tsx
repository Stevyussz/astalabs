'use client';
import { useState } from 'react';

export default function SSRFLab() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    
    try {
      const res = await fetch(`/api/labs/fetcher?url=${encodeURIComponent(url)}`);
      const data = await res.text();
      setResponse(data);
    } catch (err: any) {
      setResponse(`Error fetching data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#1e1b4b', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ background: '#312e81', padding: '32px', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', maxWidth: 600, width: '100%', border: '1px solid #4338ca' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>
          Asta Image Proxy v1.2
        </h1>
        <p style={{ color: '#a5b4fc', marginBottom: '24px', fontSize: '14px', lineHeight: '1.5' }}>
          Gunakan proxy server internal kami untuk mem-fetch resource dari internet jika IP kamu diblokir oleh target.
        </p>

        <form onSubmit={handleFetch} style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #4f46e5', background: '#1e1b4b', color: '#c7d2fe', outline: 'none' }}
          />
          <button 
            type="submit"
            disabled={loading}
            style={{ padding: '0 24px', background: '#4f46e5', color: '#fff', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
          >
            {loading ? 'Fetching...' : 'Fetch'}
          </button>
        </form>

        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ background: '#1e293b', padding: '8px 16px', fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>
            RESPONSE BOX
          </div>
          <div style={{ padding: '16px', minHeight: '200px', maxHeight: '400px', overflowY: 'auto', color: '#38bdf8', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '14px' }}>
            {response || 'No data fetched yet.'}
          </div>
        </div>
      </div>
    </div>
  );
}
