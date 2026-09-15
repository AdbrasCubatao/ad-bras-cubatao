import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Páginas ativas
import Home from './pages/Home.jsx'
import Prayer from './pages/Prayer.jsx'
import Announcements from './pages/Announcements.jsx'
import AdminAnnouncements from './pages/admin/AdminAnnouncements.jsx'

export default function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <nav style={{ backgroundColor: '#1e3a8a', padding: '12px 20px', display: 'flex', gap: '16px' }}>
          <Link to="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>Início</Link>
          <Link to="/pedidos-oracao" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Oração</Link>
          <Link to="/avisos" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Avisos</Link>
          <Link to="/admin/avisos" style={{ color: '#93c5fd', textDecoration: 'none', marginLeft: 'auto' }}>Painel Admin</Link>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pedidos-oracao" element={<Prayer />} />
            <Route path="/avisos" element={<Announcements />} />
            <Route path="/admin/avisos" element={<AdminAnnouncements />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
