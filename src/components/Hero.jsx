import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MenuIcon, BellIcon } from './icons.jsx'
import { CHURCH } from '../lib/churchConfig.js'
import { useSiteSettings } from '../lib/useSiteSettings.js'

export default function Hero({ onOpenMenu }) {
  const { settings, loading } = useSiteSettings()
  
  // Fallbacks seguros de dados
  const logo = settings?.logo_url || CHURCH.logo
  const pastorPhoto = settings?.pastor_photo_url || CHURCH.pastor.photo
  const pastorName = settings?.pastor_name || CHURCH.pastor.name
  const pastorMessage = settings?.pastor_message || CHURCH.pastor.message

  // Trata falhas de carregamento de imagem em tempo de execução
  const handleImageError = (e, fallback) => {
    if (e.target.src !== fallback) {
      e.target.src = fallback
    }
  }

  return (
    <>
      <header style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)',
        color: '#ffffff',
        padding: '20px 20px 36px 20px',
        borderBottomLeftRadius: '24px',
        borderBottomRightRadius: '24px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
      }}>
        {/* Barra Superior de Ações */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button 
            onClick={onOpenMenu} 
            aria-label="Abrir menu"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)'
            }}
          >
            <MenuIcon size={20} />
          </button>

          <Link 
            to="/avisos" 
            aria-label="Notificações e Avisos"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              textDecoration: 'none',
              backdropFilter: 'blur(4px)'
            }}
          >
            <BellIcon size={20} />
          </Link>
        </div>

        {/* Marca & Identidade */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
          <img 
            src={logo} 
            alt={`Logo ${CHURCH.name}`} 
            onError={(e) => handleImageError(e, CHURCH.logo)}
            style={{ width: '52px', height: '52px', objectFit: 'contain', borderRadius: '8px' }}
          />
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '800', margin: 0, lineHeight: 1.2 }}>
              {CHURCH.nameLine1} <span style={{ color: '#60a5fa' }}>{CHURCH.nameLine2}</span>
            </h1>
          </div>
        </div>

        <p style={{ margin: 0, fontSize: '14px', opacity: 0.9, fontWeight: '400' }}>
          {CHURCH.tagline}
        </p>
      </header>

      {/* Card de Boas-Vindas do Pastor */}
      <div style={{
        margin: '-24px 20px 24px 20px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #f1f5f9',
        position: 'relative',
        zIndex: 10
      }}>
        <img 
          src={pastorPhoto} 
          alt={pastorName} 
          onError={(e) => handleImageError(e, CHURCH.pastor.photo)}
          style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid #2563eb' }}
        />
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 6px 0' }}>
            Bem-vindo!
          </h2>
          <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 10px 0', lineHeight: 1.5 }}>
            "{pastorMessage}"
          </p>
          <p style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: 0 }}>
            {pastorName}
          </p>
          <p style={{ fontSize: '12px', color: '#2563eb', margin: 0, fontWeight: '600' }}>
            {CHURCH.pastor.role}
          </p>
        </div>
      </div>
    </>
  )
}
