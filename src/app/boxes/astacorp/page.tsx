import Link from 'next/link';

export default function AstaCorpBoxHome({ searchParams }: { searchParams: { q?: string } }) {
  // Flag 4: Cookie check
  // Note: We can't easily check cookies in a Server Component without 'cookies' from 'next/headers'
  
  // Flag 7: XSS Reflection
  const isXss = searchParams.q && (searchParams.q.includes('<script>') || searchParams.q.includes('onerror'));

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', color: '#000', fontFamily: 'sans-serif' }}>
      <header style={{ background: '#3b82f6', color: '#fff', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 'bold' }}>AstaCorp Technologies</h1>
        <nav style={{ display: 'flex', gap: 20, fontWeight: 'bold' }}>
          <Link href="/boxes/astacorp" style={{ textDecoration: 'none', color: '#fff' }}>Home</Link>
          <Link href="/boxes/astacorp/about" style={{ textDecoration: 'none', color: '#fff' }}>About Us</Link>
          <Link href="/boxes/astacorp/login" style={{ textDecoration: 'none', color: '#fff' }}>Staff Login</Link>
        </nav>
      </header>

      <main style={{ padding: '60px 40px', maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 36, marginBottom: 20 }}>Leading the Future of Secure Innovations.</h2>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: '#444', marginBottom: 40 }}>
          Kami membangun perangkat lunak kelas dunia (Enterprise-grade) yang mustahil untuk diretas. Sistem kami menggunakan arsitektur keamaan termutakhir.
        </p>

        {/* FLAG 7: XSS Vulnerable Search Box */}
        <div style={{ background: '#f5f5f5', padding: 24, borderRadius: 8, border: '1px solid #ddd' }}>
          <h3 style={{ marginTop: 0 }}>Cari Artikel</h3>
          <form style={{ display: 'flex', gap: 8 }}>
            <input 
              type="text" 
              name="q" 
              placeholder="Cari berita..." 
              style={{ padding: '10px 16px', flex: 1, border: '1px solid #ccc', borderRadius: 4 }}
              defaultValue={searchParams.q || ''}
            />
            <button type="submit" style={{ padding: '10px 24px', background: '#000', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Cari</button>
          </form>
          
          {searchParams.q && (
            <div style={{ marginTop: 20, padding: 16, background: '#fee2e2', color: '#991b1b', borderRadius: 4 }}>
              Hasil pencarian untuk: <br/> 
              {/* WARNING: Intentional Vulnerability Simulation */}
              <div dangerouslySetInnerHTML={{ __html: searchParams.q }} style={{ marginTop: 8, fontWeight: 'bold' }} />
              
              {isXss && (
                <div style={{ marginTop: 16, padding: 12, background: '#000', color: '#0f0', fontFamily: 'monospace', borderRadius: 4 }}>
                  [System Alert] Malicious Script Executed. <br/>
                  CTF{`{xss_r3fl3ct3d_b0x_p4yl04d}`}
                </div>
              )}
            </div>
          )}
        </div>
        
      </main>
      
      <footer style={{ background: '#f5f5f5', padding: '40px', textAlign: 'center', color: '#666', borderTop: '1px solid #ddd', marginTop: 100 }}>
        &copy; 2026 AstaCorp. All rights reserved. <br/>
        <span style={{ fontSize: 12 }}>Powered by Next.js & MongoDB</span>
      </footer>
    </div>
  );
}
