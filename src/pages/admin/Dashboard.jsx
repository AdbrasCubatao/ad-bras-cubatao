import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient.js'

export default function Dashboard() {
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)
  const [editId, setEditId] = useState(null)

  // Campos do formulário
  const [title, setTitle] = useState('')
  const [day, setDay] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('Templo Sede')
  const [category, setCategory] = useState('culto')
  const [description, setDescription] = useState('')

  useEffect(() => {
    fetchEventos()
  }, [])

  async function fetchEventos() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      setEventos(data || [])
    } catch (err) {
      alert('Erro ao carregar eventos: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const limparFormulario = () => {
    setEditId(null)
    setTitle('')
    setDay('')
    setTime('')
    setLocation('Templo Sede')
    setCategory('culto')
    setDescription('')
  }

  const handleEdit = (ev) => {
    setEditId(ev.id)
    setTitle(ev.title || '')
    setDay(ev.day || '')
    setTime(ev.time || '')
    setLocation(ev.location || 'Templo Sede')
    setCategory(ev.category || 'culto')
    setDescription(ev.description || '')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!title || !time || !day) {
      alert('Preencha pelo menos o Título, o Dia e o Horário!')
      return
    }

    const payload = { title, day, time, location, category, description }

    try {
      if (editId) {
        const { error } = await supabase.from('events').update(payload).eq('id', editId)
        if (error) throw error
      } else {
        const { error } = await supabase.from('events').insert([payload])
        if (error) throw error
      }
      limparFormulario()
      fetchEventos()
    } catch (err) {
      alert('Erro ao salvar evento: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente apagar este evento da agenda?')) {
      try {
        const { error } = await supabase.from('events').delete().eq('id', id)
        if (error) throw error
        fetchEventos()
      } catch (err) {
        alert('Erro ao excluir: ' + err.message)
      }
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px', fontFamily: 'sans-serif' }}>
      {/* Cabeçalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0a192f', margin: 0 }}>
          ⚙️ Painel de Agenda
        </h2>
        <span style={{ fontSize: '12px', backgroundColor: '#e2e8f0', padding: '4px 8px', borderRadius: '12px' }}>
          Admin
        </span>
      </div>

      {/* Card do Formulário */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0',
        marginBottom: '24px'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: 0, marginBottom: '16px', color: '#2d3748' }}>
          {editId ? '✏️ Editar Evento' : '➕ Adicionar Novo Evento'}
        </h3>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4a5568' }}>Título do Culto/Evento</label>
            <input
              type="text"
              placeholder="Ex: Culto da Família"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e0', marginTop: '4px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4a5568' }}>Dia / Frequência</label>
              <input
                type="text"
                placeholder="Ex: Domingo • Semanal"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e0', marginTop: '4px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4a5568' }}>Horário</label>
              <input
                type="text"
                placeholder="Ex: 18:30"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e0', marginTop: '4px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4a5568' }}>Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e0', marginTop: '4px', backgroundColor: '#fff' }}
              >
                <option value="culto">⛪ Culto</option>
                <option value="ensino">📖 EBD / Ensino</option>
                <option value="jovens">🔥 Jovens</option>
                <option value="oracao">🙏 Oração</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4a5568' }}>Local</label>
              <input
                type="text"
                placeholder="Ex: Templo Sede"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e0', marginTop: '4px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4a5568' }}>Descrição (Opcional)</label>
            <textarea
              rows="2"
              placeholder="Breve resumo da programação..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e0', marginTop: '4px', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: editId ? '#3182ce' : '#2b6cb0',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {editId ? 'Atualizar Evento' : 'Salvar Evento'}
            </button>
            {editId && (
              <button
                type="button"
                onClick={limparFormulario}
                style={{
                  padding: '12px',
                  backgroundColor: '#edf2f7',
                  color: '#4a5568',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de Eventos Cadastrados */}
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d3748', marginBottom: '12px' }}>
        📋 Eventos Cadastrados ({eventos.length})
      </h3>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#718096' }}>Carregando agenda...</p>
      ) : eventos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#718096' }}>Nenhum evento cadastrado ainda.</p>
      ) : (
        <div style={{ display: 'grid', gap: '10px' }}>
          {eventos.map((ev) => (
            <div
              key={ev.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '14px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: '#3182ce', fontWeight: 'bold' }}>
                  {ev.day} • {ev.time}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a202c', margin: '2px 0' }}>
                  {ev.title}
                </div>
                <div style={{ fontSize: '12px', color: '#718096' }}>
                  📍 {ev.location || 'Templo Sede'}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => handleEdit(ev)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#ebf8ff',
                    color: '#2b6cb0',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(ev.id)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#fff5f5',
                    color: '#e53e3e',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Apagar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
                  }
