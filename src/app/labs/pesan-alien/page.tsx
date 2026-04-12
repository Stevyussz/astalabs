import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Intercepted Transmission',
};

export default function PesanAlienLab() {
  const ciphertext = 'Q1RGe2I0czY0XzNuYzBkaW5nXzFzX3QwMF9lYXN5X2JyMH0=';

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace', color: '#00ff88', backgroundImage: 'radial-gradient(circle at center, #1e1b4b 0%, #020617 100%)' }}>
      <div style={{ maxWidth: 700, width: '100%', padding: '40px', border: '1px solid #1e293b', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '16px', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '20px', animation: 'pulse 2s infinite' }}>📡</div>
        <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px', letterSpacing: '2px' }}>INTERCEPTED TRANSMISSION</h1>
        <p style={{ color: 'rgba(226, 232, 240, 0.6)', fontSize: '14px', marginBottom: '32px', lineHeight: '1.6' }}>
          Signal terdeteksi berasal dari orbit luar. Enkripsi nampak seperti pola karakter standar yang sering digunakan operatif di bumi untuk membungkus data binari ke dalam teks.
        </p>
        
        <div style={{ background: '#000', padding: '24px', borderRadius: '12px', border: '1px solid rgba(0, 255, 136, 0.2)', marginBottom: '32px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #00ff88, transparent)', animation: 'scan 3s linear infinite' }} />
          <code style={{ fontSize: '16px', wordBreak: 'break-all', color: '#00ff88', filter: 'drop-shadow(0 0 5px rgba(0, 255, 136, 0.5))' }}>
            {ciphertext}
          </code>
        </div>
        
        <div style={{ fontSize: '12px', color: 'rgba(226, 232, 240, 0.4)', textAlign: 'left', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
          <p>LOGS:</p>
          <p style={{ marginTop: '8px' }}>[SYSTEM] Analisis pola: Karakter A-Z, a-z, 0-9, +, / terdeteksi.</p>
          <p>[SYSTEM] Karakter padding '=' ditemukan di akhir transmisi.</p>
          <p>[SYSTEM] Rekomendasi: Gunakan algoritma Base64 untuk memecahkan sandi.</p>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(120px); opacity: 0; }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
