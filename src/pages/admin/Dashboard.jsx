import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient.js'

const TABS = ['Avisos', 'Agenda', 'Quiz', 'Ranking', 'Orações', 'Comentários', 'Configurações']

export default function Dashboard() {
  const [tab, setTab] = useState('Avisos')
  const navigate = useNavigate()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="page-title" style={{ fontSize: 20 }}>Painel Admin</h1>
        <button onClick={handleLogout} style={{ fontSize: 12, fontWeight: 700, color: 'var(--navy-800)', background: 'none', border: 'none' }}>
          Sair
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '14px 0 20px', paddingBottom: 4 }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flexShrink: 0,
              padding: '8px 14px',
              borderRadius: 999,
              fontSize: 12.5,
              fontWeight: 700,
              border: '1px solid var(--navy-800)',
              background: tab === t ? 'var(--navy-900)' : 'white',
              color: tab === t ? 'white' : 'var(--navy-900)',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Avisos' && <AnnouncementsManager />}
      {tab === 'Agenda' && <EventsManager />}
      {tab === 'Quiz' && <QuizManager />}
      {tab === 'Ranking' && <RankingManager />}
      {tab === 'Orações' && <PrayerRequestsManager />}
      {tab === 'Comentários' && <CommentsManager />}
      {tab === 'Configurações' && <SettingsManager />}
    </div>
  )
}

