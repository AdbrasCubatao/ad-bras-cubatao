import React from 'react'
import * as Icons from './icons.jsx'
import { CHURCH } from '../lib/churchConfig.js'
import { useSiteSettings } from '../lib/useSiteSettings.js'

// Helper seguro para renderizar ícones com fallback
const renderSocialIcon = (IconComponent, fallbackEmoji) => {
  if (IconComponent) return <IconComponent size={22} style={{ color: '#ffffff' }} />
  return <span style={{ fontSize: '18px' }}>{fallbackEmoji}</span>
}

export function VerseBanner() {
  const { settings } = useSiteSettings()
  const text = settings?.verse_text || CHURCH.verseOfTheDay?.text || 'O Senhor é o meu pastor, nada me faltará.'
  const reference = settings?.verse_reference || CHURCH.verseOfTheDay?.reference || 'Salmos 23:1'

  return (
    <div style={{ padding: '0 20px 24px 20px' }}>
      <div style={{
        backgroundColor: '#f8fafc',
        borderLeft: '4px solid #2563eb',
        borderRadius: '12px',
        padding: '16px 20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
        borderTop: '1px solid #f1f5f9',
        borderRight: '1px solid #f1f5f9',
        borderBottom: '1px solid #f1f5f9'
      }}>
        <p style={{
          margin: '0 0 8px 0',
          fontSize: '14px',
          fontStyle: 'italic',
          color: '#334155',
          lineHeight: 1.5,
          fontWeight: '500'
        }}>
          "{text}"
        </p>
        <p style={{
          margin: 0,
          fontSize: '12px',
          fontWeight: '700',
          color: '#2563eb',
          textAlign: 'right',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {reference}
        </p>
      </div>
    </div>
  )
}

export function SocialLinks() {
  const { settings } = useSiteSettings()

  const rawLinks = [
    { 
      href: settings?.whatsapp_url || CHURCH.social?.whatsapp, 
      Icon: Icons.WhatsAppIcon, 
      color: '#25D366', 
      label: 'WhatsApp',
      fallback: '💬'
    },
    { 
      href: settings?.instagram_url || CHURCH.social?.instagram, 
      Icon: Icons.InstagramIcon, 
      color: '#C13584', 
      label: 'Instagram',
      fallback: '📸'
    },
    { 
      href: settings?.youtube_url || CHURCH.social?.youtube, 
      Icon: Icons.YoutubeIcon, 
      color: '#FF0000', 
      label: 'YouTube',
      fallback: '▶️'
    },
    { 
      href: settings?.facebook_url || CHURCH.social?.facebook, 
      Icon: Icons.FacebookIcon, 
      color: '#1877F2', 
      label: 'Facebook',
      fallback: '📘'
    },
  ]

  // Filtra apenas os links que possuem URL válida cadastrada
  const validLinks = rawLinks.filter(link => Boolean(link.href && link.href.trim() !== ''))

  if (validLinks.length === 0) return null

  return (
    <div style={{ padding: '0 20px 24px 20px', textAlign: 'center' }}>
      <p style={{
        fontSize: '13px',
        fontWeight: '700',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.8px',
        marginBottom: '12px'
      }}>
        Conecte-se conosco
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px'
      }}>
        {validLinks.map(({ href, Icon, color, label, fallback }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              backgroundColor: color,
              borderRadius: '50%',
              textDecoration: 'none',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.12)',
              transition: 'transform 0.15s ease, opacity 0.15s ease'
            }}
          >
            {renderSocialIcon(Icon, fallback)}
          </a>
        ))}
      </div>
    </div>
  )
}
