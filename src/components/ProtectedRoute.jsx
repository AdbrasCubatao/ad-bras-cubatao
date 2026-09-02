import { Navigate } from 'react-router-dom'
import { useAuth } from '../lib/useAuth.js'

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()

  if (loading) {
    return <div className="page"><p className="empty-state">Verificando acesso...</p></div>
  }
  if (!session) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}