// ---------------- Avisos ----------------
function AnnouncementsManager() {
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(true)

  async function load() {
    const { data } = await supabase.from('announcements').select('*').order('created_at', { ascending: false })
    setItems(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function add(e) {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    await supabase.from('announcements').insert({ title: title.trim(), body: body.trim() })
    setTitle(''); setBody('')
    load()
  }

  async function remove(id) {
    await supabase.from('announcements').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <form className="card" onSubmit={add}>
        <label>Título</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Texto</label>
        <textarea rows={3} value={body} onChange={(e) => setBody(e.target.value)} />
        <button className="btn-primary" type="submit">Publicar aviso</button>
      </form>
      {loading && <p className="empty-state">Carregando...</p>}
      {items.map((a) => (
        <div key={a.id} className="card">
          <p className="comment-name">{a.title}</p>
          <p className="comment-text">{a.body}</p>
          <button onClick={() => remove(a.id)} className="error-text" style={{ background: 'none', border: 'none', marginTop: 8 }}>
            Excluir
          </button>
        </div>
      ))}
    </div>
  )
}

// ---------------- Agenda ----------------
function EventsManager() {
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [loading, setLoading] = useState(true)

  async function load() {
    const { data } = await supabase.from('events').select('*').order('event_date', { ascending: true })
    setItems(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function add(e) {
    e.preventDefault()
    if (!title.trim() || !eventDate) return
    await supabase.from('events').insert({ title: title.trim(), description: description.trim(), event_date: eventDate })
    setTitle(''); setDescription(''); setEventDate('')
    load()
  }

  async function remove(id) {
    await supabase.from('events').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <form className="card" onSubmit={add}>
        <label>Título do evento</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Data e hora</label>
        <input type="datetime-local" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        <label>Descrição (opcional)</label>
        <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
        <button className="btn-primary" type="submit">Adicionar à agenda</button>
      </form>
      {loading && <p className="empty-state">Carregando...</p>}
      {items.map((ev) => (
        <div key={ev.id} className="card">
          <p className="pill">{new Date(ev.event_date).toLocaleString('pt-BR')}</p>
          <p className="comment-name">{ev.title}</p>
          {ev.description && <p className="comment-text">{ev.description}</p>}
          <button onClick={() => remove(ev.id)} className="error-text" style={{ background: 'none', border: 'none', marginTop: 8 }}>
            Excluir
          </button>
        </div>
      ))}
    </div>
  )
}

// ---------------- Quiz ----------------
function QuizManager() {
  const [items, setItems] = useState([])
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctIndex, setCorrectIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  async function load() {
    const { data } = await supabase.from('quiz_questions').select('*').order('created_at', { ascending: false })
    setItems(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  function updateOption(i, val) {
    setOptions((prev) => prev.map((o, idx) => (idx === i ? val : o)))
  }

  async function add(e) {
    e.preventDefault()
    if (!question.trim() || options.some((o) => !o.trim())) return
    await supabase.from('quiz_questions').insert({
      question: question.trim(),
      options: options.map((o) => o.trim()),
      correct_index: correctIndex,
    })
    setQuestion(''); setOptions(['', '', '', '']); setCorrectIndex(0)
    load()
  }

  async function remove(id) {
    await supabase.from('quiz_questions').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <form className="card" onSubmit={add}>
        <label>Pergunta</label>
        <input value={question} onChange={(e) => setQuestion(e.target.value)} />
        {options.map((opt, i) => (
          <div key={i}>
            <label>Alternativa {i + 1}</label>
            <input value={opt} onChange={(e) => updateOption(i, e.target.value)} />
          </div>
        ))}
        <label>Alternativa correta</label>
        <select value={correctIndex} onChange={(e) => setCorrectIndex(Number(e.target.value))}>
          {options.map((_, i) => <option key={i} value={i}>Alternativa {i + 1}</option>)}
        </select>
        <button className="btn-primary" type="submit">Adicionar pergunta</button>
      </form>
      {loading && <p className="empty-state">Carregando...</p>}
      {items.map((q) => (
        <div key={q.id} className="card">
          <p className="comment-name">{q.question}</p>
          <p className="comment-text">Correta: {q.options[q.correct_index]}</p>
          <button onClick={() => remove(q.id)} className="error-text" style={{ background: 'none', border: 'none', marginTop: 8 }}>
            Excluir
          </button>
        </div>
      ))}
    </div>
  )
}

// ---------------- Ranking do Quiz (visualizar/excluir) ----------------
function RankingManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    const { data } = await supabase
      .from('quiz_scores')
      .select('*')
      .order('score', { ascending: false })
      .order('created_at', { ascending: true })
    setItems(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function remove(id) {
    await supabase.from('quiz_scores').delete().eq('id', id)
    load()
  }

  async function clearAll() {
    if (items.length === 0) return
    await supabase.from('quiz_scores').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    load()
  }

  return (
    <div>
      {items.length > 0 && (
        <button onClick={clearAll} className="btn-primary" style={{ marginBottom: 14 }}>
          Zerar ranking
        </button>
      )}
      {loading && <p className="empty-state">Carregando...</p>}
      {!loading && items.length === 0 && <p className="empty-state">Ninguém pontuou ainda.</p>}
      {items.map((r, i) => (
        <div key={r.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p className="comment-name">{i + 1}. {r.name}</p>
            <p className="comment-text">{r.score}/{r.total_questions} pontos</p>
          </div>
          <button onClick={() => remove(r.id)} className="error-text" style={{ background: 'none', border: 'none' }}>
            Excluir
          </button>
        </div>
      ))}
    </div>
  )
}

// ---------------- Pedidos de Oração (visualizar/excluir) ----------------
function PrayerRequestsManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    const { data } = await supabase.from('prayer_requests').select('*').order('created_at', { ascending: false })
    setItems(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function remove(id) {
    await supabase.from('prayer_requests').delete().eq('id', id)
    load()
  }

  return (
    <div>
      {loading && <p className="empty-state">Carregando...</p>}
      {!loading && items.length === 0 && <p className="empty-state">Nenhum pedido ainda.</p>}
      {items.map((r) => (
        <div key={r.id} className="card">
          <p className="comment-name">{r.name}</p>
          <p className="comment-text">{r.message}</p>
          <button onClick={() => remove(r.id)} className="error-text" style={{ background: 'none', border: 'none', marginTop: 8 }}>
            Excluir
          </button>
        </div>
      ))}
    </div>
  )
}

// ---------------- Comentários (visualizar/excluir) ----------------
function CommentsManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    const { data } = await supabase.from('comments').select('*').order('created_at', { ascending: false })
    setItems(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function remove(id) {
    await supabase.from('comments').delete().eq('id', id)
    load()
  }

  return (
    <div>
      {loading && <p className="empty-state">Carregando...</p>}
      {!loading && items.length === 0 && <p className="empty-state">Nenhum comentário ainda.</p>}
      {items.map((c) => (
        <div key={c.id} className="card">
          <p className="pill">{c.department_slug}</p>
          <p className="comment-name">{c.name}</p>
          <p className="comment-text">{c.text}</p>
          <button onClick={() => remove(c.id)} className="error-text" style={{ background: 'none', border: 'none', marginTop: 8 }}>
            Excluir
          </button>
        </div>
      ))}
    </div>
  )
}

// ---------------- Configurações (fotos, textos, data-driven) ----------------
function SettingsManager() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const FIELDS = [
    { key: 'pastor_name', label: 'Nome do pastor' },
    { key: 'pastor_message', label: 'Mensagem de boas-vindas' },
    { key: 'pastor_photo_url', label: 'URL da foto do pastor' },
    { key: 'logo_url', label: 'URL do logo' },
    { key: 'verse_text', label: 'Versículo em destaque' },
    { key: 'verse_reference', label: 'Referência do versículo' },
    { key: 'address', label: 'Endereço da igreja' },
    { key: 'phone', label: 'Telefone' },
    { key: 'whatsapp_url', label: 'Link do WhatsApp' },
    { key: 'instagram_url', label: 'Link do Instagram' },
    { key: 'youtube_url', label: 'Link do YouTube' },
    { key: 'facebook_url', label: 'Link do Facebook' },
  ]

  async function load() {
    const { data } = await supabase.from('site_settings').select('*')
    const map = {}
    ;(data ?? []).forEach((row) => { map[row.key] = row.value })
    setSettings(map)
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  function update(key, value) {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  async function save(e) {
    e.preventDefault()
    setSaving(true)
    const rows = FIELDS.map((f) => ({ key: f.key, value: settings[f.key] ?? '' }))
    await supabase.from('site_settings').upsert(rows, { onConflict: 'key' })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (loading) return <p className="empty-state">Carregando configurações...</p>

  return (
    <form className="card" onSubmit={save}>
      <p className="comment-text" style={{ marginBottom: 4 }}>
        Esses textos substituem os valores padrão do app assim que forem preenchidos.
      </p>
      {FIELDS.map((f) => (
        <div key={f.key}>
          <label>{f.label}</label>
          {f.key === 'pastor_message' ? (
            <textarea rows={3} value={settings[f.key] ?? ''} onChange={(e) => update(f.key, e.target.value)} />
          ) : (
            <input value={settings[f.key] ?? ''} onChange={(e) => update(f.key, e.target.value)} />
          )}
        </div>
      ))}
      {saved && <p className="success-text">Configurações salvas!</p>}
      <button className="btn-primary btn-gold" type="submit" disabled={saving}>
        {saving ? 'Salvando...' : 'Salvar configurações'}
      </button>
    </form>
  )
}
