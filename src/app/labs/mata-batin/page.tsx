import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Portal | Top Secret',
};

export default function MataBatinLab() {
  return (
    <div style={{ backgroundColor: '#080b10', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', color: '#00ff88' }}>
      <div style={{ border: '1px solid #00ff88', padding: '40px', borderRadius: '4px', textAlign: 'center', maxWidth: '400px', width: '100%', background: 'rgba(0,255,136,0.05)', boxShadow: '0 0 20px rgba(0,255,136,0.1)' }}>
        <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold', borderBottom: '1px solid #00ff88', paddingBottom: '10px' }}>ASTA SECURE LOGIN</h1>
        <p style={{ marginBottom: '30px', opacity: 0.8 }}>Otorisasi dibutuhkan untuk mengakses command center.</p>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="Username" disabled style={{ padding: '10px', background: 'transparent', border: '1px solid rgba(0,255,136,0.5)', color: '#fff' }} />
          <input type="password" placeholder="Password" disabled style={{ padding: '10px', background: 'transparent', border: '1px solid rgba(0,255,136,0.5)', color: '#fff' }} />
          <button type="button" disabled style={{ padding: '10px', background: 'rgba(0,255,136,0.2)', border: '1px solid #00ff88', color: '#00ff88', cursor: 'not-allowed', marginTop: '10px' }}>
            Sistem Terkunci
          </button>
        </form>
      </div>

      <div style={{ marginTop: '40px', opacity: 0.3, fontSize: '12px' }}>
        v1.0.0-beta - Pengembangan oleh Tim Engineer AstaLabs
      </div>

      {/* 
        DEV NOTE (14/04/2026): 
        Sistem login sementara dikunci karena ada bypass vulnerability di endpoint API.
        Password admin sementara saya simpan di sini biar gampang kalau butuh akses darurat:
        CTF{m4t4_b4t1n_mu_t4j3m_b4ng3t}

        Tolong hapus komen ini sebelum push ke production ya guys!
      */}
    </div>
  );
}
