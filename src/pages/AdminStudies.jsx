import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient.js'

export default function AdminStudies() {
  const [studies, setStudies] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    category: 'EBD - Adultos',
    description: '',
    cover_url: '',
    file_url: ''
  })

  useEffect(() => {
    fetchStudies()
  }, [])

  const fetchStudies = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('studies')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setStudies(data || [])
    } catch (err) {
      alert('Erro ao carregar estudos: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { error } = await supabase.from('studies').insert([
        {
          title: formData.title,
          category: formData.category,
          description: formData.description,
          cover_url: formData.cover_url,
          file_url: formData.file_url,
          downloads_count: 0
        }
      ])

      if (error) throw error

      alert('Estudo cadastrado com sucesso!')
      setFormData({ title: '', category: 'EBD - Adultos', description: '', cover_url: '', file_url: '' })
      fetchStudies()
    } catch (err) {
      alert('Erro ao salvar estudo: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este estudo?')) return
    try {
      const { error } = await supabase.from('studies').delete().eq('id', id)
      if (error) throw error
      fetchStudies()
    } catch (err) {
      alert('Erro ao excluir: ' + err.message)
    }
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Painel do Administrador - Estudos & EBD</h2>

      <form onSubmit={handleSubmit} style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>Cadastrar Novo Estudo</h3>
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Título do Estudo:</label>
          <input
            type="text"
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Categoria:</label>
          <select
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="EBD - Adultos">EBD - Adultos</option>
            <option value="EBD - Jovens">EBD - Jovens</option>
            <option value="EBD - Crianças">EBD - Crianças</option>
            <option value="Doutrina">Doutrina</option>
            <option value="Sermões">Sermões</option>
          </select>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Breve Citação / Resumo:</label>
          <textarea
            rows="3"
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>URL da Imagem de Capa (Foto/Card):</label>
          <input
            type="url"
            placeholder="https://..."
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            value={formData.cover_url}
            onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Link do Material (PDF / Google Drive):</label>
          <input
            type="url"
            required
            placeholder="https://..."
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            value={formData.file_url}
            onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Salvar e Publicar
        </button>
      </form>

      <h3>Estudos Publicados</h3>
      {loading ? <p>Carregando...</p> : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {studies.map((item) => (
            <div key={item.id} style={{ display: 'flex', border: '1px solid #ddd', padding: '15px', borderRadius: '6px', alignItems: 'center', gap: '15px' }}>
              {item.cover_url && (
                <img src={item.cover_url} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
              )}
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{item.title} <small style={{ color: '#666', fontWeight: 'normal' }}>({item.category})</small></h4>
                <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#444' }}>{item.description}</p>
                <small style={{ color: '#0070f3' }}>📥 Downloads: <strong>{item.downloads_count || 0}</strong></small>
              </div>
              <button onClick={() => handleDelete(item.id)} style={{ background: '#ff4d4d', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                Excluir
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
