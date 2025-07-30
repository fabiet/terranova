import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Please create a .env file with:')
  console.error('VITE_SUPABASE_URL=your_supabase_project_url')
  console.error('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key')
  
  // Don't throw error immediately, let the app load but show a warning
  console.warn('⚠️ Supabase client will not work without environment variables')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)

// Add a helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && 
           supabaseUrl !== 'https://placeholder.supabase.co' && 
           supabaseAnonKey !== 'placeholder-key')
}