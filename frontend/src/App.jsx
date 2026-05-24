import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import MigoBapPage from './pages/MigoBapPage';
import PegawaiList from './pages/PegawaiList'; 
import PegawaiForm from './pages/PegawaiForm'; 
import PerangkatPage from './pages/PerangkatPage'; 
import LoginPage from './pages/LoginPage';
import { FiFileText, FiUsers, FiMonitor, FiLogOut } from 'react-icons/fi';
import logoIconnet from './assets/logo-iconnet.png';
import MigoMonitoringPage from './pages/MigoMonitoringPage';


// KOMPONEN PEMBUNGKUS (WRAPPER) UNTUK KELOLA PEGAWAI
function KelolaPegawaiWrapper() {
  const [currentPage, setCurrentPage] = useState('list'); 
  const [selectedNip, setSelectedNip] = useState(null);

  const handleNavigate = (page, nip = null) => {
    setCurrentPage(page);
    setSelectedNip(nip);
  };

  return (
    <div style={{ padding: '20px' }}>
      {currentPage === 'list' && <PegawaiList onNavigate={handleNavigate} />}
      {currentPage === 'form' && <PegawaiForm nip={selectedNip} onNavigate={handleNavigate} />}
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
        
        {/* NAVBAR UTAMA */}
        <nav style={{ 
          backgroundColor: '#ffffff',
          padding: '12px 24px', 
          display: 'flex', 
          gap: '16px', 
          alignItems: 'center', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          borderBottom: '1px solid #e5e7eb',
          position: 'sticky',
          top: 0,
          zIndex: 1000 // Memastikan navbar selalu berada di atas konten lain
        }}>
          
          {/* LOGO */}
          <div style={{ marginRight: 'auto', display: 'flex', alignItems: 'center' }}>
            <img 
              src={logoIconnet} 
              alt="Logo ICONNET" 
              style={{ 
                height: '38px', 
                objectFit: 'contain' 
              }} 
            />
          </div>
          
          {/* TAUTAN NAVIGASI DENGAN IKON */}
          <Link 
            to="/" 
            style={navLinkStyle}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6'; e.currentTarget.style.color = '#2563eb'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#4b5563'; }}
          >
            <FiFileText size={18} style={{ marginRight: '6px' }} />
            Generator BAP
          </Link>
          
          <Link 
            to="/monitoring" 
            style={navLinkStyle}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6'; e.currentTarget.style.color = '#2563eb'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#4b5563'; }}
          >
            <FiUsers size={18} style={{ marginRight: '6px' }} />
            Monitoring
          </Link>
{/* 
          <Link 
            to="/perangkat" 
            style={navLinkStyle}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6'; e.currentTarget.style.color = '#2563eb'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#4b5563'; }}
          >
            <FiMonitor size={18} style={{ marginRight: '6px' }} />
            Kelola Perangkat
          </Link> */}

          {/* TOMBOL LOGOUT DENGAN IKON */}
          <button 
            onClick={handleLogout} 
            style={{ 
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              border: '1px solid #fca5a5', 
              padding: '8px 16px', 
              borderRadius: '6px', 
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.2s ease',
              marginLeft: '8px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#fecaca';
              e.currentTarget.style.borderColor = '#f87171';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#fee2e2';
              e.currentTarget.style.borderColor = '#fca5a5';
            }}
          >
            <FiLogOut size={16} style={{ marginRight: '6px' }} />
            Logout
          </button>
        </nav>

        {/* AREA KONTEN ROUTER */}
        {/* Tidak perlu margin-top khusus jika menggunakan position: sticky */}
        <div style={{ flex: 1, backgroundColor: '#f9fafb' }}>
          <Routes>
            <Route path="/" element={<MigoBapPage />} />
            <Route path="/monitoring" element={<MigoMonitoringPage />} />
            {/* <Route path="/perangkat" element={<PerangkatPage />} /> */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        
      </div>
    </Router>
  );
}

// STYLE UNTUK LINK (Disesuaikan untuk background navbar putih)
const navLinkStyle = {
  color: '#4b5563',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '600',
  padding: '8px 14px',
  borderRadius: '6px',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'transparent'
};