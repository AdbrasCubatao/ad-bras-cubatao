import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://anaquqpzagjpffpqeipm.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tZXRnZXdwbWFxZHhkd3N6bXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyODM5NjEsImV4cCI6MjEwMzg1OTk2MX0.3TrxxYzNwn8jvC1S1HocRNhCCC2o82HpQIgiuKmwna8'
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
