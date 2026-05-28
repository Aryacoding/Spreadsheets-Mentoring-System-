import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pegawaiRoutes from './routes/pegawaiRoutes.js';
import perangkatRoutes from './routes/perangkatRoutes.js'; 
import bapRoutes from './routes/bapRoutes.js'; 
// import db dari config/db.js telah dihapus

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json()); 

// ROUTER INDEPENDEN
app.use('/api/pegawai', pegawaiRoutes);
app.use('/api/perangkat', perangkatRoutes); 
app.use('/api/bap', bapRoutes);

app.get('/', (req, res) => {
  res.send('Server Backend Migo BAP berjalan dengan baik di Vercel 🚀');
});

// app.listen tetap dipertahankan HANYA untuk testing lokal di terminal kamu.
// Di Vercel, blok ini akan diabaikan karena kita mengekspor app di bawahnya.
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`\n===========================================`);
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    console.log(`===========================================\n`);
  });
}

// WAJIB UNTUK VERCEL: Mengekspor instance Express
export default app;