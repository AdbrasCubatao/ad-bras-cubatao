import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function Biblia() {
  const [livros, setLivros] = useState([])
  const [livroSelecionado, setLivroSelecionado] = useState(1) // Gênesis como padrão
  const [capitulo, setCapitulo] = useState(1)
  const [versiculoAlvo, setVersiculoAlvo] = useState('')
  const [versiculos, setVersiculos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [busca, setBusca] = useState('')
  const [resultadosBusca, setResultadosBusca] = useState([])

  // Carrega a lista de 66 livros
  useEffect(() => {
    async function fetchLivros() {
      const { data } = await supabase.from('biblia_livros').select('*').order('id')
      if (data) setLivros(data)
    }
    fetchLivros()
  }, [])

  // Carrega os versículos do livro e capítulo selecionados
  useEffect(() => {
    async function fetchVersiculos() {
      setCarregando(true)
      const { data } = await supabase
        .from('biblia_versiculos')
        .select('*')
        .eq('livro_id', livroSelecionado)
        .eq('capitulo', capitulo)
        .order('versiculo')

      setVersiculos(data || [])
      setCarregando(false)
    }
    fetchVersiculos()
  }, [livroSelecionado, capitulo])

  // Função de busca por palavra-chave
  const handleBusca = async (e) => {
    e.preventDefault()
    if (!busca.trim()) return
    setCarregando(true)

    const { data } = await supabase
      .from('biblia_versiculos')
      .select('*, biblia_livros(nome)')
      .ilike('texto', `%${busca}%`)
      .limit(30)

    setResultadosBusca(data || [])
    setCarregando(false)
  }

  // Rola até o versículo selecionado
  const IrParaVersiculo = (num) => {
    setVersiculoAlvo(num)
    const el = document.getElementById(`v-${num}`)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const livroAtualObj = livros.find(l => l.id === Number(livroSelecionado))
  const totalCapitulos = livroAtualObj ? livroAtualObj.capitulos : 50

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', color: '#333' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Bíblia Sagrada</h2>

      {/* Barra de Busca */}
      <form onSubmit={handleBusca} style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="Buscar palavra na Bíblia..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 16px', background: '#1e3a8a', color: '#fff', borderRadius: '8px', border: 'none' }}>
          Buscar
        </button>
      </form>

      {/* Estrutura de Navegação: Livro, Capítulo, Versículo */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px', marginBottom: '20px' }}>
        {/* Seletor 1: Livro */}
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Livro</label>
          <select
            value={livroSelecionado}
            onChange={(e) => { setLivroSelecionado(Number(e.target.value)); setCapitulo(1); setResultadosBusca([]); }}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
          >
            {livros.map(l => (
              <option key={l.id} value={l.id}>{l.nome}</option>
            ))}
          </select>
        </div>

        {/* Seletor 2: Capítulo */}
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Capítulo</label>
          <select
            value={capitulo}
            onChange={(e) => { setCapitulo(Number(e.target.value)); setResultadosBusca([]); }}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
          >
            {Array.from({ length: totalCapitulos }, (_, i) => i + 1).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Seletor 3: Versículo (Navegação Rápida) */}
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Versículo</label>
          <select
            value={versiculoAlvo}
            onChange={(e) => IrParaVersiculo(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
          >
            <option value="">Ir para...</option>
            {versiculos.map(v => (
              <option key={v.id} value={v.versiculo}>{v.versiculo}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Resultados de Busca */}
      {resultadosBusca.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Resultados da Busca:</h3>
          <button onClick={() => setResultadosBusca([])} style={{ fontSize: '12px', color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Limpar busca</button>
          {resultadosBusca.map(r => (
            <div key={r.id} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <strong>{r.biblia_livros?.nome} {r.capitulo}:{r.versiculo}</strong> - {r.texto}
            </div>
          ))}
        </div>
      )}

      {/* Leitura do Capítulo */}
      {resultadosBusca.length === 0 && (
        <div>
          {carregando ? (
            <p>Carregando versículos...</p>
          ) : (
            versiculos.map(v => (
              <p key={v.id} id={`v-${v.versiculo}`} style={{ marginBottom: '12px', lineHeight: '1.6' }}>
                <strong style={{ color: '#1e3a8a', marginRight: '6px' }}>{v.versiculo}</strong>
                {v.texto}
              </p>
            ))
          )}
        </div>
      )}
    </div>
  )
        }
                
