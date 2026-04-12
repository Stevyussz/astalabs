import { cookies } from 'next/headers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookies Are Delicious',
};

// Base64 encode/decode
// guest -> Z3Vlc3Q=
// admin -> YWRtaW4=

export default async function BiskuitAdminLab() {
  const cookieStore = await cookies();
  let roleCookie = cookieStore.get('role')?.value;

  // Set default cookie if it doesn't exist (We have to do this client side or via middleware in App router, 
  // but we can generate a script that sets it if not present, because setting cookies during render is tricky).
  const needsDefaultCookie = !roleCookie;
  
  let role = 'guest';
  let isBase64 = false;

  try {
    if (roleCookie) {
      const decoded = atob(roleCookie);
      // Basic check if it's alphanumeric to prevent random errors causing issues, though try-catch handles it
      if (decoded === 'admin' || decoded === 'guest') {
        role = decoded;
        isBase64 = true;
      }
    }
  } catch (e) {
    // Not valid base64
  }

  return (
    <div style={{ backgroundColor: '#1e293b', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: '#f8fafc' }}>
      {needsDefaultCookie && (
        <script dangerouslySetInnerHTML={{
          __html: `document.cookie = "role=Z3Vlc3Q=; path=/"; window.location.reload();`
        }} />
      )}
      
      <div style={{ maxWidth: 600, width: '100%', padding: '40px', background: '#0f172a', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🍪</div>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>Dashboard Biskuit</h1>
        
        {role === 'admin' ? (
          <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid #22c55e', padding: '24px', borderRadius: '8px' }}>
            <h2 style={{ color: '#22c55e', fontSize: '20px', marginBottom: '12px' }}>Akses Diberikan! Selamat datang Admin.</h2>
            <p style={{ opacity: 0.8, marginBottom: '20px' }}>Kamu berhasil memanipulasi akses. Ini rahasia perusahaan:</p>
            <div style={{ background: '#000', padding: '16px', borderRadius: '6px', fontFamily: 'monospace', color: '#00ff88', fontSize: '18px', letterSpacing: '2px' }}>
              CTF{`{3nc0d3d_c00k13_m4n1pul4t10n_succ3ss}`}
            </div>
          </div>
        ) : (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', padding: '24px', borderRadius: '8px' }}>
            <h2 style={{ color: '#ef4444', fontSize: '20px', marginBottom: '12px' }}>Akses Ditolak</h2>
            <p style={{ opacity: 0.8 }}>Kamu saat ini berstatus <strong>Guest</strong>. Hanya <strong>Admin</strong> yang boleh melihat resep rahasia biskuit ini.</p>
            <p style={{ fontSize: '12px', marginTop: '16px', opacity: 0.5 }}>Hint: Apa kamu sudah cek jajan di browsermu?</p>
          </div>
        )}
      </div>
    </div>
  );
}
