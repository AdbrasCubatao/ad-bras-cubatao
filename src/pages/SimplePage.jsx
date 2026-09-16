import React from 'react'

export default function SimplePage({ title, subtitle, customTitle, children }) {
  const hasHeader = customTitle || title || subtitle

  return (
    <main style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', paddingBottom: '80px' }}>
      {/* Renderiza o cabeçalho apenas se houver algum conteúdo definido */}
      {hasHeader && (
        <header style={{ marginBottom: '16px' }}>
          {customTitle ? (
            customTitle
          ) : (
            <>
              {title && <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: '#0a192f', margin: 0 }}>{title}</h1>}
              {subtitle && <p style={{ fontSize: '13px', color: '#718096', margin: '4px 0 0 0' }}>{subtitle}</p>}
            </>
          )}
        </header>
      )}

      {children}
    </main>
  )
}
