import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Painel de Controle Administrativo</h1>
      <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
        <Link to="/admin/estudos" style={{ padding: '15px', background: '#f0f0f0', borderRadius: '6px', textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
          📚 Gerenciar Estudos & EBD
        </Link>
        <Link to="/admin/agenda" style={{ padding: '15px', background: '#f0f0f0', borderRadius: '6px', textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
          📅 Gerenciar Agenda
        </Link>
      </div>
    </div>
  )
}
