import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import MigoBapPage from './pages/MigoBapPage';
import MigoMonitoringPage from './pages/MigoMonitoringPage';

import { FiFileText, FiUsers } from 'react-icons/fi';
import logoIconnet from './assets/logo-iconnet.png';

export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
        
        {/* NAVBAR UTAMA */}
        <nav style={{ backgroundColor: '#ffffff', padding: '12px 24px', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 1000 }}>
          <div style={{ marginRight: 'auto', display: 'flex', alignItems: 'center' }}>
            <img src={logoIconnet} alt="Logo ICONNET" style={{ height: '38px', objectFit: 'contain' }} />
          </div>
          
          <Link to="/" style={navLinkStyle}>
            <FiFileText size={17} style={{ marginRight: '5px' }} /> Generator BAP
          </Link>
          
          <Link to="/monitoring" style={navLinkStyle}>
            <FiUsers size={17} style={{ marginRight: '5px' }} /> Monitoring
          </Link>
        </nav>

        {/* ROUTER CONTENT CONTAINER */}
        <div style={{ flex: 1, backgroundColor: '#f9fafb' }}>
          <Routes>
            <Route path="/" element={<MigoBapPage />} />
            <Route path="/monitoring" element={<MigoMonitoringPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        
      </div>
    </Router>
  );
}

const navLinkStyle = { 
  color: '#4b5563', 
  textDecoration: 'none', 
  fontSize: '14px', 
  fontWeight: '600', 
  padding: '8px 12px', 
  display: 'flex', 
  alignItems: 'center' 
};