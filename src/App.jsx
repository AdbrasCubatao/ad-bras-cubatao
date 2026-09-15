import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Importações diretas e seguras
import Home from './pages/Home.jsx'
import Prayer from './pages/Prayer.jsx'

export default function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <nav style={{ backgroundColor: '#1e3a8a', padding: '15px 20px', display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>Início</Link>
          <Link to="/pedidos-oracao" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Pedidos de Oração</Link>
        </nav>

        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pedidos-oracao" element={<Prayer />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
