import React, { useState, useEffect } from 'react'
import SimplePage from './SimplePage.jsx'
import { supabase } from '../services/supabase'

export default function Study() {
  const [estudos, setEstudos] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    async function fetchEstudos() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('estudos')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Erro ao buscar estudos no Supabase:', error)
          setErrorMessage(error.message)
        } else if (data) {
          setEstudos(data)
        }
      } catch (err) {
        console.error('Erro inesperado:', err)
        setErrorMessage('Ocorreu um erro ao conectar ao banco de dados.')
      } finally {
        setLoading(false)
      }
    }

    fetchEstudos()
  }, [])

  const handleDownload = async (id, link) => {
    try {
      await supabase.rpc('increment_downloads', { row_id: id })
    } catch (e) {
      console.log('RPC de increment_downloads não configurado ou erro:', e)
    }

    setEstudos(prev =>
      prev.map(item =>
        item.id === id ? { ...item, downloads: (item.downloads || 0) + 1 } : item
      )
    )

    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <SimplePage title="Estudos & EBD" subtitle="Acesse lições, apostilas e materiais de apoio">
      {loading ? (
        <div style={{ textAlign: 'center', padding: '30px 16px', color: '#64748b' }}>
          <p style={{ fontSize: '15px' }}>⏳ Carregando materiais de estudo...</p>
        </div>
      ) : errorMessage ? (
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', color: '#991b1b' }}>
          <p style={{ fontWeight: 'bold', margin: '0 0 6px 0' }}>Erro ao carregar os estudos</p>
          <small>{errorMessage}</small>
        </div>
      ) : estudos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '30px 16px', color: '#64748b' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>📚</div>
          <p style={{ fontWeight: 'bold', color: '#334155', margin: '0 0 4px 0' }}>Nenhum estudo cadastrado ainda</p>
          <p style={{ fontSize: '13px', margin: 0 }}>Os novos materiais cadastrados pelo painel aparecerão aqui.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px', padding: '8px 0' }}>
          {estudos.map(item => (
            <div
              key={item.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}
            >
              {item.capa && (
                <img
                  src={item.capa}
                  alt={item.titulo}
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                />
              )}

              <div style={{ padding: '16px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: '#0284c7',
                    backgroundColor: '#e0f2fe',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    textTransform: 'uppercase'
                  }}
                >
                  {item.categoria || 'Geral'}
                </span>

                <h3
                  style={{
                    fontSize: '17px',
                    fontWeight: 'bold',
                    color: '#0f172a',
                    margin: '10px 0 8px 0',
                    lineHeight: '1.3'
                  }}
                >
                  {item.titulo}
                </h3>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: '#64748b',
                    marginBottom: '16px'
                  }}
                >
                  <span>📥 {item.downloads || 0} downloads</span>
                </div>

                <button
                  onClick={() => handleDownload(item.id, item.link)}
                  style={{
                    width: '100%',
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  🔗 Acessar Material / PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </SimplePage>
  )
      }
