import React, { useState, useEffect } from 'react'
import supabase from '../../lib/supabaseClient.js'

export default function AdminAgenda() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Culto',
    event_date: '',
    event_time: '19:30',
    location: 'Templo Sede',
    description: '',
    image_url: ''
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true })

      if (error) throw error
      setEvents(data || [])
    } catch (err) {
      alert('Erro ao carregar eventos: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { error } = await supabase.from('events').insert([
        {
          title: formData.title,
          category: formData.category,
          event_date: formData.event_date,
          event_time: formData.event_time,
          location: formData.location,
          description: formData.description,
          image_url: formData.image_url
        }
      ])

      if (error) throw error

      alert('Evento cadastrado com sucesso!')
      setFormData({
        title: '',
        category: 'Culto',
        event_date: '',
        event_time: '19:30',
        location: 'Templo Sede',
        description: '',
        image_url: ''
      })
      fetchEvents()
    } catch (err) {
      alert('Erro ao salvar evento: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este evento?')) return
    try {
      const { error } = await supabase.from('events').delete().eq('id', id)
      if (error) throw error
      fetchEvents()
    } catch (err) {
      alert('Erro ao excluir: ' + err.message)
    }
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Painel do Administrador - Agenda & Eventos</h2>

      <form onSubmit={handleSubmit} style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>Cadastrar Novo Evento</h3>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Título do Evento / Culto:</label>
          <input
            type="text"
            required
            placeholder="Ex: Culto de Ensino, Congresso de Jovens"
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '12px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Categoria:</label>
            <select
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Culto">Culto</option>
              <option value="Congresso">Congresso</option>
              <option value="EBD">EBD</option>
              <option value="Ensaio">Ensaio</option>
              <option value="Reunião">Reunião</option>
              <option value="Especial">Especial</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Local:</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '12px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Data:</label>
            <input
              type="date"
              required
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
              value={formData.event_date}
              onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Horário:</label>
            <input
              type="time"
              required
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
              value={formData.event_time}
              onChange={(e) => setFormData({ ...formData, event_time: e.target.value })}
            />
          </div>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Descrição / Observações:</label>
          <textarea
            rows="3"
            placeholder="Detalhes adicionais do evento..."
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>URL da Imagem/Banner (Opcional):</label>
          <input
            type="url"
            placeholder="https://..."
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Salvar Evento
        </button>
      </form>

      <h3>Eventos Agendados</h3>
      {loading ? <p>Carregando...</p> : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {events.length === 0 ? <p>Nenhum evento agendado.</p> : events.map((item) => (
            <div key={item.id} style={{ display: 'flex', border: '1px solid #ddd', padding: '15px', borderRadius: '6px', alignItems: 'center', gap: '15px', background: '#fff' }}>
              {item.image_url && (
                <img src={item.image_url} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
              )}
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{item.title} <small style={{ color: '#0070f3', fontWeight: 'bold' }}>[{item.category}]</small></h4>
                <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#333' }}>
                  📅 <strong>{new Date(item.event_date + 'T00:00:00').toLocaleDateString('pt-BR')}</strong> às ⏰ <strong>{item.event_time}</strong> — 📍 {item.location}
                </p>
                {item.description && <p style={{ margin: '0', fontSize: '13px', color: '#666' }}>{item.description}</p>}
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
