import { createClient } from '@supabase/supabase-js'

let supabase = null

try {
  const supabaseUrl = 'https://grnjclpmqlawncskxhqf.supabase.co'
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdybmpjbHBtcWxhd25jc2t4aHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMjI4NTUsImV4cCI6MjA0MDg5ODg1NX0.tBAWOEnq2rEOoWF976tvdcqy2spZUDzQXqlat_XtPMo'

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or Anon Key is missing')
  }

  supabase = createClient(supabaseUrl, supabaseAnonKey)
  console.log('Supabase client created successfully')
} catch (error) {
  console.error('Error initializing Supabase client:', error)
}

export { supabase }
