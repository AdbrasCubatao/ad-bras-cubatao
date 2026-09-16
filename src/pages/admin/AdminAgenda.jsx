import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import supabaseClient, { supabase as supabaseNamed } from '../../lib/supabaseClient.js'

const client = supabaseClient || supabaseNamed

const INITIAL_FORM_STATE = {
  title: '',
  category: 'Culto',
  location: 'Templo Sede',
  event_date: '',
  event_time: '19:30',
  description: '',
  image_url: ''
}

export default function AdminAgenda() {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState(INITIAL_FORM_STATE)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const { data, error } = await client
        .from('events')
        .select('*')
        .order('event_date', { ascending: true })

      if (error) throw error
      setEvents(data || [])
      setErrorMessage('')
    } catch (err) {
      setErrorMessage(err.message || 'Erro ao carregar eventos.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleEdit = (evt) => {
    setEditingId(evt.id)
    setFormData({
      title: evt.title || '',
      category: evt.category || 'Culto',
      location: evt.location || 'Templo Sede',
      event_date: evt.event_date || '',
      event_time: evt.event_time || '19:30',
      description: evt.description || '',
      image_url: evt.image_url || ''
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData(INITIAL_FORM_STATE)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Trata valores opcionais vazios salvando null no banco
    const payload = {
      ...formData,
      image_url: formData.image_url.trim() || null,
      description: formData.description.trim() || null
    }

    try {
      if (editingId) {
        // Atualizar evento existente
        const { error } = await client
          .from('events')
          .update(payload)
          .eq('id', editingId)

        if (error) throw error
        alert('Evento atualizado com sucesso!')
      } else {
        // Inserir novo evento
        const { error } = await client
          .from('events')
          .insert([payload])

        if (error) throw error
        alert('Evento cadastrado com sucesso!')
      }

      cancelEdit()
      fetchEvents()
    } catch (err) {
      alert('Erro ao salvar evento: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este evento?')) return
    try {
      const { error } = await client.from('events').delete().eq('id', id)
      if (error) throw error
      fetchEvents()
    } catch (err) {
      alert('Erro ao excluir: ' + err.message)
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Navegação */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ padding: '8px 14px', background: '#4b5563', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ← Início (Site)
        </button>
        <button 
          onClick={() => navigate('/admin')} 
          style={{ padding: '8px 14px', background: '#1f2937', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Painel Geral
        </button>
      </div>

      <h2>Painel do Administrador - Agenda & Eventos</h2>

      {errorMessage && (
        <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '12px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #fca5a5' }}>
          <strong>Aviso de Erro:</strong> {errorMessage}
        </div>
      )}

      {/* Formulário de Cadastro e Edição */}
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #e5e7eb' }}>
        <h3>{editingId ? '✏️ Editar Evento' : '➕ Cadastrar Novo Evento'}</h3>
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Título do Evento / Culto:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Categoria:</label>
            <select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="Culto">Culto</option>
              <option value="Congresso">Congresso</option>
              <option value="Reunião">Reunião</option>
              <option value="Especial">Especial</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Local:</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Data:</label>
            <input type="date" name="event_date" value={formData.event_date} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Horário:</label>
            <input type="text" name="event_time" value={formData.event_time} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Descrição / Observações:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="3" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>URL da Imagem/Banner (Opcional):</label>
          <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ backgroundColor: editingId ? '#d97706' : '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            {editingId ? 'Atualizar Evento' : 'Salvar Evento'}
          </button>
          
          {editingId && (
            <button type="button" onClick={cancelEdit} style={{ backgroundColor: '#6b7280', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
              Cancelar Edição
            </button>
          )}
        </div>
      </form>

      {/* Lista de Eventos Cadastrados */}
      <h3>Eventos Agendados</h3>
      {loading ? (
        <p>Carregando eventos...</p>
      ) : events.length === 0 ? (
        <p>Nenhum evento cadastrado ainda.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {events.map((evt) => (
            <div key={evt.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', backgroundColor: '#fff' }}>
              <div>
                <h4 style={{ margin: '0 0 4px 0' }}>{evt.title} <small style={{ color: '#2563eb' }}>[{evt.category}]</small></h4>
                <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>📅 {evt.event_date} às ⏰ {evt.event_time} — 📍 {evt.location}</p>
                {evt.description && <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#444' }}>{evt.description}</p>}
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => handleEdit(evt)} style={{ backgroundColor: '#d97706', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                  Editar
                </button>
                <button onClick={() => handleDelete(evt.id)} style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
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
