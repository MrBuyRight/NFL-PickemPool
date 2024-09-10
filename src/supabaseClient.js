let supabase = null;

async function initSupabase() {
  if (supabase) return supabase;

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase URL or Anon Key is missing');
    }

    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase client created successfully');
  } catch (error) {
    console.error('Error initializing Supabase client:', error);
  }

  return supabase;
}

export { initSupabase };
