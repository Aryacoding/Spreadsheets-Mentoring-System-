import React, { useState } from 'react';
import logoIconnet from '../assets/logo-iconnet.png';

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFormLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        onLoginSuccess(data.user); // Lemparkan data {id, username} ke App.jsx
      } else {
        setError(data.message || 'Username atau password salah.');
      }
    } catch (err) {
      setError('Tidak dapat terhubung ke server backend. Pastikan server Laragon/Node.js aktif.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', width: '100%', maxWidth: '380px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
        
        <div style={{ marginBottom: '20px' }}>
          <img src={logoIconnet} alt="Logo ICONNET" style={{ height: '45px', objectFit: 'contain' }} />
        </div>

        <h3 style={{ color: '#1f2937', margin: '0 0 6px 0', fontSize: '20px', fontWeight: '700' }}>Migo Portal BAP</h3>
        <p style={{ color: '#6b7280', fontSize: '13px', margin: '0 0 24px 0' }}>Silakan masuk menggunakan akun administrator Anda.</p>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px', fontWeight: '600', textAlign: 'left', border: '1px solid #fca5a5' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleFormLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#4b5563', display: 'block', marginBottom: '6px' }}>Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', boxSizing: 'border-box' }}
              placeholder="Masukkan username"
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#4b5563', display: 'block', marginBottom: '6px' }}>Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', boxSizing: 'border-box' }}
              placeholder="Masukkan password"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            style={{ width: '100%', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '11px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginTop: '10px', transition: 'background 0.2s' }}
          >
            {isLoading ? 'Memverifikasi...' : 'Masuk ke Aplikasi'}
          </button>
        </form>

        <div style={{ marginTop: '30px', fontSize: '11px', color: '#9ca3af', borderTop: '1px solid #f3f4f6', paddingTop: '15px' }}>
          Migo Portal Database Auth &bull; 2026
        </div>
      </div>
    </div>
  );
}