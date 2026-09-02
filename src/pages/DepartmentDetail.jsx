import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient.js'
import PageHeader from '../components/PageHeader.jsx'
import { DEPARTMENTS } from '../lib/departments.js'

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000
  if (diff < 60) return 'agora há pouco'
  if (diff < 3600) return `${Math.floor(diff / 60)} min atrás`
  if (diff < 86400) return `${Math.floor(diff / 3600)} h atrás`
  return `${Math.floor(diff / 86400)} d atrás`
}

export default function DepartmentDetail() {
  const { slug } = useParams()
  const department = DEPARTMENTS.find((d) => d.slug === slug)

  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadComments() {
    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from('comments')
      .select('*')
      .eq('department_slug', slug)
      .order('created_at', { ascending: false })
    if (!fetchError) setComments(data ?? [])
    setLoading(false)
  }

  useEffect(() => { loadComments() }, [slug])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!text.trim()) {
      setError('Escreva um comentário.')
      return
    }
    setSending(true)
    const { error: insertError } = await supabase.from('comments').insert({
      department_slug: slug,
      name: name.trim() || 'Anônimo',
      text: text.trim(),
    })
    setSending(false)
    if (insertError) {
      setError('Não foi possível enviar agora. Tente novamente.')
      return
    }
    setName('')
    setText('')
    loadComments()
  }

  if (!department) {
    return (
      <div className="page">
        <PageHeader title="Departamento não encontrado" />
        <Link to="/departamentos" className="btn-primary" style={{ display: 'block', textAlign: 'center' }}>
          Voltar
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <PageHeader title={department.name} subtitle={department.description} />

      <h3 className="section-heading" style={{ padding: 0, margin: '10px 0 12px' }}>
        Comentários
      </h3>

      <form className="card" onSubmit={handleSubmit}>
        <label htmlFor="name">Seu nome (opcional)</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: João" />
        <label htmlFor="text">Comentário</label>
        <textarea id="text" rows={3} value={text} onChange={(e) => setText(e.target.value)} placeholder="Deixe sua mensagem..." />
        {error && <p className="error-text">{error}</p>}
        <button className="btn-primary" type="submit" disabled={sending}>
          {sending ? 'Enviando...' : 'Comentar'}
        </button>
      </form>

      {loading && <p className="empty-state">Carregando comentários...</p>}
      {!loading && comments.length === 0 && (
        <p className="empty-state">Nenhum comentário ainda. Seja o primeiro!</p>
      )}
      {comments.length > 0 && (
        <div className="card">
          {comments.map((c) => (
            <div key={c.id} className="comment-item">
              <p className="comment-name">
                {c.name}
                <span className="comment-date">· {timeAgo(c.created_at)}</span>
              </p>
              <p className="comment-text">{c.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
