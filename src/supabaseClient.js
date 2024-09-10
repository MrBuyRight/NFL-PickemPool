let supabase = null;

export async function initSupabase() {
  if (supabase) return supabase;

  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL or Anon Key is missing');
    return null;
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase client created successfully');
    return supabase;
  } catch (error) {
    console.error('Error creating Supabase client:', error);
    return null;
  }
}
