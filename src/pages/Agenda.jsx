import React, { useState, useEffect } from 'react'
import SimplePage from './SimplePage.jsx'
import { supabase } from '../lib/supabaseClient.js'

export default function Agenda() {
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('todos')

  useEffect(() => {
    fetchEventos()
  }, [])

  async function fetchEventos() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      setEventos(data || [])
    } catch (err) {
      console.error('Erro ao carregar eventos:', err)
    } finally {
      setLoading(false)
    }
  }

  const eventosFiltrados = filtro === 'todos' 
    ? eventos 
    : eventos.filter(ev => ev.category === filtro)

  return (
    <SimplePage title="Agenda" subtitle="Nossos cultos e programação geral">
      {/* Filtros em Botões */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        overflowX: 'auto', 
        paddingBottom: '12px',
        marginBottom: '16px',
        scrollbarWidth: 'none'
      }}>
        {[
          { key: 'todos', label: 'Todos' },
          { key: 'culto', label: '⛪ Cultos' },
          { key: 'ensino', label: '📖 EBD & Doutrina' },
          { key: 'jovens', label: '🔥 Jovens' },
          { key: 'oracao', label: '🙏 Oração' },
        ].map(item => (
          <button
            key={item.key}
            onClick={() => setFiltro(item.key)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: filtro === item.key ? '#0a192f' : '#f0f4f8',
              color: filtro === item.key ? '#ffffff' : '#4a5568',
              fontSize: '13px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              cursor: 'pointer'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#666', padding: '20px 0' }}>Carregando agenda...</p>
      ) : eventosFiltrados.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', padding: '20px 0' }}>Nenhum evento encontrado nesta categoria.</p>
      ) : (
        <div style={{ display: 'grid', gap: '14px' }}>
          {eventosFiltrados.map(ev => (
            <div
              key={ev.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: '1px solid #edf2f7',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  backgroundColor: '#ebf8ff',
                  color: '#2b6cb0',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  padding: '4px 10px',
                  borderRadius: '8px'
                }}>
                  📅 {ev.day || 'Semanal'}
                </span>
                <span style={{
                  backgroundColor: '#feebc8',
                  color: '#c05621',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  padding: '4px 10px',
                  borderRadius: '8px'
                }}>
                  ⏰ {ev.time}
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1a202c', margin: '4px 0 2px 0' }}>
                {ev.title}
              </h3>

              {ev.description && (
                <p style={{ fontSize: '13px', color: '#718096', margin: 0, lineHeight: '1.4' }}>
                  {ev.description}
                </p>
              )}

              <div style={{ 
                marginTop: '6px', 
                paddingTop: '8px', 
                borderTop: '1px dashed #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: '#4a5568',
                fontWeight: '500'
              }}>
                📍 <span>{ev.location || 'Templo Sede'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </SimplePage>
  )
}
