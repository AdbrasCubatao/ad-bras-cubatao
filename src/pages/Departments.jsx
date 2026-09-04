import React, { useState } from 'react'
import SimplePage from './SimplePage.jsx'

export default function Departments() {
  const [depSelecionado, setDepSelecionado] = useState(null)
  const [abaAtiva, setAbaAtiva] = useState('avisos')

  const departamentos = [
    {
      id: 'ujademc',
      nome: 'UJADEMC',
      subtitulo: 'Departamento de Jovens',
      icone: '🔥',
      lider: 'Liderança UJADEMC',
      posts: [
        {
          id: 1,
          categoria: 'avisos',
          titulo: 'Culto de Jovens UJADEMC',
          autor: 'Por: Liderança UJADEMC',
          data: 'Sábado • 19:30',
          imagem: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
          descricao: 'Venha participar do nosso culto especial. Muito louvor, comunhão e a Palavra de Deus para a juventude!'
        }
      ]
    },
    {
      id: 'geracao-teen',
      nome: 'GERAÇÃO TEEN',
      subtitulo: 'Departamento de Adolescentes',
      icone: '⚡',
      lider: 'Liderança Geração Teen',
      posts: [
        {
          id: 2,
          categoria: 'avisos',
          titulo: 'Encontro Geração Teen',
          autor: 'Por: Geração Teen',
          data: 'Sábado • 18:00',
          imagem: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
          descricao: 'Momento de dinamismo, estudo da Palavra e muita comunhão entre os adolescentes.'
        }
      ]
    },
    {
      id: 'cibec',
      nome: 'CIBEC',
      subtitulo: 'Departamento de Mulheres',
      icone: '🌸',
      lider: 'Liderança CIBEC',
      posts: [
        {
          id: 3,
          categoria: 'avisos',
          titulo: 'Círculo de Oração e Consagração',
          autor: 'Por: CIBEC',
          data: 'Terça e Quinta • 14:00',
          imagem: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=600&q=80',
          descricao: 'Unidas em intercessão pelas famílias, pela igreja e pelas causas impossíveis.'
        }
      ]
    },
    {
      id: 'univadem',
      nome: 'UNIVADEM',
      subtitulo: 'Departamento de Homens',
      icone: '🛡️',
      lider: 'Liderança UNIVADEM',
      posts: [
        {
          id: 4,
          categoria: 'avisos',
          titulo: 'Culto dos Varões e Oração',
          autor: 'Por: UNIVADEM',
          data: 'Quinta-feira • 19:30',
          imagem: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
          descricao: 'Homens de valor reunidos em oração e fortalecimento espiritual.'
        }
      ]
    },
    {
      id: 'minidemc',
      nome: 'MINIDEMC',
      subtitulo: 'Departamento Infantil',
      icone: '🎨',
      lider: 'Liderança MINIDEMC',
      posts: [
        {
          id: 5,
          categoria: 'avisos',
          titulo: 'Cultinho e Ensino Infantil',
          autor: 'Por: MINIDEMC',
          data: 'Domingos durante os cultos',
          imagem: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80',
          descricao: 'Ensino da Palavra de forma lúdica, acolhedora e divertida para nossas crianças.'
        }
      ]
    },
    {
      id: 'diaconal',
      nome: 'DIACONAL',
      subtitulo: 'Departamento dos Diáconos',
      icone: '🤝',
      lider: 'Corpo Diaconal',
      posts: [
        {
          id: 6,
          categoria: 'avisos',
          titulo: 'Escala do Corpo Diaconal',
          autor: 'Por: Liderança Diaconal',
          data: 'Semanal',
          imagem: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
          descricao: 'Servindo ao Senhor e à igreja com dedicação, ordem e amor em todos os cultos.'
        }
      ]
    }
  ]

  const conectarWhatsapp = (nomeDep) => {
    const mensagem = encodeURIComponent(`Paz do Senhor! Vi a página do departamento ${nomeDep} no app e gostaria de mais informações.`)
    window.open(`https://wa.me/5513999999999?text=${mensagem}`, '_blank')
  }

  // --- TELA 2: DETALHES DO DEPARTAMENTO (LAYOUT FEED) ---
  if (depSelecionado) {
    const postsFiltrados = depSelecionado.posts.filter(p => abaAtiva === 'todos' || p.categoria === abaAtiva)

    return (
      <SimplePage title={depSelecionado.nome} subtitle={depSelecionado.subtitulo}>
        <button
          onClick={() => { setDepSelecionado(null); setAbaAtiva('avisos'); }}
          style={{
            backgroundColor: '#edf2f7',
            color: '#2d3748',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          ← Voltar aos Departamentos
        </button>

        {/* Menu Superior de Ícones / Filtros */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#0a192f',
          borderRadius: '16px',
          padding: '10px 6px',
          marginBottom: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          {[
            { id: 'avisos', icon: '📢', label: 'Avisos' },
            { id: 'videos', icon: '🎵', label: 'Playlists' },
            { id: 'agenda', icon: '📅', label: 'Escala' },
            { id: 'todos', icon: '📰', label: 'Tudo' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setAbaAtiva(item.id)}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                color: abaAtiva === item.id ? '#d69e2e' : '#a0aec0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                fontSize: '11px',
                fontWeight: abaAtiva === item.id ? 'bold' : 'normal',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Feed de Publicações */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {postsFiltrados.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#718096', fontSize: '13px', padding: '20px 0' }}>
              Nenhuma publicação nesta categoria.
            </p>
          ) : (
            postsFiltrados.map(post => (
              <div
                key={post.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  border: '1px solid #edf2f7'
                }}
              >
                <img
                  src={post.imagem}
                  alt={post.titulo}
                  style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                />
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1a202c', margin: '0 0 4px 0' }}>
                    {post.titulo}
                  </h3>
                  <div style={{ fontSize: '11px', color: '#718096', marginBottom: '10px' }}>
                    {post.autor} • {post.data}
                  </div>
                  <p style={{ fontSize: '13px', color: '#4a5568', margin: 0, lineHeight: '1.4' }}>
                    {post.descricao}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Botão de Contato Direto via WhatsApp */}
        <button
          onClick={() => conectarWhatsapp(depSelecionado.nome)}
          style={{
            width: '100%',
            marginTop: '20px',
            backgroundColor: '#10b981',
            color: '#ffffff',
            border: 'none',
            borderRadius: '50px',
            padding: '12px',
            fontSize: '13px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          💬 Falar com a Liderança ({depSelecionado.nome})
        </button>
      </SimplePage>
    )
  }

  // --- TELA 1: LISTA GERAL DE DEPARTAMENTOS ---
  return (
    <SimplePage title="Departamentos" subtitle="Selecione um departamento para acessar o mural">
      <div style={{ display: 'grid', gap: '12px', padding: '8px 0' }}>
        {departamentos.map(dep => (
          <div
            key={dep.id}
            onClick={() => setDepSelecionado(dep)}
            style={{
              backgroundColor: '#0a192f',
              color: '#ffffff',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '26px' }}>{dep.icone}</span>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: 0, color: '#fff' }}>
                  {dep.nome}
                </h3>
                <p style={{ fontSize: '12px', color: '#a0aec0', margin: '2px 0 0 0' }}>
                  {dep.subtitulo}
                </p>
              </div>
            </div>
            <span style={{ fontSize: '16px', color: '#d69e2e' }}>➜</span>
          </div>
        ))}
      </div>
    </SimplePage>
  )
                  }
