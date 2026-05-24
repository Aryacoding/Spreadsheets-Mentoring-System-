import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pegawaiRoutes from './routes/pegawaiRoutes.js';
import perangkatRoutes from './routes/perangkatRoutes.js'; // 1. IMPORT ROUTER PERANGKAT BARU
import db from './config/db.js';
import bapRoutes from './routes/bapRoutes.js'; // Import di bagian atas

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

// Endpoint Login Admin
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    const [results] = await db.query(sql, [username, password]);
    if (results.length > 0) {
      return res.status(200).json({ message: 'Login berhasil!', user: results[0].username });
    } else {
      return res.status(401).json({ message: 'Username atau password salah!' });
    }
  } catch (err) {
    console.error("Database error saat login:", err);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server database.' });
  }
});

// 2. DAFTARKAN ROUTER INDEPENDEN MASING-MASING
app.use('/api/pegawai', pegawaiRoutes);
app.use('/api/perangkat', perangkatRoutes); // <-- Mengarahkan semua /api/perangkat ke CRUD lengkap
// Taruh di bawah app.use('/api/pegawai', pegawaiRoutes);
app.use('/api/bap', bapRoutes);

app.get('/', (req, res) => {
  res.send('Server Backend Migo BAP berjalan dengan baik 🚀');
});

app.listen(PORT, () => {
  console.log(`\n===========================================`);
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`===========================================\n`);
});