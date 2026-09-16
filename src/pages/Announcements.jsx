import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  async function fetchAnnouncements() {
    try {
      setLoading(true)
      setErrorMsg(null)

      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) throw error
      setAnnouncements(data || [])
    } catch (err) {
      console.error('Erro ao carregar avisos:', err)
      setErrorMsg('Não foi possível carregar os avisos no momento.')
    } finally {
      setLoading(false)
    }
  }

  // Função utilitária para formatar datas sem problemas de fuso horário
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const cleanDate = dateString.split('T')[0]
    const [year, month, day] = cleanDate.split('-')
    if (!year || !month || !day) return dateString
    return `${day}/${month}/${year}`
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif', color: '#0f172a' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '8px' }}>
        📢 Avisos e Comunicados
      </h1>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>Fique por dentro das novidades e programação da nossa igreja.</p>

      {loading ? (
        <p style={{ color: '#64748b', textAlign: 'center' }}>Carregando avisos...</p>
      ) : errorMsg ? (
        <div style={{ padding: '16px', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '8px', border: '1px solid #fecaca' }}>
          {errorMsg}
        </div>
      ) : announcements.length === 0 ? (
        <p style={{ color: '#64748b', textAlign: 'center' }}>Nenhum aviso publicado no momento.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {announcements.map((item) => (
            <article
              key={item.id}
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                border: item.is_pinned ? '2px solid #2563eb' : '1px solid #e2e8f0',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                {item.is_pinned && (
                  <span style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                    📌 DESTAQUE
                  </span>
                )}
                {item.created_at && (
                  <span style={{ fontSize: '12px', color: '#94a3b8', marginLeft: 'auto' }}>
                    Publicado em {formatDate(item.created_at)}
                  </span>
                )}
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#1e293b' }}>
                {item.title}
              </h2>

              <p style={{ color: '#334155', lineHeight: '1.5', margin: '0 0 12px 0', whiteSpace: 'pre-line' }}>
                {item.description}
              </p>

              {(item.event_date || item.location) && (
                <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: item.image_url ? '12px' : '0' }}>
                  {item.event_date && <span>📅 Data: {formatDate(item.event_date)}</span>}
                  {item.location && <span>📍 Local: {item.location}</span>}
                </div>
              )}

              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                  style={{ width: '100%', maxHeight: '350px', objectFit: 'cover', borderRadius: '8px', marginTop: '12px' }}
                />
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
