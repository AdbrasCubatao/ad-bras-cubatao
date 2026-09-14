import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dizimos() {
  const navigate = useNavigate()
  const [copiado, setCopiado] = useState(false)

  // Chave PIX oficial da igreja
  const chavePix = "50.317.711/0001-62" 

  const copiarPix = () => {
    navigator.clipboard.writeText(chavePix)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 3000)
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      
      {/* Botão Voltar */}
      <div style={{ textAlign: 'left', marginBottom: '20px' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ padding: '8px 14px', background: '#4b5563', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ← Voltar ao Início
        </button>
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '8px' }}>Dízimos e Ofertas</h2>
      <p style={{ color: '#4b5563', marginBottom: '24px' }}>
        "Cada um contribua segundo propôs no seu coração; não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria." — 2 Co 9:7
      </p>

      {/* Cartão PIX */}
      <div style={{ backgroundColor: '#f9fafb', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 12px 0', color: '#2563eb' }}>Contribuição via PIX</h3>
        
        {/* Detalhes Bancários */}
        <div style={{ textAlignment: 'left', backgroundColor: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '16px', fontSize: '14px', color: '#374151' }}>
          <p style={{ margin: '4px 0' }}><strong>Banco:</strong> CORA SCD S.A.</p>
          <p style={{ margin: '4px 0' }}><strong>CNPJ:</strong> 50.317.711/0001-62</p>
        </div>

        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>Copie a chave abaixo para colar no seu aplicativo do banco:</p>
        
        {/* Campo da Chave */}
        <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '18px', color: '#1e40af', wordBreak: 'break-all', marginBottom: '16px' }}>
          {chavePix}
        </div>

        {/* Botão Copiar */}
        <button 
          onClick={copiarPix}
          style={{ backgroundColor: copiado ? '#16a34a' : '#2563eb', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', width: '100%', transition: '0.2s' }}
        >
          {copiado ? '✓ Chave PIX Copiada!' : 'Copiar Chave PIX'}
        </button>
      </div>

    </div>
  )
}
