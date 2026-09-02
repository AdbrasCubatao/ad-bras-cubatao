import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import PageHeader from '../components/PageHeader.jsx'

export default function Announcements() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error) setItems(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="page">
      <PageHeader title="Avisos" subtitle="Fique por dentro das novidades da igreja." />
      {loading && <p className="empty-state">Carregando avisos...</p>}
      {!loading && items.length === 0 && (
        <p className="empty-state">Nenhum aviso publicado no momento.</p>
      )}
      {items.map((a) => (
        <div key={a.id} className="card">
          <p className="comment-name" style={{ fontSize: 15 }}>{a.title}</p>
          <p className="comment-text">{a.body}</p>
        </div>
      ))}
    </div>
  )
}
