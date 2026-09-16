import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Prayer() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
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
      setSuccessMessage('')
      setErrorMessage('')

      const { data: newRequest, error } = await supabase
        .from('prayer_requests')
        .insert([{ name: name.trim() || 'Anônimo', description: description.trim() }])
        .select()
        .single()

      if (error) throw error

      setName('')
      setDescription('')
      setSuccessMessage('Pedido de oração enviado com sucesso!')
      
      if (newRequest) {
        setRequests((prev) => [newRequest, ...prev])
      }

      setTimeout(() => setSuccessMessage(''), 4000)
    } catch (err) {
      setErrorMessage('Erro ao enviar pedido: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
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

        {successMessage && (
          <div style={{ padding: '10px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '6px', fontSize: '14px' }}>
            {successMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={{ 
            backgroundColor: submitting ? '#93c5fd' : '#2563eb', 
            color: '#fff', 
            padding: '12px', 
            border: 'none', 
            borderRadius: '6px', 
            fontWeight: 'bold', 
            cursor: submitting ? 'not-allowed' : 'pointer' 
          }}
        >
          {submitting ? 'Enviando...' : 'Enviar Pedido'}
        </button>
      </form>

      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>Mural de Oração</h2>
      
      {loading ? (
        <p style={{ color: '#64748b' }}>Carregando pedidos...</p>
      ) : errorMessage && requests.length === 0 ? (
        <p style={{ color: '#dc2626' }}>{errorMessage}</p>
      ) : requests.length === 0 ? (
        <p style={{ color: '#64748b' }}>Nenhum pedido cadastrado ainda. Seja o primeiro a pedir oração!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {requests.map((item) => (
            <div key={item.id} style={{ padding: '14px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <strong style={{ color: '#1e293b' }}>{item.name || 'Anônimo'}</strong>
                {item.created_at && (
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>{formatDate(item.created_at)}</span>
                )}
              </div>
              <p style={{ margin: '0', color: '#334155', lineHeight: '1.4', whiteSpace: 'pre-line' }}>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
