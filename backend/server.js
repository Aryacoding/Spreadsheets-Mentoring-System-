import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pegawaiRoutes from './routes/pegawaiRoutes.js';
import perangkatRoutes from './routes/perangkatRoutes.js'; 
import db from './config/db.js';
import bapRoutes from './routes/bapRoutes.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

// 1. ENDPOINT LOGIN DATABASE (Menggunakan query ke tabel users)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const sql = 'SELECT id, username FROM users WHERE username = ? AND password = ?';
    const [results] = await db.query(sql, [username, password]);
    
    if (results.length > 0) {
      // Mengembalikan id dan username agar bisa digunakan untuk ganti password nanti
      return res.status(200).json({ 
        success: true,
        message: 'Login berhasil!', 
        user: { id: results[0].id, username: results[0].username } 
      });
    } else {
      return res.status(401).json({ success: false, message: 'Username atau password salah!' });
    }
  } catch (err) {
    console.error("Database error saat login:", err);
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server database.' });
  }
});

// 2. ENDPOINT UBAH USERNAME DAN PASSWORD
app.post('/api/update-profile', async (req, res) => {
  const { userId, newUsername, newPassword } = req.body;
  try {
    const sql = 'UPDATE users SET username = ?, password = ? WHERE id = ?';
    const [result] = await db.query(sql, [newUsername, newPassword, userId]);
    
    if (result.affectedRows > 0) {
      return res.status(200).json({ success: true, message: 'Profil berhasil diperbarui!' });
    } else {
      return res.status(400).json({ success: false, message: 'Gagal memperbarui profil. User tidak ditemukan.' });
    }
  } catch (err) {
    console.error("Database error saat update profile:", err);
    return res.status(500).json({ success: false, message: 'Gagal memperbarui database.' });
  }
});

// ROUTER INDEPENDEN SEBELUMNYA
app.use('/api/pegawai', pegawaiRoutes);
app.use('/api/perangkat', perangkatRoutes); 
app.use('/api/bap', bapRoutes);

app.get('/', (req, res) => {
  res.send('Server Backend Migo BAP berjalan dengan baik 🚀');
});

app.listen(PORT, () => {
  console.log(`\n===========================================`);
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`===========================================\n`);
});