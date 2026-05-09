import { useState } from 'react';
import { Database, Server, Globe, Key, Settings, X, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react';

interface DatabasePanelProps {
  isOpen: boolean;
  onClose: () => void;
  apiConnected: boolean;
}

export default function DatabasePanel({ isOpen, onClose, apiConnected }: DatabasePanelProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const sqlSchema = `CREATE DATABASE rdz_network;
USE rdz_network;

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  category VARCHAR(100),
  demo_url VARCHAR(500),
  download_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

  const serverCode = `const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_user',
  password: 'your_password',
  database: 'rdz_network',
});

app.get('/api/projects', async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM projects ORDER BY created_at DESC'
  );
  res.json(rows);
});

app.post('/api/projects', async (req, res) => {
  const { title, description, image_url, category, demo_url, download_url } = req.body;
  const [result] = await pool.query(
    'INSERT INTO projects (title, description, image_url, category, demo_url, download_url) VALUES (?,?,?,?,?,?)',
    [title, description, image_url, category, demo_url, download_url]
  );
  res.json({ id: result.insertId, ...req.body });
});

app.post('/api/messages', async (req, res) => {
  const { name, email, subject, message } = req.body;
  const [result] = await pool.query(
    'INSERT INTO messages (name, email, subject, message) VALUES (?,?,?,?)',
    [name, email, subject, message]
  );
  res.json({ id: result.insertId, success: true });
});

app.listen(3001, () => console.log('API running on port 3001'));`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-dark-2 rounded-2xl border border-slate-700/50 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-dark-2 border-b border-slate-700/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Database className="w-5 h-5 text-primary-light" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">Setup Database MySQL</h3>
              <p className="text-xs text-slate-400">Panduan koneksi ke server MySQL eksternal</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status */}
          <div className={`flex items-center gap-3 p-4 rounded-xl ${apiConnected ? 'bg-neon-green/10 border border-neon-green/20' : 'bg-amber-500/10 border border-amber-500/20'}`}>
            {apiConnected ? <CheckCircle className="w-5 h-5 text-neon-green" /> : <AlertCircle className="w-5 h-5 text-amber-400" />}
            <div>
              <p className={`font-medium ${apiConnected ? 'text-neon-green' : 'text-amber-400'}`}>
                {apiConnected ? 'Database Terhubung' : 'Mode Offline - Database Tidak Terhubung'}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {apiConnected ? 'Semua data diambil dari MySQL server.' : 'Menggunakan data lokal. Ikuti panduan di bawah untuk menghubungkan ke MySQL.'}
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <Settings className="w-4 h-4 text-primary-light" />
              Langkah Setup
            </h4>

            {/* Step 1 */}
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">1</div>
                <div>
                  <h5 className="text-white font-medium">Buat Database MySQL</h5>
                  <p className="text-xs text-slate-400">Jalankan SQL berikut di MySQL server Anda</p>
                </div>
              </div>
              <div className="relative">
                <pre className="bg-dark rounded-lg p-4 text-xs text-slate-300 overflow-x-auto font-mono leading-relaxed">{sqlSchema}</pre>
                <button
                  onClick={() => copyToClipboard(sqlSchema, 'sql')}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-surface hover:bg-primary/20 text-slate-400 hover:text-white transition-colors"
                >
                  {copied === 'sql' ? <Check className="w-4 h-4 text-neon-green" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">2</div>
                <div>
                  <h5 className="text-white font-medium">Setup Backend API (Node.js)</h5>
                  <p className="text-xs text-slate-400">Install: <code className="text-primary-light">npm install express mysql2 cors</code></p>
                </div>
              </div>
              <div className="relative">
                <pre className="bg-dark rounded-lg p-4 text-xs text-slate-300 overflow-x-auto font-mono leading-relaxed">{serverCode}</pre>
                <button
                  onClick={() => copyToClipboard(serverCode, 'server')}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-surface hover:bg-primary/20 text-slate-400 hover:text-white transition-colors"
                >
                  {copied === 'server' ? <Check className="w-4 h-4 text-neon-green" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">3</div>
                <div>
                  <h5 className="text-white font-medium">Konfigurasi URL API</h5>
                  <p className="text-xs text-slate-400">Set environment variable atau ubah langsung di kode</p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-3 p-3 bg-dark rounded-lg">
                  <Globe className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-white">Environment Variable:</p>
                    <code className="text-xs text-primary-light">VITE_API_URL=https://your-server.com/api</code>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-dark rounded-lg">
                  <Key className="w-5 h-5 text-neon-purple mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-white">Atau edit file:</p>
                    <code className="text-xs text-slate-400">src/services/api.ts → API_BASE_URL</code>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-dark rounded-lg">
                  <Server className="w-5 h-5 text-neon-green mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-white">Jalankan server:</p>
                    <code className="text-xs text-primary-light">node server.js</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-sm text-primary-light leading-relaxed">
              <strong>💡 Catatan:</strong> Website ini bekerja secara offline (tanpa database) maupun online (dengan database MySQL). 
              Saat tidak terhubung, data projek ditampilkan dari data lokal dan pesan kontak disimpan di localStorage browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
