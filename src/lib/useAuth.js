import { useEffect, useState } from 'react'
import { supabase } from './supabase.js'

export function useAuth() {
  // undefined = carregando inicial; null = não autenticado; object = autenticado
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    let isMounted = true

    // 1. Obtém a sessão inicial armazenada
    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) {
        setSession(data.session ?? null)
      }
    })

    // 2. Escuta mudanças no estado de autenticação (Login, Logout, Token Refreshed)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (isMounted) {
        setSession(currentSession ?? null)
      }
    })

    return () => {
      isMounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return { 
    session, 
    user: session?.user ?? null,
    loading: session === undefined,
    signOut
  }
}

export default useAuth
