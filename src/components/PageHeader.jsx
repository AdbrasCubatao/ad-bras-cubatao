import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PageHeader({ 
  title, 
  subtitle, 
  showBack = false, 
  action 
}) {
  const navigate = useNavigate()

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            aria-label="Voltar"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '6px',
              color: '#334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ←
          </button>
        )}

        <div>
          <h1 style={{ 
            fontSize: '20px', 
            fontWeight: '800', 
            color: '#0f172a', 
            margin: 0, 
            lineHeight: 1.2 
          }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ 
              fontSize: '13px', 
              color: '#64748b', 
              margin: '2px 0 0 0', 
              fontWeight: '500' 
            }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Botão de Ação Opcional à Direita */}
      {action && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {action}
        </div>
      )}
    </header>
  )
}
