import { createClient } from '@supabase/supabase-js';

export const initSupabase = async () => {
  try {
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase URL or Anon Key is missing');
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Test the connection
    const { data, error } = await supabase.from('entries').select('count', { count: 'exact' });
    
    if (error) {
      throw error;
    }

    console.log('Supabase connection successful');
    return supabase;
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    return null;
  }
};
