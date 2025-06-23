
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing')
console.log('All env vars:', import.meta.env)

if (!supabaseUrl) {
  console.error('VITE_SUPABASE_URL is missing. Please check your environment variables.')
  throw new Error('Missing VITE_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  console.error('VITE_SUPABASE_ANON_KEY is missing. Please check your environment variables.')
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test the connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Supabase connection error:', error)
  } else {
    console.log('Supabase connected successfully')
  }
})

// Database Types
export interface Circle {
  id: string
  name: string
  description: string | null
  invite_code: string
  created_by: string
  created_at: string
}

export interface CircleMembership {
  id: string
  circle_id: string
  user_id: string
  user_name: string
  joined_at: string
}

export interface Interaction {
  id: string
  circle_id: string
  giver_id: string
  receiver_id: string
  description: string
  points: number
  created_at: string
}
