import React, { useState, useEffect } from 'react';

export default function MigoMonitoringPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Ambil data otomatis saat halaman dibuka
  useEffect(() => {
    fetchStatsData();
  }, []);

  const fetchStatsData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/bap/monitoring-stats'); // Sesuaikan URL backend Anda
      const data = await response.json();
      
      if (data.success) {
        setStats(data);
      } else {
        setError('Gagal memproses data dari spreadsheet.');
      }
    } catch (err) {
      setError('Gagal terhubung ke server backend.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        <h3>🔄 Memuat Data Dashboard Monitoring...</h3>
        <p>Sistem sedang menghitung seluruh data langsung dari Google Sheet.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif', color: '#e74c3c' }}>
        <h3>❌ Terjadi Kesalahan</h3>
        <p>{error}</p>
        <button onClick={fetchStatsData} style={{ padding: '10px 15px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Coba Lagi</button>
      </div>
    );
  }

  // Helper untuk menghitung jumlah tipe unik (misal berapa variasi brand)
  const getUniqueCount = (obj) => Object.keys(obj || {}).length;

  return (
    <div style={{ padding: '30px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      
      {/* HEADER DASHBOARD */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '3px solid #34495e', paddingBottom: '15px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#2c3e50' }}>📊 Real-time Monitoring Dashboard</h2>
          <p style={{ margin: '5px 0 0 0', color: '#7f8c8d', fontSize: '14px' }}>Data agregat otomatis yang disinkronkan langsung dari Google Spreadsheet Utama.</p>
        </div>
        <button onClick={fetchStatsData} style={{ backgroundColor: '#2ecc71', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
          🔄 Segarkan Data
        </button>
      </div>

      {/* 4 KARTU UTAMA MONITORING (COUNTER) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '4px' }}>
        
        {/* CARD 1: TOTAL PIC */}
        <div style={cardStyle('#3498db')}>
          <div style={{ fontSize: '32px' }}>👥</div>
          <div>
            <div style={cardCountStyle}>{stats?.totalPIC || 0}</div>
            <div style={cardLabelStyle}>Total CALON PENGGUNA / PIC</div>
          </div>
        </div>

        {/* CARD 2: JUMLAH VARIASI BRAND */}
        <div style={cardStyle('#e67e22')}>
          <div style={{ fontSize: '32px' }}>💻</div>
          <div>
            <div style={cardCountStyle}>{getUniqueCount(stats?.brands)}</div>
            <div style={cardLabelStyle}>Variasi BRAND Perangkat</div>
          </div>
        </div>

        {/* CARD 3: PERSONAL AREA NAME */}
        <div style={cardStyle('#9b59b6')}>
          <div style={{ fontSize: '32px' }}>🏢</div>
          <div>
            <div style={cardCountStyle}>{getUniqueCount(stats?.personalAreas)}</div>
            <div style={cardLabelStyle}>PERSONAL AREA NAME</div>
          </div>
        </div>

        {/* CARD 4: PERSONAL SUB AREA */}
        <div style={cardStyle('#1abc9c')}>
          <div style={{ fontSize: '32px' }}>📍</div>
          <div>
            <div style={cardCountStyle}>{getUniqueCount(stats?.personalSubAreas)}</div>
            <div style={cardLabelStyle}>PERSONAL SUB AREA NAME</div>
          </div>
        </div>

      </div>

      <br/><hr/><br/>

      {/* TABEL RINCIAN SEBARAN DATA */}
      <h3 style={{ color: '#34495e', marginBottom: '15px' }}>📝 Rincian Distribusi & Sebaran Data</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
        
        {/* SUB-TABEL 1: SEBARAN BRAND */}
        <div style={tableContainerStyle}>
          <h4 style={tableTitleStyle}>💻 Distribusi Berdasarkan BRAND</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                <th style={thStyle}>Nama Brand / Merk</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Jumlah Unit</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stats?.brands || {}).map(([key, val]) => (
                <tr key={key} style={trStyle}>
                  <td style={tdStyle}><strong>{key}</strong></td>
                  <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 'bold', color: '#e67e22' }}>{val} Perangkat</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SUB-TABEL 2: SEBARAN PERSONAL AREA */}
        <div style={tableContainerStyle}>
          <h4 style={tableTitleStyle}>🏢 Distribusi PERSONAL AREA NAME</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                <th style={thStyle}>Personal Area</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Total Berkas</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stats?.personalAreas || {}).map(([key, val]) => (
                <tr key={key} style={trStyle}>
                  <td style={tdStyle}><strong>{key}</strong></td>
                  <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 'bold', color: '#9b59b6' }}>{val} Record</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      <div style={{ marginTop: '25px' }}>
        {/* SUB-TABEL 3: SEBARAN PERSONAL SUB AREA */}
        <div style={tableContainerStyle}>
          <h4 style={tableTitleStyle}>📍 Distribusi PERSONAL SUB AREA NAME</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                <th style={thStyle}>Nama Sub Area / UPT / Unit Layanan</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Jumlah PIC Terdaftar</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stats?.personalSubAreas || {}).map(([key, val]) => (
                <tr key={key} style={trStyle}>
                  <td style={tdStyle}>{key}</td>
                  <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 'bold', color: '#1abc9c' }}>{val} Orang</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

// STYLING COMPONENTS (INLINE CSS RAPID DEVELOPMENT)
const cardStyle = (borderColor) => ({
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  borderLeft: `6px solid ${borderColor}`,
  display: 'flex',
  alignItems: 'center',
  gap: '15px'
});

const cardCountStyle = {
  fontSize: '26px',
  fontWeight: 'bold',
  color: '#2c3e50',
  lineHeight: '1.2'
};

const cardLabelStyle = {
  fontSize: '11px',
  color: '#7f8c8d',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  marginTop: '3px'
};

const tableContainerStyle = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  border: '1px solid #e2e8f0'
};

const tableTitleStyle = {
  margin: '0 0 15px 0',
  color: '#2c3e50',
  borderBottom: '2px solid #edf2f7',
  paddingBottom: '8px'
};

const thStyle = {
  padding: '10px',
  fontSize: '13px',
  color: '#7f8c8d',
  borderBottom: '2px solid #ddd'
};

const tdStyle = {
  padding: '10px',
  fontSize: '14px',
  borderBottom: '1px solid #edf2f7',
  color: '#333'
};

const trStyle = {
  transition: 'background 0.2s'
};