import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL ?? '').trim()
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim()

let client

try {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('missing env vars')
  }
  client = createClient(supabaseUrl, supabaseAnonKey)
} catch (err) {
  console.error('Supabase nao configurado corretamente.', err)
  const notConfigured = async () => ({
    data: null,
    error: new Error('Supabase nao configurado'),
  })
  const chain = {
    select: () => chain,
    insert: notConfigured,
    delete: () => chain,
    eq: () => chain,
    order: () => chain,
    limit: () => chain,
    upsert: notConfigured,
    then: (resolve) => resolve({ data: [], error: new Error('Supabase nao configurado') }),
  }
  client = {
    from: () => chain,
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
      signInWithPassword: notConfigured,
      signOut: async () => ({ error: null }),
    },
  }
}

export const supabase = client
