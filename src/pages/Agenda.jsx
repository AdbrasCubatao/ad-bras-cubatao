import React, { useState } from 'react'
import SimplePage from './SimplePage.jsx'

export default function Agenda() {
  const [filtro, setFiltro] = useState('todos')

  const eventos = [
    {
      id: 1,
      dia: 'Domingo',
      data: 'Semanal',
      hora: '09:00',
      titulo: 'Escola Bíblica Dominical (EBD)',
      categoria: 'ensino',
      local: 'Templo Sede',
      descricao: 'Estudo aprofundado da Palavra para todas as idades.'
    },
    {
      id: 2,
      dia: 'Domingo',
      data: 'Semanal',
      hora: '18:30',
      titulo: 'Culto da Família e Celebração',
      categoria: 'culto',
      local: 'Templo Sede',
      descricao: 'Momento de adoração, louvor e pregação da Palavra em família.'
    },
    {
      id: 3,
      dia: 'Terça-feira',
      data: 'Semanal',
      hora: '19:30',
      titulo: 'Culto de Doutrina e Ensino',
      categoria: 'ensino',
      local: 'Templo Sede',
      descricao: 'Aprofundamento nas doutrinas bíblicas e crescimento espiritual.'
    },
    {
      id: 4,
      dia: 'Quinta-feira',
      data: 'Semanal',
      hora: '19:30',
      titulo: 'Culto da Vitória e Libertação',
      categoria: 'culto',
      local: 'Templo Sede',
      descricao: 'Campanhas de oração, busca do Espírito Santo e milagres.'
    },
    {
      id: 5,
      dia: 'Sábado',
      data: '1º Sábado do Mês',
      hora: '19:00',
      titulo: 'Culto de Jovens (UMADEC)',
      categoria: 'jovens',
      local: 'Templo Sede',
      descricao: 'Comunhão, louvor dinâmico e palavra direcionada à juventude.'
    },
    {
      id: 6,
      dia: 'Sábado',
      data: '3º Sábado do Mês',
      hora: '19:00',
      titulo: 'Culto do Círculo de Oração',
      categoria: 'oracao',
      local: 'Templo Sede',
      descricao: 'Grande clamor e louvor com o departamento de irmãs.'
    }
  ]

  const eventosFiltrados = filtro === 'todos' 
    ? eventos 
    : eventos.filter(ev => ev.categoria === filtro)

  return (
    <SimplePage title="Agenda" subtitle="Nossos cultos e programação geral">
      {/* Filtros em Botões Pill */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        overflowX: 'auto', 
        paddingBottom: '12px',
        marginBottom: '16px',
        scrollbarWidth: 'none'
      }}>
        {[
          { key: 'todos', label: 'Todos' },
          { key: 'culto', label: '⛪ Cultos' },
          { key: 'ensino', label: '📖 EBD & Doutrina' },
          { key: 'jovens', label: '🔥 Jovens' },
          { key: 'oracao', label: '🙏 Oração' },
        ].map(item => (
          <button
            key={item.key}
            onClick={() => setFiltro(item.key)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: filtro === item.key ? '#0a192f' : '#f0f4f8',
              color: filtro === item.key ? '#ffffff' : '#4a5568',
              fontSize: '13px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Lista de Cards da Agenda */}
      <div style={{ display: 'grid', gap: '14px' }}>
        {eventosFiltrados.map(ev => (
          <div
            key={ev.id}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              border: '1px solid #edf2f7',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            {/* Cabeçalho do Card: Dia e Horário */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                backgroundColor: '#ebf8ff',
                color: '#2b6cb0',
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '4px 10px',
                borderRadius: '8px'
              }}>
                📅 {ev.dia} • {ev.data}
              </span>
              <span style={{
                backgroundColor: '#feebc8',
                color: '#c05621',
                fontSize: '13px',
                fontWeight: 'bold',
                padding: '4px 10px',
                borderRadius: '8px'
              }}>
                ⏰ {ev.hora}
              </span>
            </div>

            {/* Título e Descrição */}
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1a202c', margin: '4px 0 2px 0' }}>
              {ev.titulo}
            </h3>
            <p style={{ fontSize: '13px', color: '#718096', margin: 0, lineHeight: '1.4' }}>
              {ev.descricao}
            </p>

            {/* Rodapé do Card: Local */}
            <div style={{ 
              marginTop: '6px', 
              paddingTop: '8px', 
              borderTop: '1px dashed #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: '#4a5568',
              fontWeight: '500'
            }}>
              📍 <span>{ev.local}</span>
            </div>
          </div>
        ))}
      </div>
    </SimplePage>
  )
}
