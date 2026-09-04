import React from 'react'

export default function SimplePage({ title, subtitle, customTitle, children }) {
  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', paddingBottom: '80px' }}>
      {/* Cabeçalho Customizado ou Padrão */}
      <div style={{ marginBottom: '16px' }}>
        {customTitle ? (
          customTitle
        ) : (
          <>
            {title && <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: '#0a192f', margin: 0 }}>{title}</h1>}
            {subtitle && <p style={{ fontSize: '13px', color: '#718096', margin: '4px 0 0 0' }}>{subtitle}</p>}
          </>
        )}
      </div>

      {children}
    </div>
  )
}
