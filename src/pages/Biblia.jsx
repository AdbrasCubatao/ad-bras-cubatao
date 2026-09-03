import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Biblia() {
  const [livros, setLivros] = useState([])
  const [livroSelecionado, setLivroSelecionado] = useState(1)
  const [capitulo, setCapitulo] = useState(1)
  const [versiculos, setVersiculos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function carregarLivros() {
      const { data, error } = await supabase
        .from('biblia_livros')
        .select('*')
        .order('id')
      if (!error && data) setLivros(data)
    }
    carregarLivros()
  }, [])

  useEffect(() => {
    async function carregarCapitulo() {
      setLoading(true)
      const { data, error } = await supabase
        .from('biblia_versiculos')
        .select('*')
        .eq('livro_id', livroSelecionado)
        .eq('capitulo', capitulo)
        .order('versiculo')

      if (!error) {
        setVersiculos(data || [])
      }
      setLoading(false)
    }
    carregarCapitulo()
  }, [livroSelecionado, capitulo])

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: '#1a1a1a' }}>
      <h1 style={{ textAlign: 'center', color: '#002B49', marginBottom: '20px' }}>Bíblia Sagrada</h1>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '25px' }}>
        <select 
          value={livroSelecionado} 
          onChange={(e) => {
            setLivroSelecionado(Number(e.target.value))
            setCapitulo(1)
          }}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px' }}
        >
          {livros.map((l) => (
            <option key={l.id} value={l.id}>{l.nome}</option>
          ))}
        </select>

        <input 
          type="number" 
          value={capitulo} 
          min="1" 
          onChange={(e) => setCapitulo(Number(e.target.value))} 
          style={{ width: '70px', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', textAlign: 'center', fontSize: '16px' }}
        />
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#666' }}>Carregando capítulo...</p>
      ) : (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          {versiculos.length > 0 ? (
            versiculos.map((v) => (
              <p key={v.id} style={{ marginBottom: '12px', lineHeight: '1.7', fontSize: '17px' }}>
                <strong style={{ color: '#002B49', marginRight: '6px' }}>{v.versiculo}.</strong>
                {v.texto}
              </p>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#888' }}>
              Nenhum versículo encontrado para este capítulo ainda.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
