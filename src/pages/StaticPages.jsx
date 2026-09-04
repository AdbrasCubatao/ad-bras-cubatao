import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SimplePage from './SimplePage.jsx'
import { CHURCH } from '../lib/churchConfig.js'
import { useSiteSettings } from '../lib/useSiteSettings.js'
import { QuizIcon, PeopleIcon, MusicIcon, PinIcon, HeartHandIcon, PhoneIcon, BibleIcon, PlayBoxIcon, StudyIcon } from '../components/icons.jsx'

export function BiblePage() {
  const abrirBiblia = () => {
    const appUrl = 'youversion://'
    const webUrl = 'https://www.bibliaonline.com.br/arc'
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

    if (isMobile) {
      window.location.href = appUrl
      setTimeout(() => {
        window.open(webUrl, '_blank', 'noopener,noreferrer')
      }, 1500)
    } else {
      window.open(webUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <SimplePage title="Bíblia" subtitle="Leitura da Palavra">
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        <p className="comment-text" style={{ marginBottom: '20px' }}>
          Acesse a Bíblia Sagrada (ARC) no seu aplicativo instalado ou pelo navegador.
        </p>
        <button
          onClick={abrirBiblia}
          className="btn-primary"
          style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: 'bold' }}
        >
          📖 Abrir Bíblia
        </button>
      </div>
    </SimplePage>
  )
}

export function CultosPage() {
  const { settings } = useSiteSettings()
  const youtube = settings.youtube_url || CHURCH.social.youtube
  return (
    <SimplePage title="Cultos" subtitle="Assista ao vivo ou revise cultos anteriores">
      <p className="comment-text">
        Os cultos ao vivo acontecem pelo nosso canal do YouTube.
      </p>
      <a href={youtube} target="_blank" rel="noreferrer" className="btn-primary btn-gold" style={{ display: 'block', textAlign: 'center' }}>
        Assistir no YouTube
      </a>
    </SimplePage>
  )
}

export function StudiesPage() {
  return (
    <SimplePage title="Estudos / EBD" subtitle="Materiais da Escola Bíblica Dominical">
      <p className="comment-text">Em breve: materiais de estudo para download, direto aqui no app.</p>
    </SimplePage>
  )
}

export function WorshipPage() {
  return (
    <SimplePage title="Louvores" subtitle="Playlist e letras dos louvores da igreja">
      <p className="comment-text">Em breve: playlist do ministério de louvor.</p>
    </SimplePage>
  )
}

export function LocationPage() {
  const { settings, loading } = useSiteSettings()
  const address = settings.address || CHURCH.contacts.address
  const hasRealAddress = !loading && settings.address
  return (
    <SimplePage title="Localização" subtitle="Venha nos visitar">
      <p className="comment-text">{address}</p>
      {!hasRealAddress && (
        <p className="comment-text" style={{ fontSize: 12, color: 'var(--ink-500)' }}>
          Endereço provisório — atualize em Admin → Configurações.
        </p>
      )}
      <a
        href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
        target="_blank" rel="noreferrer"
        className="btn-primary" style={{ display: 'block', textAlign: 'center' }}
      >
        Abrir no Google Maps
      </a>
    </SimplePage>
  )
}

export function TithesPage() {
  const [copiado, setCopiado] = useState(false)
  const chavePix = '50.317.711/0001-62'

  const copiarPix = () => {
    navigator.clipboard.writeText(chavePix)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 3000)
  }

  return (
    <div style={{ padding: '24px 16px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '8px' }}>🙌</div>
      <h2 style={{ color: '#0056b3', marginBottom: '8px', fontSize: '22px' }}>Dízimos e Ofertas</h2>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
        "Cada um contribua segundo propôs no seu coração; não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria." <br />
        <strong style={{ color: '#333' }}>2 Coríntios 9:7</strong>
      </p>

      {/* Card Principal - PIX */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        border: '1px solid #e9ecef', 
        borderRadius: '16px', 
        padding: '20px', 
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <span style={{ 
          backgroundColor: '#e7f0ff', 
          color: '#0056b3', 
          fontSize: '12px', 
          fontWeight: 'bold', 
          padding: '4px 12px', 
          borderRadius: '20px',
          textTransform: 'uppercase'
        }}>
          Chave PIX (CNPJ)
        </span>

        <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', margin: '16px 0 12px 0', wordBreak: 'break-all' }}>
          {chavePix}
        </p>

        <button
          onClick={copiarPix}
          style={{
            backgroundColor: copiado ? '#28a745' : '#0056b3',
            color: '#fff',
            padding: '14px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          {copiado ? '✓ Chave PIX Copiada!' : '📋 Copiar Chave PIX'}
        </button>
      </div>

      {/* Card Secundário - Dados da Conta */}
      <div style={{ border: '1px solid #eee', borderRadius: '16px', padding: '16px', textAlign: 'left', backgroundColor: '#fff' }}>
        <h4 style={{ color: '#333', marginTop: 0, marginBottom: '12px', fontSize: '15px' }}>Dados da Conta</h4>
        <div style={{ color: '#555', fontSize: '14px', lineHeight: '1.6' }}>
          <p style={{ margin: '4px 0' }}><strong>Favorecido:</strong> AD Brás Cubatão</p>
          <p style={{ margin: '4px 0' }}><strong>Banco:</strong> CORA SCD S.A.</p>
          <p style={{ margin: '4px 0' }}><strong>CNPJ:</strong> 50.317.711/0001-62</p>
        </div>
      </div>
    </div>
  )
}

export function ContactsPage() {
  const { settings } = useSiteSettings()
  const phone = settings.phone || CHURCH.contacts.phone
  const whatsapp = settings.whatsapp_url || CHURCH.social.whatsapp
  return (
    <SimplePage title="Contatos" subtitle="Fale com a nossa igreja">
      <p className="comment-text">Telefone: {phone}</p>
      <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-primary btn-gold" style={{ display: 'block', textAlign: 'center' }}>
        Chamar no WhatsApp
      </a>
    </SimplePage>
  )
}

export function MorePage() {
  const links = [
    { to: '/quiz', label: 'Quiz Bíblico', Icon: QuizIcon },
    { to: '/departamentos', label: 'Departamentos', Icon: PeopleIcon },
    { to: '/louvores', label: 'Louvores', Icon: MusicIcon },
    { to: '/estudos', label: 'Estudos / EBD', Icon: StudyIcon },
    { to: '/cultos', label: 'Cultos', Icon: PlayBoxIcon },
    { to: '/biblia', label: 'Bíblia', Icon: BibleIcon },
    { to: '/localizacao', label: 'Localização', Icon: PinIcon },
    { to: '/dizimos', label: 'Dízimos e Ofertas', Icon: HeartHandIcon },
    { to: '/contatos', label: 'Contatos', Icon: PhoneIcon },
  ]
  return (
    <SimplePage title="Mais">
      <div style={{ display: 'grid', gap: 10 }}>
        {links.map(({ to, label, Icon }) => (
          <Link key={to} to={to} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0' }}>
            <Icon style={{ width: 20, height: 20, color: 'var(--navy-800)' }} />
            <span style={{ fontWeight: 600, fontSize: 14 }}>{label}</span>
          </Link>
        ))}
      </div>
    </SimplePage>
  )
}
