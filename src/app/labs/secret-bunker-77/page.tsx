import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secret Bunker 77 | DO NOT SHARE',
};

export default function BunkerLab() {
  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', color: '#ff003c' }}>
      
      <div style={{ border: '2px solid #ff003c', padding: '60px', textAlign: 'center', background: 'radial-gradient(circle, rgba(255,0,60,0.1) 0%, rgba(0,0,0,1) 100%)' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px', letterSpacing: '5px' }}>BUNKER COMMAND CENTER</h1>
        <p style={{ fontSize: '18px', color: '#fff', opacity: 0.8, marginBottom: '40px' }}>
          Jaringan ini terekspos tanpa otentikasi. Kenapa kamu bisa sampai ke sini?
        </p>
        
        <div style={{ padding: '20px', background: '#fff', color: '#000', fontWeight: 'bold', fontSize: '24px', letterSpacing: '2px', display: 'inline-block' }}>
          CTF{`{r0b0ts_txt_1s_n0t_4_s3cr3t}`}
        </div>
        
        <p style={{ marginTop: '40px', fontSize: '14px', color: '#ff003c', opacity: 0.5 }}>
          WARNING: Akses ilegal ke bunker ini terekam di sistem radar AstaLabs.
        </p>
      </div>

    </div>
  );
}
