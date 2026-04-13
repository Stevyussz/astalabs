'use client';
import { useState } from 'react';

export default function CaesarCipherLab() {
  const [shift, setShift] = useState(13);
  
  // CTF{c43s4r_c1ph3r_1s_t00_01d} -> shifted by 13
  // Wait, let's keep it simple. Target is: PGI{p43f4e_p1cu3e_1f_g00_01q}
  const originalFlag = "CTF{c43s4r_c1ph3r_1s_t00_01d}";
  const targetCiphertext = "PGI{p43f4e_p1cu3e_1f_g00_01q}"; 

  // Function to shift letters, but keep numbers and symbols intact
  const rot = (text: string, amount: number) => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const base = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - base + amount) % 26 + 26) % 26 + base);
    });
  };

  const [input, setInput] = useState(targetCiphertext);

  return (
    <div style={{ backgroundColor: '#111827', minHeight: '100vh', padding: '40px 24px', fontFamily: 'monospace', color: '#10b981' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', background: '#1f2937', padding: '32px', borderRadius: '12px', border: '1px solid #374151' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '16px', color: '#fff' }}>Caesar Cipher Decoder</h1>
        <p style={{ color: '#9ca3af', marginBottom: '24px' }}>
          Kami mencegat pesan teks: <strong style={{ color: '#ef4444' }}>{targetCiphertext}</strong>.
          <br/>
          Coba putar rotonya sampai kamu menemukan pola yang masuk akal (CTF{`{...}`}).
        </p>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#d1d5db' }}>Input Text</label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: '100%', height: '80px', padding: '12px', background: '#111827', border: '1px solid #374151', color: '#10b981', borderRadius: '6px' }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#d1d5db' }}>
            <span>Shift (Pergeseran)</span>
            <span style={{ fontWeight: 'bold', color: '#fff' }}>ROT-{shift}</span>
          </label>
          <input 
            type="range" 
            min="0" max="25" 
            value={shift} 
            onChange={(e) => setShift(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#10b981' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#d1d5db' }}>Hasil Output</label>
          <div style={{ padding: '16px', background: '#000', border: '1px solid #374151', borderRadius: '6px', minHeight: '80px', wordBreak: 'break-all', fontSize: '18px' }}>
            {rot(input, shift)}
          </div>
        </div>
      </div>
    </div>
  );
}
