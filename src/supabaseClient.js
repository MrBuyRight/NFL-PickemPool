import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://grnjclpmqlawncskxhqf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdybmpjbHBtcWxhd25jc2t4aHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMjI4NTUsImV4cCI6MjA0MDg5ODg1NX0.tBAWOEnq2rEOoWF976tvdcqy2spZUDzQXqlat_XtPMo'

export const supabase = createClient(supabaseUrl, supabaseKey)