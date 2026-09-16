import { useEffect, useState, useCallback } from 'react'
import { supabase } from './supabase.js'

export function useSiteSettings() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadSettings = useCallback(async (isMounted = true) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('site_settings')
        .select('key, value')

      if (!isMounted) return

      if (fetchError) {
        throw fetchError
      }

      if (data) {
        // Converte a lista de linhas [{key: 'logo_url', value: '...'}] em um objeto simples { logo_url: '...' }
        const settingsMap = data.reduce((acc, row) => {
          acc[row.key] = row.value
          return acc
        }, {})

        setSettings(settingsMap)
      }
    } catch (err) {
      console.error('Erro ao carregar configurações do site:', err)
      if (isMounted) setError(err)
    } finally {
      if (isMounted) setLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true
    loadSettings(active)

    return () => {
      active = false
    }
  }, [loadSettings])

  return { settings, loading, error, refetch: () => loadSettings(true) }
}

export default useSiteSettings
