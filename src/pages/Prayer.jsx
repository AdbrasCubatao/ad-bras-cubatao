import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import supabaseClient, { supabase as supabaseNamed } from '../lib/supabaseClient.js'

const client = supabaseClient || supabaseNamed

export default function Prayer() {
  const navigate = useNavigate()
  const [prayers, setPrayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    request_date: new Date().toISOString().split('T')[0],
    request: ''
  })

  useEffect(() => {
    fetchPrayers()
  }, [])

  const fetchPrayers = async () => {
    try {
      setLoading(true)
      
      // Data limite: exatamente 30 dias atrás
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const dateString = thirtyDaysAgo.toISOString().split('T')[0]

      const { data, error } = await client
        .from('prayer_requests')
        .select('*')
        .gte('request_date', dateString)
        .order('request_date', { ascending: false })

      if (error) throw error
      setPrayers(data || [])
    } catch (err) {
      console.error('Erro ao buscar pedidos:', err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const { error } = await client.from('prayer_requests').insert([formData])
      if (error) throw error

      alert('Seu pedido de oração foi enviado com sucesso!')
      setFormData({
        name: '',
        request_date: new Date().toISOString().split('T')[0],
        request: ''
      })
      fetchPrayers()
    } catch (err) {
      alert('Erro ao enviar pedido: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Botão Voltar */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ padding: '8px 14px', background: '#4b5563', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ← Voltar ao Início
        </button>
      </div>

      <h2 style={{ color: '#1f2937', textAlign: 'center', marginBottom: '8px' }}>Pedidos de Oração</h2>
      <p style={{ color: '#4b5563', textAlign: 'center', marginBottom: '24px', fontSize: '14px' }}>
        "Orai uns pelos outros..." — Tiago 5:16 <br />
        <em>(Os pedidos ficam publicados no mural por 30 dias)</em>
      </p>

      {/* Form de Envio */}
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '32px' }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#2563eb' }}>Enviar Pedido de Oração</h3>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px', fontSize: '14px' }}>Seu Nome / Nome de quem precisa:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Ex: Maria da Silva"
            required 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} 
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px', fontSize: '14px' }}>Data do Pedido:</label>
          <input 
            type="date" 
            name="request_date" 
            value={formData.request_date} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} 
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px', fontSize: '14px' }}>Relato / Pedido de Oração:</label>
          <textarea 
            name="request" 
            value={formData.request} 
            onChange={handleChange} 
            rows="4" 
            placeholder="Escreva aqui pelo que devemos orar..."
            required 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} 
          />
        </div>

        <button 
          type="submit" 
          disabled={submitting}
          style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
        >
          {submitting ? 'Enviando...' : 'Enviar Pedido de Oração'}
        </button>
      </form>

      {/* Mural de Pedidos Recentes */}
      <h3 style={{ color: '#1f2937', marginBottom: '16px' }}>Mural de Oração (Últimos 30 Dias)</h3>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#6b7280' }}>Carregando pedidos...</p>
      ) : prayers.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6b7280', padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
          Nenhum pedido de oração cadastrado nos últimos 30 dias.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {prayers.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <strong style={{ color: '#111827', fontSize: '16px' }}>🙏 {item.name}</strong>
                <span style={{ fontSize: '12px', color: '#6b7280', backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '12px' }}>
                  {item.request_date ? new Date(item.request_date + 'T00:00:00').toLocaleDateString('pt-BR') : ''}
                </span>
              </div>
              <p style={{ margin: 0, color: '#374151', fontSize: '15px', whiteSpace: 'pre-line' }}>{item.request}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
