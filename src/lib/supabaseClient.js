import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ometgewpmaqdxdwszmqs.supabase.co'
const supabaseAnonKey = 'sb_publishable_lkEnwuRJ3LR4xM9IRY3SAQ_oTI9Impf'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
