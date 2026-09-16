import React from 'react'
import { Link } from 'react-router-dom'
import * as Icons from './icons.jsx'

// Fallback de segurança para os ícones
const getItemIcon = (IconComponent, fallbackEmoji) => {
  if (IconComponent) return <IconComponent size={24} />
  return <span style={{ fontSize: '20px' }}>{fallbackEmoji}</span>
}

const ITEMS = [
  { to: '/', label: 'Início', Icon: Icons.HomeIcon, fallback: '🏠' },
  { to: '/biblia', label: 'Bíblia', Icon: Icons.BibleIcon, fallback: '📖' },
  { to: '/agenda', label: 'Agenda', Icon: Icons.CalendarIcon, fallback: '📅' },
  { to: '/cultos', label: 'Cultos', badge: 'AO VIVO', Icon: Icons.PlayBoxIcon, fallback: '📺' },
  { to: '/avisos', label: 'Avisos', Icon: Icons.MegaphoneIcon, fallback: '📢' },
  { to: '/oracao', label: 'Oração', Icon: Icons.PrayIcon, fallback: '🙏' },
  { to: '/estudos', label: 'Estudos / EBD', Icon: Icons.StudyIcon, fallback: '📚' },
  { to: '/louvores', label: 'Louvores', Icon: Icons.MusicIcon, fallback: '🎵' },
  { to: '/departamentos', label: 'Departamentos', Icon: Icons.PeopleIcon, fallback: '👥' },
  { to: '/localizacao', label: 'Localização', Icon: Icons.PinIcon, fallback: '📍' },
  { to: '/dizimos', label: 'Dízimos', Icon: Icons.HeartHandIcon, fallback: '❤️' },
  { to: '/contatos', label: 'Contatos', Icon: Icons.PhoneIcon, fallback: '📞' },
]

export default function QuickAccessGrid() {
  return (
    <section style={{ padding: '0 20px 24px 20px' }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: '16px'
      }}>
        Acesso Rápido
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px'
      }}>
        {ITEMS.map(({ to, label, Icon, fallback, badge }) => (
          <Link
            key={to + label}
            to={to}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 6px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              textDecoration: 'none',
              color: '#334155',
              border: '1px solid #f1f5f9',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              position: 'relative',
              textAlign: 'center',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            }}
          >
            {/* Badge Especial (ex: AO VIVO) */}
            {badge && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-2px',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                fontSize: '9px',
                fontWeight: '800',
                padding: '2px 6px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(239, 68, 68, 0.4)',
                letterSpacing: '0.5px'
              }}>
                {badge}
              </span>
            )}

            {/* Ícone */}
            <div style={{
              color: badge ? '#ef4444' : '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '6px'
            }}>
              {getItemIcon(Icon, fallback)}
            </div>

            {/* Rótulo */}
            <span style={{
              fontSize: '11px',
              fontWeight: '600',
              lineHeight: 1.2,
              wordBreak: 'break-word'
            }}>
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
