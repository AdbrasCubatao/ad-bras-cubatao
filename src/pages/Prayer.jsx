import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import PageHeader from '../components/PageHeader.jsx'

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000
  if (diff < 60) return 'agora há pouco'
  if (diff < 3600) return `${Math.floor(diff / 60)} min atrás`
  if (diff < 86400) return `${Math.floor(diff / 3600)} h atrás`
  return `${Math.floor(diff / 86400)} d atrás`
}

export default function Prayer() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadRequests() {
    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from('prayer_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)
    if (!fetchError) setRequests(data ?? [])
    setLoading(false)
  }

  useEffect(() => { loadRequests() }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!message.trim()) {
      setError('Escreva o seu pedido de oração.')
      return
    }
    setSending(true)
    const { error: insertError } = await supabase.from('prayer_requests').insert({
      name: name.trim() || 'Anônimo',
      message: message.trim(),
    })
    setSending(false)
    if (insertError) {
      setError('Não foi possível enviar agora. Tente novamente em instantes.')
      return
    }
    setName('')
    setMessage('')
    setSuccess(true)
    loadRequests()
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="page">
      <PageHeader
        title="Pedidos de Oração"
        subtitle="Compartilhe seu pedido. Nossa igreja vai orar com você."
      />

      <form className="card" onSubmit={handleSubmit}>
        <label htmlFor="name">Seu nome (opcional)</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Maria" />

        <label htmlFor="message">Seu pedido</label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Conte o que está em seu coração..."
        />

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">Pedido enviado! Estamos orando com você. 🙏</p>}

        <button className="btn-primary btn-gold" type="submit" disabled={sending}>
          {sending ? 'Enviando...' : 'Enviar pedido'}
        </button>
      </form>

      <h3 className="section-heading" style={{ padding: 0, margin: '26px 0 12px' }}>
        Mural de Oração
      </h3>

      {loading && <p className="empty-state">Carregando pedidos...</p>}
      {!loading && requests.length === 0 && (
        <p className="empty-state">Nenhum pedido ainda. Seja o primeiro a compartilhar.</p>
      )}
      {requests.map((r) => (
        <div key={r.id} className="card">
          <p className="comment-name">
            {r.name}
            <span className="comment-date">· {timeAgo(r.created_at)}</span>
          </p>
          <p className="comment-text">{r.message}</p>
        </div>
      ))}
    </div>
  )
}
