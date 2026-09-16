import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/useAuth.js'

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()
  const location = useLocation()

  // 1. Estado de Carregamento da Sessão
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        color: '#64748b',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          border: '3px solid #cbd5e1',
          borderTopColor: '#2563eb',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          marginBottom: '12px'
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>Verificando acesso...</p>
      </div>
    )
  }

  // 2. Redirecionamento com Preservação da Rota de Origem
  if (!session) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  // 3. Acesso Permitido
  return children
}
