import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://anaquqpzagjpffpqeipm.supabase.co'
const SUPABASE_KEY = 'sb_publishable_ujMc_Ode9Lr6mVQAy3c6qQ__sO-4YRq'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
