import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jqebudjmyxhtsamrzkfm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZWJ1ZGpteXhodHNhbXJ6a2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MzMwMjIsImV4cCI6MjA2NzUwOTAyMn0.KO5bNWA-LsOrPppdQcvdg9IWmjukxDl-qTFXOLaukXE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
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
