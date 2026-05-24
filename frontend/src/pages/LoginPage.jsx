import React, { useState, useEffect } from 'react';
import kantorBg from '../assets/kantor.jpg';
import logoIconnet from '../assets/logo-iconnet.png'; 
import {
  FiEye,
  FiEyeOff,
  FiUser,
  FiLock
} from 'react-icons/fi';

export default function LoginPage({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      input::placeholder {
        color: rgba(17,24,39,0.4);
      }

      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px rgba(255,255,255,0.22) inset !important;
        -webkit-text-fill-color: #111827 !important;
        border-radius: 16px;
        transition: background-color 9999s ease-in-out 0s;
      }

      .input-box:focus-within {
        border: 1px solid #3b82f6;
        box-shadow: 0 0 0 4px rgba(59,130,246,0.16);
        background: rgba(255,255,255,0.55);
      }

      .input-box:focus-within svg {
        color: #2563eb !important;
        opacity: 1 !important;
      }

      img:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 6px;
        border-radius: 12px;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;

    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', data.user);
        onLoginSuccess();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Gagal terhubung ke server. Pastikan backend menyala.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        backgroundImage: `url(${kantorBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'auto',
      }}
    >
      {/* OVERLAY */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(rgba(15,23,42,0.65), rgba(15,23,42,0.65))',
        }}
      />

      {/* CARD */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.65)',
          borderRadius: '24px',
          padding: '32px 28px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.7)',
          overflow: 'hidden',
        }}
      >
        {/* TOP DECOR */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'rgba(59,130,246,0.18)',
            filter: 'blur(10px)',
          }}
        />

        {/* LOGO */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <img
              src={logoIconnet} 
              alt="ICONNET"
              title="ICONNET Login"
              tabIndex={0}
              aria-label="Logo ICONNET"
              style={{
                width: '180px',
                height: '100px',
                objectFit: 'contain',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* ERROR MESSAGE BOX */}
        {error && (
          <div style={{ 
            backgroundColor: 'rgba(254, 226, 226, 0.85)', 
            color: '#991b1b', 
            padding: '12px', 
            borderRadius: '16px', 
            marginBottom: '18px', 
            fontSize: '13px', 
            textAlign: 'center',
            fontWeight: '600',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}>
            {error}
          </div>
        )}

        {/* FORM CONTAINER */}
        <form
          onSubmit={handleLogin}
          style={{
            background: 'rgba(255,255,255,0.25)',
            border: '1px solid rgba(255,255,255,0.35)',
            borderRadius: '22px',
            padding: '22px',
          }}
        >
          {/* USERNAME */}
          <div style={{ marginBottom: '18px' }}>
            <label style={labelStyle}>Username</label>
            <div className="input-box" style={inputContainerStyle}>
              <FiUser style={iconStyle} />
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Masukkan username"
                required
                style={inputStyle}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Password</label>
            <div className="input-box" style={inputContainerStyle}>
              <FiLock style={iconStyle} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                required
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={eyeButtonStyle}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            style={{
              ...buttonStyle,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.8 : 1
            }}
            disabled={loading}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <div style={spinnerStyle}></div>
                Memproses...
              </div>
            ) : (
              'Masuk Sistem'
            )}
          </button>
        </form>

        {/* FOOTER */}
        <p
          style={{
            textAlign: 'center',
            marginTop: '22px',
            marginBottom: 0,
            color: 'rgba(255,255,255,0.55)',
            fontSize: '12px',
            lineHeight: '1.6',
          }}
        >
          © 2026 ICONPLUS — Sistem Manajemen Berita Acara
        </p>
      </div>
    </div>
  );
}

// === STYLES CONSTANTS ===
const labelStyle = {
  display: 'block',
  marginBottom: '10px',
  color: '#111827',
  fontSize: '13px',
  fontWeight: '600',
  letterSpacing: '0.3px',
};

const inputContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  background: 'rgba(255,255,255,0.22)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: '16px',
  padding: '0 14px',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.25s ease',
  boxShadow: 'none',
};

const iconStyle = {
  fontSize: '16px',
  marginRight: '10px',
  color: '#111827',
  opacity: 0.7,
};

const inputStyle = {
  width: '100%',
  padding: '15px 0',
  border: 'none',
  background: 'transparent',
  color: '#111827',
  fontSize: '14px',
  outline: 'none',
  fontFamily: 'inherit',
  caretColor: '#111827',
};

const buttonStyle = {
  width: '100%',
  padding: '15px',
  border: 'none',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
  color: 'white',
  fontWeight: '700',
  fontSize: '14px',
  transition: 'all .25s ease',
  boxShadow: '0 10px 25px rgba(37,99,235,0.35)',
};

const eyeButtonStyle = {
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  fontSize: '18px',
  color: '#111827',
  padding: 0,
  marginLeft: '10px',
};

const spinnerStyle = {
  width: '16px',
  height: '16px',
  border: '2px solid rgba(255,255,255,0.4)',
  borderTop: '2px solid white',
  borderRadius: '50%',
  animation: 'spin 0.8s linear infinite',
};