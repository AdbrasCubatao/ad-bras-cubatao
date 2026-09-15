import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  async function fetchAnnouncements() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) throw error
      setAnnouncements(data || [])
    } catch (err) {
      console.error('Erro ao carregar avisos:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: "'Segoe UI', Roboto, sans-serif", color: '#1e293b' }}>
      
      {/* Cabeçalho */}
      <header style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#e0e7ff', padding: '6px 16px', borderRadius: '20px', color: '#3730a3', fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
          📢 Mural Informativo
        </div>
        <h1 style={{ color: '#0f172a', fontSize: '28px', margin: '0 0 8px 0', fontWeight: '800' }}>
          Avisos e Comunicados
        </h1>
        <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>
          Fique por dentro de tudo o que acontece na AD Brás Cubatão
        </p>
      </header>

      {/* Feed de Avisos */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
          Carregando avisos...
        </div>
      ) : announcements.length === 0 ? (
        <div style={{ textAlign: 'center', backgroundColor: '#f8fafc', padding: '40px 20px', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
          <p style={{ color: '#64748b', margin: 0 }}>Nenhum aviso publicado no momento.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {announcements.map((item) => (
            <article
              key={item.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: item.is_pinned ? '2px solid #2563eb' : '1px solid #e2e8f0',
                position: 'relative',
                transition: 'transform 0.2s ease',
              }}
            >
              {/* Badge de Destaque / Fixado */}
              {item.is_pinned && (
                <div style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: '#2563eb', color: '#ffffff', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', zIndex: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  📌 Destaque
                </div>
              )}

              {/* Imagem do Aviso */}
              {item.image_url && (
                <div style={{ width: '100%', maxHeight: '320px', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
                  <img
                    src={item.image_url}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              <div style={{ padding: '20px' }}>
                {/* Data e Localização */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>
                  {item.event_date && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600', color: '#1d4ed8' }}>
                      📅 {new Date(item.event_date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </span>
                  )}
                  {item.location && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      📍 {item.location}
                    </span>
                  )}
                </div>

                {/* Título e Descrição */}
                <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: '0 0 10px 0', lineHeight: '1.3' }}>
                  {item.title}
                </h2>
                <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6', whiteSpace: 'pre-line', margin: '0 0 16px 0' }}>
                  {item.description}
                </p>

                {/* Botão de Ação / Link Extra */}
                {item.link_url && (
                  <a
                    href={item.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#1e3a8a',
                      color: '#ffffff',
                      padding: '10px 18px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      marginTop: '8px'
                    }}
                  >
                    🔗 {item.link_label || 'Mais Informações'}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
      }
