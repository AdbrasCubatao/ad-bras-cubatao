import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Form states
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [location, setLocation] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [linkLabel, setLinkLabel] = useState('Mais Informações')
  const [isPinned, setIsPinned] = useState(false)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  async function fetchAnnouncements() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setAnnouncements(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return

    try {
      setSubmitting(true)
      const { error } = await supabase.from('announcements').insert([
        {
          title: title.trim(),
          description: description.trim(),
          image_url: imageUrl.trim() || null,
          event_date: eventDate || null,
          location: location.trim() || null,
          link_url: linkUrl.trim() || null,
          link_label: linkLabel.trim() || 'Mais Informações',
          is_pinned: isPinned
        }
      ])

      if (error) throw error

      // Reset form
      setTitle('')
      setDescription('')
      setImageUrl('')
      setEventDate('')
      setLocation('')
      setLinkUrl('')
      setLinkLabel('Mais Informações')
      setIsPinned(false)

      alert('Aviso cadastrado com sucesso!')
      fetchAnnouncements()
    } catch (err) {
      alert('Erro ao salvar aviso: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Tem certeza que deseja excluir este aviso?')) return

    try {
      const { error } = await supabase.from('announcements').delete().eq('id', id)
      if (error) throw error
      fetchAnnouncements()
    } catch (err) {
      alert('Erro ao deletar: ' + err.message)
    }
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif', color: '#0f172a' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#1e3a8a' }}>
        ⚙️ Gestão de Avisos e Comunicados
      </h1>

      {/* Form Cadastro */}
      <section style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Criar Novo Aviso</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>Título do Aviso *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Culto Especial de Missões" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>Descrição detalhada *</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Digite os detalhes do aviso..." required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>Data do Evento (Opcional)</label>
              <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>Local (Opcional)</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ex: Templo Sede" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>URL da Foto/Imagem (Opcional)</label>
            <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://exemplo.com/imagem.jpg" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>Link Externo (Inscrições / WhatsApp)</label>
              <input type="url" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>Texto do Botão</label>
              <input type="text" value={linkLabel} onChange={(e) => setLinkLabel(e.target.value)} placeholder="Mais Informações" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" id="pinned" checked={isPinned} onChange={(e) => setIsPinned(e.target.checked)} style={{ width: '18px', height: '18px' }} />
            <label htmlFor="pinned" style={{ fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>Fixar no topo como Destaque 📌</label>
          </div>

          <button type="submit" disabled={submitting} style={{ backgroundColor: '#2563eb', color: '#fff', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
            {submitting ? 'Publicando...' : 'Publicar Aviso'}
          </button>
        </form>
      </section>

      {/* Lista para Gerenciamento */}
      <section>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Avisos Publicados</h2>
        {loading ? <p>Carregando...</p> : announcements.length === 0 ? <p>Nenhum aviso cadastrado.</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {announcements.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <div>
                  <strong>{item.title}</strong> {item.is_pinned && <span style={{ color: '#2563eb', fontSize: '12px' }}>(Fixado)</span>}
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>{item.description.substring(0, 80)}...</p>
                </div>
                <button onClick={() => handleDelete(item.id)} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
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
