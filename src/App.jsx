import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Home from './pages/Home'
import Prayer from './pages/Prayer'
import Admin from './pages/Admin'

export default function App() {
  return (
    <Router>
      <nav style={{ padding: '12px 20px', backgroundColor: '#1e3a8a', color: '#fff', display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Início</Link>
        <Link to="/oracao" style={{ color: '#fff', textDecoration: 'none' }}>Pedidos de Oração</Link>
        <Link to="/admin" style={{ color: '#fff', textDecoration: 'none', marginLeft: 'auto' }}>Painel Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oracao" element={<Prayer />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  )
}
