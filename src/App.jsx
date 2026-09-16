import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Importações dos componentes principais
import Home from './pages/Home.jsx'
import Prayer from './pages/Prayer.jsx'

// Classe de proteção contra Tela Branca (Error Boundary)
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Erro capturado pelo ErrorBoundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '30px', fontFamily: 'sans-serif', textAlign: 'center' }}>
          <h2 style={{ color: '#dc2626' }}>Ocorreu um erro ao carregar esta página.</h2>
          <p style={{ color: '#4b5563' }}>{this.state.error && this.state.error.toString()}</p>
          <button 
            onClick={() => window.location.href = '/'} 
            style={{ padding: '10px 20px', backgroundColor: '#1e3a8a', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Voltar para o Início
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </Router>
  )
}
