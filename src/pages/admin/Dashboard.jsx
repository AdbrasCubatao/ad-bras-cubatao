import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: "'Segoe UI', Roboto, sans-serif" }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>
          Painel de Controle Administrativo
        </h1>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Link
          to="/admin/estudos"
          style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', backgroundColor: '#f1f5f9', borderRadius: '12px', textDecoration: 'none', color: '#1e293b', fontWeight: 'bold', fontSize: '15px' }}
        >
          📚 Gerenciar Estudos & EBD
        </Link>

        <Link
          to="/admin/agenda"
          style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', backgroundColor: '#f1f5f9', borderRadius: '12px', textDecoration: 'none', color: '#1e293b', fontWeight: 'bold', fontSize: '15px' }}
        >
          📅 Gerenciar Agenda
        </Link>

        <Link
          to="/admin/avisos"
          style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', backgroundColor: '#f1f5f9', borderRadius: '12px', textDecoration: 'none', color: '#1e293b', fontWeight: 'bold', fontSize: '15px' }}
        >
          📢 Gerenciar Avisos
        </Link>
      </div>
    </div>
  )
}
