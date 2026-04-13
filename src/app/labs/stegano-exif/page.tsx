import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery 0x1',
};

export default function SteganoLab() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 600, textAlign: 'center', padding: '40px' }}>
        <h1 style={{ color: '#000', marginBottom: 16 }}>Arsip Rahasia</h1>
        <p style={{ color: '#666', marginBottom: 32 }}>
          Gambar ini menyimpan seribu makna. Apakah kamu bisa membacanya?
        </p>

        {/* This SVG visually shows a padlock, but in the raw text it contains the flag */}
        <div style={{ background: '#f5f5f5', padding: '40px', borderRadius: '16px', border: '1px solid #ddd' }}>
          <img 
            src="/api/labs/stegano-image" 
            alt="Secret Vault" 
            style={{ width: '200px', height: '200px' }} 
          />
        </div>
        
        <p style={{ marginTop: 24, fontSize: 12, color: '#999' }}>Hint: Right click &gt; Open Image in New Tab &gt; View Page Source.</p>
      </div>
    </div>
  );
}
