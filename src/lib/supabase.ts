import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug logging for environment variables
console.log('🔍 Supabase Configuration Check:')
console.log('- URL exists:', !!supabaseUrl)
console.log('- URL value:', supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'undefined')
console.log('- Anon Key exists:', !!supabaseAnonKey)
console.log('- Anon Key length:', supabaseAnonKey ? supabaseAnonKey.length : 0)

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
    },
    global: {
      headers: {
        'X-Client-Info': 'terranova-app'
      }
    },
    db: {
      schema: 'public'
    },
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    }
  }
)

// Test connection function
export const testSupabaseConnection = async () => {
  console.log('🔍 Testing Supabase connection...')
  
  if (!isSupabaseConfigured()) {
    console.error('❌ Supabase not configured properly')
    return { success: false, error: 'Environment variables not set' }
  }

  try {
    // Test 1: Basic connection test
    console.log('📡 Test 1: Basic connection...')
    const startTime = Date.now()
    
    const { data, error } = await Promise.race([
      supabase.from('user_profiles').select('count').limit(1),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout after 10 seconds')), 10000)
      )
    ])
    
    const duration = Date.now() - startTime
    console.log(`⏱️ Connection test took ${duration}ms`)
    
    if (error) {
      console.error('❌ Connection test failed:', error)
      return { success: false, error: error.message, duration }
    }
    
    console.log('✅ Basic connection successful')
    
    // Test 2: Auth service test
    console.log('📡 Test 2: Auth service...')
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) {
      console.warn('⚠️ Auth service warning:', sessionError.message)
    } else {
      console.log('✅ Auth service accessible, session:', session ? 'exists' : 'none')
    }
    
    return { success: true, duration, hasSession: !!session }
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('❌ Connection test exception:', errorMessage)
    return { success: false, error: errorMessage }
  }
}

// Add a helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && 
           supabaseUrl !== 'https://placeholder.supabase.co' && 
           supabaseAnonKey !== 'placeholder-key')
}