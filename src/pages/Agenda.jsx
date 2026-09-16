import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient.js'

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

  // Função utilitária para formatar dia e mês sem sofrer alteração de fuso horário
  const formatEventDate = (dateString) => {
    if (!dateString) return { day: '--', month: '---' }
    
    // Suporta "YYYY-MM-DD" cortando os valores brutos da string
    const [year, month, day] = dateString.split('T')[0].split('-')
    
    if (!year || !month || !day) return { day: '--', month: '---' }

    // Cria objeto local seguro
    const dateObj = new Date(Number(year), Number(month) - 1, Number(day))
    const monthName = dateObj.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '').toUpperCase()

    return {
      day: day.padStart(2, '0'),
      month: monthName
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
            const { day, month } = formatEventDate(item.event_date)

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

                <div style={{ padding: '15px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    {item.category && (
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
                    )}
                    {item.event_time && (
                      <span style={{ fontSize: '13px', color: '#555', fontWeight: 'bold' }}>⏰ {item.event_time}</span>
                    )}
                  </div>

                  <h3 style={{ margin: '4px 0 6px 0', fontSize: '18px', color: '#222' }}>{item.title}</h3>
                  {item.location && (
                    <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#666' }}>📍 {item.location}</p>
                  )}

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
