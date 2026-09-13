import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export default function Study() {
  const [studies, setStudies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStudies()
  }, [])

  const fetchStudies = async () => {
    try {
      const { data, error } = await supabase
        .from('studies')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setStudies(data || [])
    } catch (err) {
      console.error('Erro ao buscar estudos:', err)
    } finally {
      setLoading(false)
    }
  }

  // Incrementa o contador de downloads
  const handleDownload = async (id, currentCount, fileUrl) => {
    try {
      const newCount = (currentCount || 0) + 1
      
      // Atualiza o banco
      await supabase
        .from('studies')
        .update({ downloads_count: newCount })
        .eq('id', id)

      // Atualiza a tela localmente
      setStudies(studies.map(s => s.id === id ? { ...s, downloads_count: newCount } : s))

      // Abre o arquivo em nova aba
      window.open(fileUrl, '_blank')
    } catch (err) {
      console.error('Erro ao registrar download:', err)
      window.open(fileUrl, '_blank')
    }
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Estudos Bíblicos & EBD</h1>

      {loading ? <p style={{ textAlign: 'center' }}>Carregando materiais...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {studies.map((item) => (
            <div key={item.id} style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {item.cover_url ? (
                <img src={item.cover_url} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '180px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                  Sem Imagem
                </div>
              )}

              <div style={{ padding: '15px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '12px', background: '#e1f0ff', color: '#0070f3', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                    {item.category}
                  </span>
                  <h3 style={{ margin: '10px 0 8px 0', fontSize: '18px' }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: '#555', marginBottom: '15px' }}>{item.description}</p>
                </div>

                <div style={{ marginTop: 'auto', borderTop: '1px solid #f0f0f0', paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#777' }}>
                    📥 <strong>{item.downloads_count || 0}</strong> baixados
                  </span>
                  <button
                    onClick={() => handleDownload(item.id, item.downloads_count, item.file_url)}
                    style={{ background: '#28a745', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                  >
                    Baixar Material
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
                  }
