import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'; // <--- TAMBAHKAN INI

import pegawaiRoutes from './routes/pegawaiRoutes.js';
import perangkatRoutes from './routes/perangkatRoutes.js'; 
import bapRoutes from './routes/bapRoutes.js'; 

dotenv.config();
const app = express();

app.use(cors()); 
app.use(express.json()); 

// --- TAMBAHKAN RUTE LOGIN INI ---
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // Mengambil user & pass dari .env (atau nilai default jika di lokal belum di-set)
  const validUser = process.env.ADMIN_USER || 'admin';
  const validPass = process.env.ADMIN_PASS || 'rahasia123';

  if (username === validUser && password === validPass) {
    // Buat token (opsional untuk keamanan tambahan nanti)
    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ success: true, token, user: { username, role: 'Administrator' } });
  } else {
    res.status(401).json({ success: false, message: 'Username atau password salah!' });
  }
});
// --------------------------------

// ROUTER INDEPENDEN LAINNYA
app.use('/api/pegawai', pegawaiRoutes);
app.use('/api/perangkat', perangkatRoutes); 
app.use('/api/bap', bapRoutes);

// ... (sisanya biarkan sama seperti sebelumnya) ...