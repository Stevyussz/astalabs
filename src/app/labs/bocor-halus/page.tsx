'use client';

import { useState, useEffect } from 'react';

// Halaman ini sengaja dibuat sebagai client component untuk melakukan fetch 
// via browser sehingga JSON aslinya bisa ditangkap via Developer Tools (Network Tab).
export default function BocorHalusLab() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/labs/employees');
      if (!res.ok) throw new Error('Network error');
      const json = await res.json();
      if (json.success !== false) {
        setEmployees(json.data);
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', background: '#080b10', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Direktori Karyawan AstaLabs</h1>
          <button 
            onClick={fetchEmployees}
            disabled={loading}
            style={{ padding: '8px 16px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: loading ? 'wait' : 'pointer', fontWeight: 'bold' }}
          >
            {loading ? 'Memuat Data...' : 'Sinkronisasi Ulang'}
          </button>
        </div>

        {employees.length === 0 && !loading && !error && (
          <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <p style={{ opacity: 0.6 }}>Tidak ada data yang ditampilkan. Klik Sinkronisasi Ulang untuk mengambil data dari server.</p>
          </div>
        )}

        {error && (
          <div style={{ padding: '20px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', borderRadius: '8px', border: '1px solid #ef4444' }}>
            Gagal mengambil data dari server.
          </div>
        )}

        {employees.length > 0 && (
          <div style={{ display: 'grid', gap: '16px' }}>
             {/* FRONTEND HANYA MENAMPILKAN NAMA, POSISI, DAN EMAIL */}
             {/* Namun secara diam-diam the API is returning more than needed */}
            {employees.map(emp => (
              <div key={emp.id} style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#00ff88', marginBottom: '4px' }}>{emp.name}</h3>
                  <p style={{ fontSize: '14px', opacity: 0.7 }}>{emp.position}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '14px', fontFamily: 'monospace', opacity: 0.8 }}>{emp.email}</p>
                  <p style={{ fontSize: '12px', opacity: 0.5, marginTop: '4px' }}>Bergabung: {emp.joinedAt}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
