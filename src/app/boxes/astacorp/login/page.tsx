import { cookies } from 'next/headers';
import Link from 'next/link';
import AstaCorpLoginForm from './AstaCorpLoginForm';

export default async function AstaCorpLogin() {
  const cookieStore = await cookies();
  const role = cookieStore.get('role')?.value || 'guest';
  
  const isAdminProxy = role === 'admin' || role === 'administrator';

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', color: '#333', fontFamily: 'sans-serif' }}>
      <header style={{ background: '#1e293b', color: '#fff', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 'bold' }}>AstaCorp Intranet</h1>
        <nav style={{ display: 'flex', gap: 20, fontWeight: 'bold' }}>
          <Link href="/boxes/astacorp" style={{ textDecoration: 'none', color: '#fff' }}>Public Home</Link>
        </nav>
      </header>

      <main style={{ padding: '60px 20px', maxWidth: 800, margin: '0 auto' }}>
        {isAdminProxy && (
           <div style={{ padding: 24, background: '#16a34a', color: '#fff', borderRadius: 8, marginBottom: 32 }}>
             <h2 style={{ margin: '0 0 12px 0' }}>Welcome, Admin!</h2>
             <p>Akses tingkat tinggi diberikan berdasarkan deteksi cookie 'role'.</p>
             <div style={{ background: '#14532d', padding: 12, borderRadius: 6, fontWeight: 'bold', fontFamily: 'monospace' }}>
               CTF{`{c00k13_t4mp3r1ng_4dm1n_r0l3}`}
             </div>
           </div>
        )}

        <div style={{ background: '#fff', padding: 40, borderRadius: 12, boxShadow: '0 10px 25px rgba(0,0,0,0.1)', maxWidth: 450, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 32, fontSize: 24 }}>Employee Portal</h2>
          <AstaCorpLoginForm />
        </div>
      </main>
    </div>
  );
}
