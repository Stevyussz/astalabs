'use client';
import { useState } from 'react';

export default function SQLiLab() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Simulasi Server Logic (Dalam kenyataannya ini terjadi di backend)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Developer bodoh ini membiarkan input masuk ke query string tanpa sanitasi
    const mockQuery = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
    
    // Kita simulasikan regex SQL Injection sederhana:
    // Jika input berakhir mengandung ' OR '1'='1 (atau semacamnya), maka login tembus.
    const sqlInjectionPattern = /'\\s*[oO][rR]\\s*['"]?1['"]?\\s*=\\s*['"]?1['"]?/;
    
    if (sqlInjectionPattern.test(username) || sqlInjectionPattern.test(password)) {
      setSuccess(true);
      setError('');
    } else {
      setSuccess(false);
      setError('Invalid username or password!');
    }
  };

  return (
    <div style={{ backgroundColor: '#f1f5f9', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', maxWidth: 400, width: '100%' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#0f172a', textAlign: 'center' }}>
          Bank Asta - Staff Portal
        </h1>
        
        {success ? (
          <div style={{ background: '#dcfce7', color: '#166534', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h2 style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: 12 }}>Welcome, ADMIN!</h2>
            <p style={{ marginBottom: 16 }}>Kamu berhasil membypass sistem login menggunakan identitas Admin.</p>
            <div style={{ background: '#166534', color: '#4ade80', padding: '12px', borderRadius: '6px', fontFamily: 'monospace', fontWeight: 'bold' }}>
              CTF{`{sq1_1nj3ct10n_byp4ss_succ3ss}`}
            </div>
          </div>
        ) : (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {error && (
              <div style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '12px', borderRadius: '6px', fontSize: '14px', border: '1px solid #fecaca' }}>
                {error}
              </div>
            )}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#475569', fontWeight: 500 }}>Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', color: '#0f172a' }}
                placeholder="Enter username"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#475569', fontWeight: 500 }}>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', color: '#0f172a' }}
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              style={{ width: '100%', padding: '12px', background: '#3b82f6', color: '#fff', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '8px' }}
            >
              Sign In
            </button>
          </form>
        )}
        
        <div style={{ marginTop: '24px', fontSize: '12px', color: '#94a3b8', textAlign: 'center', fontFamily: 'monospace' }}>
          Query logic: <br/> <code>SELECT * FROM users WHERE username='$username' AND password='$password'</code>
        </div>
      </div>
    </div>
  );
}
