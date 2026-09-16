import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient.js'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  // Verifica se o usuário já está autenticado ao carregar a página
  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        navigate('/admin')
      }
    }
    checkUser()
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      
      if (error) {
        setErrorMessage('Falha na autenticação: ' + error.message)
      } else {
        navigate('/admin')
      }
    } catch (err) {
      setErrorMessage('Ocorreu um erro inesperado ao tentar entrar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '24px', border: '1px solid #e2e8f0', borderRadius: '12px', fontFamily: 'sans-serif', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '20px', textAlign: 'center' }}>
        Login Administrativo
      </h2>

      {errorMessage && (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '10px 14px', borderRadius: '6px', fontSize: '14px', marginBottom: '16px' }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px', color: '#334155' }}>
            E-mail
          </label>
          <input 
            type="email" 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            placeholder="admin@igreja.com"
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px', color: '#334155' }}>
            Senha
          </label>
          <input 
            type="password" 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '12px', 
            background: loading ? '#93c5fd' : '#2563eb', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px', 
            fontWeight: 'bold', 
            fontSize: '15px', 
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {loading ? 'Autenticando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
