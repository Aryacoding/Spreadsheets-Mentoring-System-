import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// 1. ENDPOINT LOGIN TANPA DATABASE (MEMBACA DARI .ENV)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  try {
    // Membaca teks string ALLOWED_USERS dari .env dan mengubahnya jadi Array objek JavaScript
    const allowedUsers = JSON.parse(process.env.ALLOWED_USERS || '[]');

    // Mencari apakah ada username dan password yang cocok di dalam daftar terverifikasi
    const verifiedUser = allowedUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (verifiedUser) {
      return res.status(200).json({
        success: true,
        message: 'Login Berhasil! Akun Terverifikasi.',
        user: { username: verifiedUser.username }
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Akun tidak terverifikasi atau password salah!'
      });
    }
  } catch (error) {
    console.error("Eror membaca konfigurasi akun di .env:", error);
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan konfigurasi pada server.' });
  }
});

// 2. ENDPOINT UPDATE PROFILE (Dialihkan karena tidak memakai database)
app.post('/api/update-profile', (req, res) => {
  return res.status(400).json({
    success: false,
    message: 'Fitur ubah sandi lewat web dinonaktifkan karena tidak menggunakan database. Silakan ubah langsung di Dashboard Hosting (.env).'
  });
});

app.get('/', (req, res) => {
  res.send('Server Migo BAP (No-Database Mode) Aktif 🚀');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

export default app;