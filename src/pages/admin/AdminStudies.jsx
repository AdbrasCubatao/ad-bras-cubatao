import React, { useState, useEffect } from 'react'
import supabaseClient, { supabase as supabaseNamed } from '../../lib/supabaseClient.js'

const supabase = supabaseClient || supabaseNamed

const INITIAL_FORM = {
  title: '',
  category: 'EBD - Adultos',
  description: '',
  cover_url: '',
  file_url: ''
}

export default function AdminStudies() {
  const [studies, setStudies] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(INITIAL_FORM)

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

  const handleEdit = (item) => {
    setEditingId(item.id)
    setFormData({
      title: item.title || '',
      category: item.category || 'EBD - Adultos',
      description: item.description || '',
      cover_url: item.cover_url || '',
      file_url: item.file_url || ''
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData(INITIAL_FORM)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const payload = {
      title: formData.title.trim(),
      category: formData.category,
      description: formData.description.trim() || null,
      cover_url: formData.cover_url.trim() || null,
      file_url: formData.file_url.trim()
    }

    try {
      if (editingId) {
        // Atualiza registro existente
        const { error } = await supabase
          .from('studies')
          .update(payload)
          .eq('id', editingId)

        if (error) throw error
        alert('Estudo atualizado com sucesso!')
      } else {
        // Insere novo registro
        const { error } = await supabase
          .from('studies')
          .insert([{ ...payload, downloads_count: 0 }])

        if (error) throw error
        alert('Estudo cadastrado com sucesso!')
      }

      cancelEdit()
      fetchStudies()
    } catch (err) {
      alert('Erro ao salvar estudo: ' + err.message)
    } finally {
      setSubmitting(false)
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
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif', color: '#1e293b' }}>
      <h2>Painel do Administrador - Estudos & EBD</h2>

      <form onSubmit={handleSubmit} style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
        <h3>{editingId ? '✏️ Editar Estudo' : '➕ Cadastrar Novo Estudo'}</h3>
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Título do Estudo *</label>
          <input
            type="text"
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Categoria</label>
          <select
            style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
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
          <label style={{ display: 'block', fontWeight: 'bold' }}>Breve Citação / Resumo</label>
          <textarea
            rows="3"
            style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>URL da Imagem de Capa (Opcional)</label>
          <input
            type="url"
            placeholder="https://..."
            style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            value={formData.cover_url}
            onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Link do Material (PDF / Google Drive) *</label>
          <input
            type="url"
            required
            placeholder="https://..."
            style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            value={formData.file_url}
            onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit" 
            disabled={submitting}
            style={{ padding: '10px 20px', background: editingId ? '#d97706' : '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {submitting ? 'Salvando...' : editingId ? 'Atualizar Estudo' : 'Salvar e Publicar'}
          </button>

          {editingId && (
            <button 
              type="button" 
              onClick={cancelEdit}
              style={{ padding: '10px 20px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Cancelar Edição
            </button>
          )}
        </div>
      </form>

      <h3>Estudos Publicados</h3>
      {loading ? (
        <p>Carregando...</p>
      ) : studies.length === 0 ? (
        <p style={{ color: '#64748b' }}>Nenhum estudo publicado até o momento.</p>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {studies.map((item) => (
            <div key={item.id} style={{ display: 'flex', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '6px', alignItems: 'center', gap: '15px', background: '#fff' }}>
              {item.cover_url && (
                <img src={item.cover_url} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
              )}
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{item.title} <small style={{ color: '#64748b', fontWeight: 'normal' }}>({item.category})</small></h4>
                {item.description && <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#475569' }}>{item.description}</p>}
                <small style={{ color: '#2563eb' }}>📥 Downloads: <strong>{item.downloads_count || 0}</strong></small>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => handleEdit(item)} style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Editar
                </button>
                <button onClick={() => handleDelete(item.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
