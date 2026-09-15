import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Prayer() {
  const [prayers, setPrayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [request, setRequest] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    fetchPrayers()
  }, [])

  async function fetchPrayers() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('prayer_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPrayers(data || [])
    } catch (err) {
      console.error('Erro ao carregar pedidos:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !request.trim()) return

    try {
      setSubmitting(true)

      // Data atual formatada (YYYY-MM-DD)
      const today = new Date().toISOString().split('T')[0]

      const { error } = await supabase.from('prayer_requests').insert([
        {
          name: name.trim(),
          request: request.trim(),
          request_date: today
        }
      ])

      if (error) {
        console.error('Erro detalhado do Supabase:', error)
        throw error
      }

      setName('')
      setRequest('')
      setSuccessMsg('Seu pedido de oração foi enviado com sucesso!')
      setTimeout(() => setSuccessMsg(''), 5000)
      fetchPrayers()
    } catch (err) {
      alert('Erro ao enviar pedido: ' + (err.message || 'Verifique sua conexão'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#1e3a8a', fontSize: '28px', marginBottom: '8px' }}>
          🙏 Pedidos de Oração
        </h1>
        <p style={{ color: '#4b5563', fontSize: '15px' }}>
          "Orai uns pelos outros para serdes curados. A oração feita por um justo pode muito em seus efeitos." — Tiago 5:16
        </p>
      </header>

      {/* Formulário de Envio */}
      <section style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '18px', color: '#0f172a', marginBottom: '16px' }}>Deixe seu Pedido</h2>
        
        {successMsg && (
          <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontWeight: 'bold' }}>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>
              Seu Nome:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome ou 'Anônimo'"
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>
              Pedido de Oração:
            </label>
            <textarea
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder="Escreva o motivo de oração..."
              rows={4}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', resize: 'vertical' }}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: submitting ? 'not-allowed' : 'pointer',
              fontSize: '15px'
            }}
          >
            {submitting ? 'Enviando...' : 'Enviar Pedido de Oração'}
          </button>
        </form>
      </section>

      {/* Lista de Pedidos Publicos */}
      <section>
        <h2 style={{ fontSize: '20px', color: '#0f172a', marginBottom: '16px' }}>Mural de Oração</h2>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#64748b' }}>Carregando pedidos...</p>
        ) : prayers.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#64748b' }}>Nenhum pedido cadastrado ainda. Seja o primeiro!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {prayers.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '16px',
                  borderRadius: '10px',
                  borderLeft: '4px solid #2563eb',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ color: '#1e293b', fontSize: '15px' }}>{item.name}</strong>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                    {item.request_date ? new Date(item.request_date + 'T00:00:00').toLocaleDateString('pt-BR') : new Date(item.created_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
                  {item.request}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
                }
