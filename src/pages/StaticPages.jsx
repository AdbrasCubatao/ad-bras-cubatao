import React from 'react'
import { useParams } from 'react-router-dom'

export default function StaticPages() {
  const { slug } = useParams()

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', textTransform: 'capitalize' }}>
        {slug ? slug.replace('-', ' ') : 'Página Informativa'}
      </h1>
      <p style={{ marginTop: '12px', color: '#475569' }}>
        Conteúdo em desenvolvimento.
      </p>
    </div>
  )
}
