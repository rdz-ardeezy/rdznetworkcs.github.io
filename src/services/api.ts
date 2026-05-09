// ============================================================
// API Service - Koneksi ke MySQL Server Eksternal
// ============================================================
// 
// Untuk menghubungkan website ini ke database MySQL di server lain,
// Anda perlu backend API (Node.js/Express, PHP, dll) di server tersebut.
//
// Contoh setup backend (Node.js + Express + MySQL):
// 
// 1. Di server Anda, install: npm install express mysql2 cors
// 2. Buat file server.js:
//
//    const express = require('express');
//    const mysql = require('mysql2/promise');
//    const cors = require('cors');
//    const app = express();
//    
//    app.use(cors({ origin: '*' }));
//    app.use(express.json());
//    
//    const pool = mysql.createPool({
//      host: 'localhost',
//      user: 'your_user',
//      password: 'your_password',
//      database: 'rdz_network',
//    });
//    
//    // GET semua projek
//    app.get('/api/projects', async (req, res) => {
//      const [rows] = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
//      res.json(rows);
//    });
//    
//    // POST projek baru
//    app.post('/api/projects', async (req, res) => {
//      const { title, description, image_url, category, demo_url, download_url } = req.body;
//      const [result] = await pool.query(
//        'INSERT INTO projects (title, description, image_url, category, demo_url, download_url) VALUES (?,?,?,?,?,?)',
//        [title, description, image_url, category, demo_url, download_url]
//      );
//      res.json({ id: result.insertId, ...req.body });
//    });
//    
//    // GET semua pesan kontak
//    app.get('/api/messages', async (req, res) => {
//      const [rows] = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
//      res.json(rows);
//    });
//    
//    // POST pesan kontak baru
//    app.post('/api/messages', async (req, res) => {
//      const { name, email, subject, message } = req.body;
//      const [result] = await pool.query(
//        'INSERT INTO messages (name, email, subject, message) VALUES (?,?,?,?)',
//        [name, email, subject, message]
//      );
//      res.json({ id: result.insertId, success: true });
//    });
//    
//    app.listen(3001, () => console.log('API running on port 3001'));
//
// 3. SQL untuk membuat tabel:
//
//    CREATE DATABASE rdz_network;
//    USE rdz_network;
//    
//    CREATE TABLE projects (
//      id INT AUTO_INCREMENT PRIMARY KEY,
//      title VARCHAR(255) NOT NULL,
//      description TEXT,
//      image_url VARCHAR(500),
//      category VARCHAR(100),
//      demo_url VARCHAR(500),
//      download_url VARCHAR(500),
//      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//    );
//    
//    CREATE TABLE messages (
//      id INT AUTO_INCREMENT PRIMARY KEY,
//      name VARCHAR(255) NOT NULL,
//      email VARCHAR(255) NOT NULL,
//      subject VARCHAR(255),
//      message TEXT NOT NULL,
//      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//    );
//
// ============================================================

// Ganti URL ini dengan URL API server Anda
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-server.com/api';

export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: string;
  demo_url?: string;
  download_url?: string;
  created_at?: string;
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

// Flag untuk mengecek apakah API tersedia
let apiAvailable: boolean | null = null;

async function checkApiAvailability(): Promise<boolean> {
  if (apiAvailable !== null) return apiAvailable;
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'GET',
      signal: AbortSignal.timeout(3000),
    });
    apiAvailable = response.ok;
  } catch {
    apiAvailable = false;
  }
  return apiAvailable;
}

// ---- Projects API ----

export async function fetchProjects(): Promise<Project[]> {
  const available = await checkApiAvailability();
  if (!available) return getLocalProjects();

  try {
    const res = await fetch(`${API_BASE_URL}/projects`);
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch {
    return getLocalProjects();
  }
}

export async function createProject(project: Omit<Project, 'id'>): Promise<Project | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    if (!res.ok) throw new Error('Failed to create');
    return await res.json();
  } catch {
    return null;
  }
}

// ---- Messages API ----

export async function sendMessage(message: ContactMessage): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
    return res.ok;
  } catch {
    // Fallback: simpan ke localStorage
    const messages = JSON.parse(localStorage.getItem('rdz_messages') || '[]');
    messages.push({ ...message, id: Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem('rdz_messages', JSON.stringify(messages));
    return true;
  }
}

// ---- Local Data Fallback ----
// Data lokal digunakan jika server API tidak tersedia

function getLocalProjects(): Project[] {
  return [
    {
      id: 1,
      title: 'RDZ CafeBill',
      description: 'Aplikasi pencatatan billing dengan berbagai fitur menarik. Memudahkan pengelolaan billing warnet/game center secara efisien dengan interface yang user-friendly.',
      image_url: 'https://images.pexels.com/photos/5480781/pexels-photo-5480781.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      category: 'Billing',
      demo_url: '#',
      download_url: '#',
    },
    {
      id: 2,
      title: 'RDZ GameMenu V3',
      description: 'RDZGameMenu versi ke-3. Menu Game yang menarik untuk menata rapi list game warnet anda dengan spek tinggi maupun rendah, sangat fleksible, dilengkapi fitur saveNload dari pihak ke3.',
      image_url: 'https://images.pexels.com/photos/2881228/pexels-photo-2881228.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      category: 'Game Menu',
      demo_url: '#',
      download_url: '#',
    },
    {
      id: 3,
      title: 'RDZ GameMenu V2',
      description: 'RDZGameMenu Versi ke-2. Menu Game yang menarik untuk menata rapi list game warnet anda dengan banyak fitur menarik dan tampilan modern.',
      image_url: 'https://images.pexels.com/photos/17489155/pexels-photo-17489155.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      category: 'Game Menu',
      demo_url: '#',
      download_url: '#',
    },
    {
      id: 4,
      title: 'RDZ GameMenu Lite',
      description: 'RDZGameMenu Versi Lite. Menu Game ringan untuk warnet dengan spesifikasi rendah, sangat ringan dan tidak memakan banyak RAM.',
      image_url: 'https://images.pexels.com/photos/5480781/pexels-photo-5480781.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      category: 'Game Menu',
      demo_url: '#',
      download_url: '#',
    },
    {
      id: 5,
      title: 'RDZ CashNote',
      description: 'Aplikasi pencatatan keuangan, penjualan, hutang, maupun stok barang untuk warnet anda. Juga dapat digunakan di toko-toko penjualan lainnya.',
      image_url: 'https://images.pexels.com/photos/2881228/pexels-photo-2881228.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      category: 'Keuangan',
      demo_url: '#',
      download_url: '#',
    },
    {
      id: 6,
      title: 'Network Solutions',
      description: 'Layanan pembangunan dan maintenance jaringan warnet, game center, hotspot/wifi, dan jaringan wifi hotspot public dengan performa terbaik.',
      image_url: 'https://images.pexels.com/photos/17489155/pexels-photo-17489155.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      category: 'Jaringan',
      demo_url: '#',
      download_url: '#',
    },
  ];
}

export { checkApiAvailability };
