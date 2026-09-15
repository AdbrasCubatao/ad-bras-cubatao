import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Prayer() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchRequests()
  }, [])

  async function fetchRequests() {
    try {
      setLoading(true)
      setErrorMessage('')
      const { data, error } = await supabase
        .from('prayer_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setRequests(data || [])
    } catch (err) {
      console.error('Erro ao buscar pedidos:', err)
      setErrorMessage(err.message || 'Erro ao carregar os pedidos de oração.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!description.trim()) return

    try {
      setSubmitting(true)
      const { error } = await supabase
        .from('prayer_requests')
        .insert([{ name: name.trim() || 'Anônimo', description: description.trim() }])

      if (error) throw error

      setName('')
      setDescription('')
      alert('Pedido de oração enviado com sucesso!')
      fetchRequests()
    } catch (err) {
      alert('Erro ao enviar pedido: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '16px' }}>
        🙏 Pedidos de Oração
      </h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Seu nome (opcional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <textarea
          placeholder="Escreva seu pedido de oração..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          disabled={submitting}
          style={{ backgroundColor: '#2563eb', color: '#fff', padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {submitting ? 'Enviando...' : 'Enviar Pedido'}
        </button>
      </form>

      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>Mural de Oração</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : errorMessage ? (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      ) : requests.length === 0 ? (
        <p>Nenhum pedido cadastrado ainda.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {requests.map((item) => (
            <div key={item.id} style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <strong>{item.name || 'Anônimo'}</strong>
              <p style={{ margin: '4px 0 0 0', color: '#475569' }}>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
