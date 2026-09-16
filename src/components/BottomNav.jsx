import React from 'react'
import { NavLink } from 'react-router-dom'
import * as Icons from './icons.jsx'

// Mapeamento dos icones com fallback seguro
const TABS = [
  { to: '/', label: 'Inicio', Icon: Icons.HomeIcon || (() => <span>🏠</span>), end: true },
  { to: '/bíblia', label: 'Bíblia', Icon: Icons.BibleIcon || (() => <span>📖</span>) },
  { to: '/agenda', label: 'Agenda', Icon: Icons.CalendarIcon || (() => <span>📅</span>) },
  { to: '/avisos', label: 'Avisos', Icon: Icons.MegaphoneIcon || (() => <span>📢</span>) },
  { to: '/mais', label: 'Mais', Icon: Icons.MoreIcon || (() => <span>⚙️</span>) },
]

export default function BottomNav() {
  return (
    <>
      {/* Spacer para garantir que o conteúdo final da página não fique oculto atrás da nav */}
      <div style={{ height: '70px' }} />

      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 1000,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)', // Suporte ao notch/linha inferior do iOS
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)'
      }}>
        {TABS.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            style={({ isActive }) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              height: '100%',
              textDecoration: 'none',
              fontSize: '11px',
              fontWeight: isActive ? '700' : '500',
              color: isActive ? '#2563eb' : '#64748b',
              transition: 'color 0.2s ease',
              gap: '4px'
            })}
          >
            {({ isActive }) => (
              <>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.2s ease'
                }}>
                  <Icon active={isActive} size={22} />
                </div>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
