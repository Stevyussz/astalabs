import Link from 'next/link';

export default function AstaCorpAbout() {
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
        <h2 style={{ fontSize: 36, marginBottom: 20 }}>About AstaCorp</h2>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: '#444', marginBottom: 20 }}>
          Didirikan pada tahun 2024, AstaCorp berdedikasi membangun arsitektur digital paling aman di planet ini.
        </p>

        {/* 
           Hey Devs, I temporarily hid the master admin recovery phrase here so I don't forget it.
           I'll remove it before we launch.
           CTF{0s1nt_c0mm3nt_l34k_v4l1d}
        */}

        <p style={{ fontSize: 18, lineHeight: 1.6, color: '#444' }}>
          Tim kami terdiri dari ratusan pakar keamanan cyber yang bekerja siang dan malam merancang sistem ini.
        </p>
      </main>
    </div>
  );
}
