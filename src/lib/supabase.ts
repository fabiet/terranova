import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type for contact form submissions
export interface ContactSubmission {
  id?: string
  name: string
  email: string
  phone?: string
  project_type?: string
  message: string
  status?: string
  source?: string
  created_at?: string
}

// Type for the database table
export interface Database {
  public: {
    Tables: {
      contact_submissions: {
        Row: ContactSubmission
        Insert: Omit<ContactSubmission, 'id' | 'created_at'>
        Update: Partial<Omit<ContactSubmission, 'id' | 'created_at'>>
      }
    }
  }
} 