import React, { useState, useEffect } from 'react'
import supabase from '../lib/supabaseClient.js'

export default function Agenda() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true })

      if (error) throw error
      setEvents(data || [])
    } catch (err) {
      console.error('Erro ao buscar eventos:', err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#1a237e', textAlign: 'center', marginBottom: '25px' }}>📅 Agenda de Eventos & Cultos</h2>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Carregando agenda...</p>
      ) : events.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>Nenhum evento agendado no momento.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {events.map((item) => {
            const dateObj = new Date(item.event_date + 'T00:00:00')
            const day = dateObj.getDate().toString().padStart(2, '0')
            const month = dateObj.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase()

            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  background: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  border: '1px solid #eaeaea'
                }}
              >
                {/* Bloco da Data */}
                <div
                  style={{
                    background: '#1a237e',
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '15px 20px',
                    minWidth: '80px',
                    textAlign: 'center'
                  }}
                >
                  <span style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1' }}>{day}</span>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '4px' }}>{month}</span>
                </div>

                {/* Detalhes do Evento */}
                <div style={{ padding: '15px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span
                      style={{
                        background: '#e8eaf6',
                        color: '#1a237e',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}
                    >
                      {item.category}
                    </span>
                    <span style={{ fontSize: '13px', color: '#555', fontWeight: 'bold' }}>⏰ {item.event_time}</span>
                  </div>

                  <h3 style={{ margin: '4px 0 6px 0', fontSize: '18px', color: '#222' }}>{item.title}</h3>

                  <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#666' }}>📍 {item.location}</p>

                  {item.description && (
                    <p style={{ margin: '0', fontSize: '13px', color: '#444', lineHeight: '1.4' }}>{item.description}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
