import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [dbError, setDbError] = useState(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [location, setLocation] = useState('')
  const [isPinned, setIsPinned] = useState(false)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  async function fetchAnnouncements() {
    try {
      setLoading(true)
      setDbError(null)
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setAnnouncements(data || [])
    } catch (err) {
      console.warn('Supabase info:', err.message)
      setDbError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !description.trim()) {
      alert('Por favor, preencha o título e a descrição.')
      return
    }

    try {
      setSubmitting(true)
      const newAviso = {
        title: title.trim(),
        description: description.trim(),
        image_url: imageUrl.trim() || null,
        event_date: eventDate || null,
        location: location.trim() || null,
        is_pinned: isPinned
      }

      const { error } = await supabase.from('announcements').insert([newAviso])

      if (error) throw error

      setTitle('')
      setDescription('')
      setImageUrl('')
      setEventDate('')
      setLocation('')
      setIsPinned(false)

      alert('Aviso publicado com sucesso!')
      fetchAnnouncements()
    } catch (err) {
      alert('Erro ao salvar no banco: ' + err.message + '\n\nCertifique-se de executar o script SQL no Supabase.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Deseja realmente excluir este aviso?')) return

    try {
      const { error } = await supabase.from('announcements').delete().eq('id', id)
      if (error) throw error
      fetchAnnouncements()
    } catch (err) {
      alert('Erro ao excluir: ' + err.message)
    }
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a', margin: 0 }}>
          📢 Gerenciador de Avisos
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
          Cadastre comunicados e eventos em destaque para a igreja
        </p>
      </header>

      {dbError && (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
          <strong>Atenção:</strong> A tabela de avisos precisa ser criada no Supabase SQL Editor.
        </div>
      )}

      {/* Formulário de Cadastro */}
      <section style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#334155' }}>Novo Aviso</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>Título *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Culto da Família"
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>Descrição / Recado *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Digite as informações principais..."
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>Data do Evento</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>Local</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Templo Sede"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>URL da Imagem (Opcional)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <input
              type="checkbox"
              id="isPinned"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="isPinned" style={{ fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>
              Destacar aviso no topo 📌
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{ backgroundColor: '#2563eb', color: '#fff', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '8px' }}
          >
            {submitting ? 'Publicando...' : 'Salvar e Publicar'}
          </button>
        </form>
      </section>

      {/* Lista de Avisos */}
      <section>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#334155' }}>Avisos Cadastrados</h2>
        {loading ? (
          <p style={{ color: '#64748b' }}>Carregando dados...</p>
        ) : announcements.length === 0 ? (
          <p style={{ color: '#64748b' }}>Nenhum aviso ativo no momento.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {announcements.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '15px' }}>
                    {item.title} {item.is_pinned && <span style={{ color: '#2563eb', fontSize: '12px' }}>📌 (Destaque)</span>}
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                    {item.description.substring(0, 60)}{item.description.length > 60 ? '...' : ''}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
