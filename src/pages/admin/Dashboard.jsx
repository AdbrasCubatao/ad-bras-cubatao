import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabaseClient, { supabase as supabaseNamed } from '../../lib/supabaseClient.js'

const supabase = supabaseClient || supabaseNamed

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState('')
  const [stats, setStats] = useState({ studies: 0, events: 0, notices: 0 })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true)

        // 1. Obtém dados do usuário logado
        const { data: { user } } = await supabase.auth.getUser()
        if (user) setUserEmail(user.email)

        // 2. Busca contagem rápida das tabelas
        const [studiesRes, eventsRes, noticesRes] = await Promise.all([
          supabase.from('studies').select('id', { count: 'exact', head: true }),
          supabase.from('events').select('id', { count: 'exact', head: true }),
          supabase.from('notices').select('id', { count: 'exact', head: true })
        ])

        setStats({
          studies: studiesRes.count || 0,
          events: eventsRes.count || 0,
          notices: noticesRes.count || 0
        })
      } catch (err) {
        console.error('Erro ao carregar dados do dashboard:', err)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px', fontFamily: "'Segoe UI', Roboto, sans-serif" }}>
      {/* Cabeçalho */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
            Painel de Controle Administrativo
          </h1>
          {userEmail && (
            <span style={{ fontSize: '14px', color: '#64748b' }}>
              Conectado como: <strong>{userEmail}</strong>
            </span>
          )}
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ef4444',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          Sair
        </button>
      </header>

      {/* Cards Resumo das Métricas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
          <span style={{ fontSize: '28px', fontWeight: '800', color: '#1d4ed8' }}>{loading ? '...' : stats.studies}</span>
          <p style={{ margin: '4px 0 0 0', color: '#1e40af', fontWeight: '600', fontSize: '14px' }}>Estudos Cadastrados</p>
        </div>

        <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
          <span style={{ fontSize: '28px', fontWeight: '800', color: '#15803d' }}>{loading ? '...' : stats.events}</span>
          <p style={{ margin: '4px 0 0 0', color: '#166534', fontWeight: '600', fontSize: '14px' }}>Eventos na Agenda</p>
        </div>

        <div style={{ backgroundColor: '#fffbebf', border: '1px solid #fef08a', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
          <span style={{ fontSize: '28px', fontWeight: '800', color: '#b45309' }}>{loading ? '...' : stats.notices}</span>
          <p style={{ margin: '4px 0 0 0', color: '#92400e', fontWeight: '600', fontSize: '14px' }}>Avisos Ativos</p>
        </div>
      </div>

      {/* Módulos de Gerenciamento */}
      <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#334155', marginBottom: '16px' }}>Módulos do Sistema</h2>

      <div style={{ display: 'grid', gap: '12px' }}>
        <Link
          to="/admin/estudos"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', textDecoration: 'none', color: '#1e293b', fontWeight: 'bold', fontSize: '15px' }}
        >
          <span>📚 Gerenciar Estudos & EBD</span>
          <span style={{ color: '#2563eb' }}>Acessar →</span>
        </Link>

        <Link
          to="/admin/agenda"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', textDecoration: 'none', color: '#1e293b', fontWeight: 'bold', fontSize: '15px' }}
        >
          <span>📅 Gerenciar Agenda</span>
          <span style={{ color: '#2563eb' }}>Acessar →</span>
        </Link>

        <Link
          to="/admin/avisos"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', textDecoration: 'none', color: '#1e293b', fontWeight: 'bold', fontSize: '15px' }}
        >
          <span>📢 Gerenciar Avisos</span>
          <span style={{ color: '#2563eb' }}>Acessar →</span>
        </Link>
      </div>
    </div>
  )
}
