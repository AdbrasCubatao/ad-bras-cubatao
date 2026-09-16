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

// Loading padronizado
function LoadingFallback() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', backgroundColor: '#FAF8F3', color: '#0B1F3A', fontFamily: 'sans-serif' }}>
      <p style={{ fontWeight: '600' }}>Carregando AD Brás Cubatão...</p>
    </div>
  )
}

// Validação de Acesso Administrativo
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

          {/* Redirecionamento seguro */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      {/* Navegação Inferior PWA */}
      <BottomNav />
    </div>
  )
}
