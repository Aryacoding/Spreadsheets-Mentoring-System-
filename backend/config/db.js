import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Biarkan pool ini kosong atau jangan jalankan tes koneksi otomatis apa pun
const pool = {}; 

export default pool;