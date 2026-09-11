import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

export default function AdminStudies() {
  const [estudos, setEstudos] = useState([])
  const [novoEstudo, setNovoEstudo] = useState({
    titulo: '',
    categoria: 'EBD - Adultos',
    capa: '',
    link: ''
  })

  const carregarEstudos = async () => {
    const { data, error } = await supabase
      .from('estudos')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) setEstudos(data)
  }

  useEffect(() => {
    carregarEstudos()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!novoEstudo.titulo || !novoEstudo.link) return alert('Preencha os campos obrigatórios!')

    const { error } = await supabase
      .from('estudos')
      .insert([novoEstudo])

    if (error) {
      alert('Erro ao cadastrar estudo!')
    } else {
      setNovoEstudo({ titulo: '', categoria: 'EBD - Adultos', capa: '', link: '' })
      alert('Estudo cadastrado com sucesso!')
      carregarEstudos()
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Deseja excluir este estudo?')) {
      await supabase.from('estudos').delete().eq('id', id)
      carregarEstudos()
    }
  }

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ color: '#0a192f', marginBottom: '16px' }}>Gerenciar Estudos & EBD</h2>

      {/* Formulário de Cadastro */}
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#f7fafc', padding: '16px', borderRadius: '12px', display: 'grid', gap: '10px', marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Título do Estudo (Ex: Lição 1 - Fé)"
          value={novoEstudo.titulo}
          onChange={e => setNovoEstudo({ ...novoEstudo, titulo: e.target.value })}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
          required
        />
        <select
          value={novoEstudo.categoria}
          onChange={e => setNovoEstudo({ ...novoEstudo, categoria: e.target.value })}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        >
          <option value="EBD - Adultos">EBD - Adultos</option>
          <option value="EBD - Jovens">EBD - Jovens</option>
          <option value="EBD - Kids">EBD - Kids</option>
          <option value="Curso Teológico">Curso Teológico</option>
        </select>
        <input
          type="url"
          placeholder="URL da Foto de Capa (Link da imagem)"
          value={novoEstudo.capa}
          onChange={e => setNovoEstudo({ ...novoEstudo, capa: e.target.value })}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <input
          type="url"
          placeholder="Link do Material (PDF / Google Drive)"
          value={novoEstudo.link}
          onChange={e => setNovoEstudo({ ...novoEstudo, link: e.target.value })}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
          required
        />
        <button type="submit" style={{ backgroundColor: '#10b981', color: '#fff', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
          ➕ Cadastrar Novo Estudo
        </button>
      </form>

      {/* Lista de Publicações no Painel */}
      <h3 style={{ fontSize: '16px', color: '#0a192f' }}>Materiais Publicados</h3>
      <div style={{ display: 'grid', gap: '10px' }}>
        {estudos.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
            <div>
              <strong style={{ fontSize: '14px', display: 'block' }}>{item.titulo}</strong>
              <small style={{ color: '#718096' }}>📥 {item.downloads || 0} downloads • {item.categoria}</small>
            </div>
            <button onClick={() => handleDelete(item.id)} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  )
                                        }
