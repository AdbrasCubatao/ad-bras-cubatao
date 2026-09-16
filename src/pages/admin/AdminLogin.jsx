import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Libs e Hooks
import { useAuth } from './lib/useAuth.js'

// Componentes
import BottomNav from './components/BottomNav.jsx'

// Páginas Públicas
import Home from './pages/Home.jsx'

// Páginas do Painel Admin
import AdminLogin from './pages/AdminLogin.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AdminStudies from './pages/AdminStudies.jsx'
import AdminAgenda from './pages/AdminAgenda.jsx'
import AdminAnnouncements from './pages/AdminAnnouncements.jsx'

// 1. Tela de Carregamento para Evitar Piscar em Branco
function LoadingFallback() {
  return (
    <div style={{
      display: 'grid',
      placeItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#FAF8F3',
      color: '#0B1F3A',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontWeight: '600', marginBottom: '8px' }}>Carregando AD Brás Cubatão...</p>
        <span style={{ fontSize: '12px', color: '#55606F' }}>Aguarde um momento</span>
      </div>
    </div>
  )
}

// 2. Proteção de Rota Rígida contra Dados Nulos
function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()

  if (loading) {
    return <LoadingFallback />
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

// 3. Fallback Visual para Rotas Desconhecidas (404)
function NotFoundPage() {
  return (
    <div style={{ padding: '40px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#0B1F3A' }}>Página não encontrada</h2>
      <p style={{ color: '#55606F', fontSize: '14px' }}>O endereço acessado não existe ou mudou de local.</p>
      <a 
        href="/" 
        style={{ 
          display: 'inline-block', 
          marginTop: '16px', 
          padding: '10px 20px', 
          backgroundColor: '#0B1F3A', 
          color: '#fff', 
          borderRadius: '6px',
          textDecoration: 'none'
        }}
      >
        Voltar para o Início
      </a>
    </div>
  )
}

export default function App() {
  return (
    <div className="app-container">
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Rotas Protegidas do Painel */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/estudos"
            element={
              <ProtectedRoute>
                <AdminStudies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/agenda"
            element={
              <ProtectedRoute>
                <AdminAgenda />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/avisos"
            element={
              <ProtectedRoute>
                <AdminAnnouncements />
              </ProtectedRoute>
            }
          />

          {/* Captura qualquer rota desconhecida e impede a tela branca */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      {/* Navegação Inferior PWA */}
      <BottomNav />
    </div>
  )
}
