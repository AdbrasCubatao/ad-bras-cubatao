import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import PageHeader from '../components/PageHeader.jsx'

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' })
}

export default function Agenda() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true })
      if (!error) setItems(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="page">
      <PageHeader title="Agenda" subtitle="Próximos cultos e eventos da igreja." />
      {loading && <p className="empty-state">Carregando agenda...</p>}
      {!loading && items.length === 0 && (
        <p className="empty-state">Nenhum evento agendado no momento.</p>
      )}
      {items.map((e) => (
        <div key={e.id} className="card">
          <p className="pill">{formatDate(e.event_date)}</p>
          <p className="comment-name" style={{ fontSize: 15 }}>{e.title}</p>
          {e.description && <p className="comment-text">{e.description}</p>}
        </div>
      ))}
    </div>
  )
}
