import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug logging for environment variables
console.log('🔍 Supabase Configuration Check:')
console.log('- URL exists:', !!supabaseUrl)
console.log('- URL value:', supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'undefined')
console.log('- Anon Key exists:', !!supabaseAnonKey)
console.log('- Anon Key length:', supabaseAnonKey ? supabaseAnonKey.length : 0)

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Please create a .env file with:')
  console.error('VITE_SUPABASE_URL=your_supabase_project_url')
  console.error('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types
export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  created_at: string
}

// Test connection function
export const testSupabaseConnection = async () => {
  console.log('🔍 Testing Supabase connection...')
  
  try {
    const startTime = Date.now()
    
    // Test basic connection
    const { data, error } = await supabase
      .from('contact_messages')
      .select('count')
      .limit(1)
    
    const duration = Date.now() - startTime
    console.log(`⏱️ Connection test took ${duration}ms`)
    
    if (error) {
      console.error('❌ Connection test failed:', error)
      return { success: false, error: error.message, duration }
    }
    
    console.log('✅ Supabase connection successful')
    return { success: true, duration }
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('❌ Connection test exception:', errorMessage)
    return { success: false, error: errorMessage }
  }
}

// Contact form submission
export const submitContactMessage = async (formData: {
  name: string
  email: string
  message: string
}) => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message
        }
      ])
      .select()
    
    if (error) throw error
    
    console.log('✅ Contact message submitted successfully:', data)
    return { success: true, data }
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('❌ Contact message submission failed:', errorMessage)
    return { success: false, error: errorMessage }
  }
}

// User profile operations
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    
    return { success: true, data }
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('❌ Get user profile failed:', errorMessage)
    return { success: false, error: errorMessage }
  }
}

export const createUserProfile = async (user: {
  id: string
  email: string
  full_name?: string
}) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          id: user.id,
          email: user.email,
          full_name: user.full_name || null
        }
      ])
      .select()
      .single()
    
    if (error) throw error
    
    console.log('✅ User profile created successfully:', data)
    return { success: true, data }
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('❌ Create user profile failed:', errorMessage)
    return { success: false, error: errorMessage }
  }
}