import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient.js'

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

  const handleDownload = async (id, currentCount, fileUrl) => {
    if (!fileUrl) {
      alert('Arquivo indisponível para download.')
      return
    }

    // 1. Abre a aba imediatamente para evitar o bloqueio de pop-ups do navegador
    const newWindow = window.open(fileUrl, '_blank')

    const newCount = (currentCount || 0) + 1

    // 2. Atualiza o estado local imediatamente (Optimistic UI)
    setStudies((prevStudies) =>
      prevStudies.map((s) => (s.id === id ? { ...s, downloads_count: newCount } : s))
    )

    // 3. Atualiza o contador no Supabase em segundo plano
    try {
      const { error } = await supabase
        .from('studies')
        .update({ downloads_count: newCount })
        .eq('id', id)

      if (error) throw error
    } catch (err) {
      console.error('Erro ao registrar download no banco:', err)
    }
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#111827' }}>
        Estudos Bíblicos & EBD
      </h1>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#6b7280' }}>Carregando materiais...</p>
      ) : studies.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6b7280' }}>Nenhum estudo disponível no momento.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {studies.map((item) => (
            <div 
              key={item.id} 
              style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}
            >
              {item.cover_url ? (
                <img src={item.cover_url} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '180px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '14px' }}>
                  Sem Imagem
                </div>
              )}

              <div style={{ padding: '15px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {item.category && (
                    <span style={{ fontSize: '12px', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                      {item.category}
                    </span>
                  )}
                  <h3 style={{ margin: '10px 0 8px 0', fontSize: '18px', color: '#1f2937' }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '15px', lineHeight: '1.4' }}>{item.description}</p>
                </div>

                <div style={{ marginTop: 'auto', borderTop: '1px solid #f3f4f6', paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>
                    📥 <strong>{item.downloads_count || 0}</strong> baixados
                  </span>
                  <button
                    onClick={() => handleDownload(item.id, item.downloads_count, item.file_url)}
                    style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
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
