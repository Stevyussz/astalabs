'use client';
import { useState, useEffect } from 'react';

export default function AstaCorpLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Memberikan cookie 'role=guest' secara default agar Hacker tahu parameter cookie-nya
    document.cookie = "role=guest; path=/boxes/astacorp";
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate SQL Injection
    const sqlInjectionPattern = /'\\s*[oO][rR]\\s*['"]?1['"]?\\s*=\\s*['"]?1['"]?/;
    
    if (sqlInjectionPattern.test(username) || sqlInjectionPattern.test(password)) {
      setSuccess(true);
      setError('');
    } else {
      setSuccess(false);
      setError('Invalid employee credentials. Access Denied.');
    }
  };

  if (success) {
    return (
      <div style={{ background: '#ecfdf5', color: '#065f46', padding: '20px', borderRadius: '8px', textAlign: 'center', border: '1px solid #10b981' }}>
        <h3 style={{ margin: '0 0 12px 0' }}>SQL Injection Sukses!</h3>
        <p style={{ margin: '0 0 16px 0', fontSize: 14 }}>Autentikasi di-bypass menggunakan ekspresi Boolean.</p>
        <div style={{ background: '#065f46', color: '#34d399', padding: '12px', borderRadius: '6px', fontFamily: 'monospace', fontWeight: 'bold' }}>
          CTF{`{sq1_1nj3ct10n_b0x_m0d3}`}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {error && (
        <div style={{ color: '#b91c1c', backgroundColor: '#fef2f2', padding: '12px', borderRadius: '6px', fontSize: '14px', border: '1px solid #fca5a5' }}>
          {error}
        </div>
      )}
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#444' }}>Username</label>
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#444' }}>Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
        />
      </div>
      <button 
        type="submit"
        style={{ width: '100%', padding: '12px', background: '#3b82f6', color: '#fff', fontWeight: 'bold', borderRadius: '4px', border: 'none', cursor: 'pointer', marginTop: 12 }}
      >
        Sign In
      </button>
    </form>
  );
}
