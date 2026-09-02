import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient.js'

// Busca a tabela `site_settings` (key/value) e devolve um objeto simples.
// Usado para permitir que o admin sobrescreva textos/fotos padrão do app
// sem precisar mexer no código.
export function useSiteSettings() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    async function load() {
      const { data, error } = await supabase.from('site_settings').select('*')
      if (!active) return
      if (!error && data) {
        const map = {}
        data.forEach((row) => { map[row.key] = row.value })
        setSettings(map)
      }
      setLoading(false)
    }
    load()
    return () => { active = false }
  }, [])

  return { settings, loading }
}
