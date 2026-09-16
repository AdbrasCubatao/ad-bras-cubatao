import React from 'react'
import { useParams, Link } from 'react-router-dom'

// Dicionário de conteúdos das páginas estáticas
const PAGES_CONTENT = {
  'sobre-nos': {
    title: 'Sobre Nós',
    content: (
      <>
        <p>Bem-vindo à nossa comunidade! Somos uma igreja dedicada a compartilhar o amor de Deus, cultivar a comunhão e servir ao próximo.</p>
        <p style={{ marginTop: '12px' }}>Nossa missão é pregar o Evangelho e proporcionar um ambiente acolhedor para todas as famílias.</p>
      </>
    )
  },
  'historia': {
    title: 'Nossa História',
    content: (
      <p>Fundada com o propósito de impactar vidas, nossa trajetória é marcada por fé, oração e trabalho comunitário ao longo dos anos.</p>
    )
  },
  'declaracao-de-fe': {
    title: 'Declaração de Fé',
    content: (
      <ul>
        <li>Cremos na Bíblia Sagrada como a Palavra de Deus inspirada.</li>
        <li>Cremos em Deus Pai, Filho e Espírito Santo.</li>
        <li>Cremos na salvação pela graça por meio da fé em Jesus Cristo.</li>
      </ul>
    )
  }
}

export default function StaticPages() {
  const { slug } = useParams()
  const pageData = slug ? PAGES_CONTENT[slug] : null

  // Trata a formatação visual do título para páginas sem cadastro prévio no dicionário
  const fallbackTitle = slug 
    ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Página Informativa'

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '16px' }}>
        {pageData ? pageData.title : fallbackTitle}
      </h1>

      <div style={{ color: '#334155', lineHeight: '1.6' }}>
        {pageData ? (
          pageData.content
        ) : (
          <div>
            <p style={{ color: '#64748b' }}>
              Esta página está em desenvolvimento ou o conteúdo solicitado não foi encontrado.
            </p>
            <Link 
              to="/" 
              style={{ 
                display: 'inline-block', 
                marginTop: '16px', 
                color: '#2563eb', 
                textDecoration: 'none', 
                fontWeight: 'bold' 
              }}
            >
              ← Voltar para o início
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
