import { createClient } from '@supabase/supabase-js'

let supabase;

try {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or Anon Key is missing')
  }

  supabase = createClient(supabaseUrl, supabaseAnonKey)
} catch (error) {
  console.error('Error initializing Supabase client:', error)
}

export { supabase }
