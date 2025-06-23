
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing')

if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
