import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient.js'

export default function AdminStudies() {
  const [studies, setStudies] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: 'EBD',
    cover_url: '',
    file_url: '',
    description: ''
  })

  const fetchStudies = async () => {
    const { data, error } = await supabase
      .from('studies')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) setStudies(data)
  }

  useEffect(() => {
    fetchStudies()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.file_url) return alert('Preencha os campos obrigatórios!')

    setLoading(true)
    const { error } = await supabase
      .from('studies')
      .insert([formData])

    setLoading(false)

    if (error) {
      alert('Erro ao cadastrar estudo: ' + error.message)
    } else {
      setFormData({ title: '', category: 'EBD', cover_url: '', file_url: '', description: '' })
      alert('Estudo cadastrado com sucesso!')
      fetchStudies()
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Deseja excluir este estudo?')) {
      const { error } = await supabase.from('studies').delete().eq('id', id)
      if (error) {
        alert('Erro ao excluir: ' + error.message)
      } else {
        fetchStudies()
      }
    }
  }

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#0f172a', marginBottom: '16px' }}>📖 Gerenciar Estudos & EBD</h2>

      {/* Formulário de Cadastro */}
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', display: 'grid', gap: '10px', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
        <input
          type="text"
          placeholder="Título do Estudo (Ex: Lição 1 - Fé)"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
          required
        />
        
        <select
          value={formData.category}
          onChange={e => setFormData({ ...formData, category: e.target.value })}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
        >
          <option value="EBD">EBD</option>
          <option value="Ensino">Ensino</option>
          <option value="Discipulado">Discipulado</option>
          <option value="Geral">Geral</option>
        </select>

        <input
          type="url"
          placeholder="URL da Foto de Capa (Link da imagem)"
          value={formData.cover_url}
          onChange={e => setFormData({ ...formData, cover_url: e.target.value })}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
        />

        <input
          type="url"
          placeholder="Link do PDF/Material (Google Drive, Supabase Storage, etc)"
          value={formData.file_url}
          onChange={e => setFormData({ ...formData, file_url: e.target.value })}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
          required
        />

        <textarea
          placeholder="Breve descrição ou resumo do conteúdo..."
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', height: '60px' }}
        />

        <button 
          type="submit" 
          disabled={loading}
          style={{ backgroundColor: '#10b981', color: '#fff', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {loading ? 'Salvando...' : '➕ Cadastrar Novo Estudo'}
        </button>
      </form>

      {/* Lista de Publicações no Painel */}
      <h3 style={{ fontSize: '16px', color: '#0f172a' }}>Materiais Publicados</h3>
      <div style={{ display: 'grid', gap: '10px' }}>
        {studies.length === 0 ? (
          <p style={{ color: '#64748b', fontSize: '14px' }}>Nenhum estudo cadastrado ainda.</p>
        ) : (
          studies.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
              <div>
                <strong style={{ fontSize: '14px', display: 'block', color: '#0f172a' }}>{item.title}</strong>
                <small style={{ color: '#64748b' }}>📥 {item.downloads_count || 0} downloads • {item.category}</small>
              </div>
              <button onClick={() => handleDelete(item.id)} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                Excluir
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
                  }
