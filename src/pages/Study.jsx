import React, { useState, useEffect } from 'react'
import SimplePage from './SimplePage.jsx'
import { supabase } from '../services/supabase'

export default function Study() {
  const [estudos, setEstudos] = useState([])

  useEffect(() => {
    const buscarEstudos = async () => {
      const { data, error } = await supabase
        .from('estudos')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) setEstudos(data)
    }
    buscarEstudos()
  }, [])

  const handleBaixar = async (id, link) => {
    await supabase.rpc('increment_downloads', { row_id: id })
    setEstudos(prev => prev.map(item => item.id === id ? { ...item, downloads: (item.downloads || 0) + 1 } : item))
    window.open(link, '_blank')
  }

  return (
    <SimplePage title="Estudos & EBD" subtitle="Baixe materiais, apostilas e lições da Escola Bíblica">
      <div style={{ display: 'grid', gap: '20px', padding: '8px 0' }}>
        {estudos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#718096', padding: '20px 0' }}>
            Nenhum estudo publicado no momento.
          </p>
        ) : (
          estudos.map(item => (
            <div key={item.id} style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '1px solid #edf2f7' }}>
              {item.capa && (
                <img src={item.capa} alt={item.titulo} style={{ width: '100%', height: '170px', objectFit: 'cover' }} />
              )}
              <div style={{ padding: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#d69e2e', backgroundColor: '#0a192f', padding: '4px 8px', borderRadius: '8px', display: 'inline-block', marginBottom: '8px' }}>
                  {item.categoria}
                </span>
                <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1a202c', margin: '0 0 8px 0' }}>{item.titulo}</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#718096', marginBottom: '16px' }}>
                  <span>📅 {new Date(item.created_at).toLocaleDateString('pt-BR')}</span>
                  <span style={{ backgroundColor: '#edf2f7', padding: '4px 8px', borderRadius: '8px', fontWeight: 'bold', color: '#2d3748' }}>
                    📥 {item.downloads || 0} downloads
                  </span>
                </div>
                <button
                  onClick={() => handleBaixar(item.id, item.link)}
                  style={{ width: '100%', backgroundColor: '#0a192f', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '12px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  📄 Baixar Material / Acessar Link
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </SimplePage>
  )
}
