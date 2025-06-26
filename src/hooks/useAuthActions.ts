
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'

export const useAuthActions = () => {
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const { signUp, signIn, signInWithGoogle } = useAuth()
  const { toast } = useToast()

  const handleEmailAuth = async (
    mode: 'signin' | 'signup',
    email: string,
    password: string,
    name?: string
  ) => {
    setLoading(true)
    try {
      let result
      if (mode === 'signup') {
        result = await signUp(email, password, name || '')
      } else {
        result = await signIn(email, password)
      }

      if (result.error) {
        console.error('Email auth error:', result.error)
        toast({
          title: 'Error',
          description: result.error.message,
          variant: 'destructive'
        })
        return false
      } else {
        toast({
          title: mode === 'signup' ? 'Account created!' : 'Welcome back!',
          description: mode === 'signup' 
            ? 'Please check your email to verify your account.' 
            : 'You have been signed in.'
        })
        return true
      }
    } catch (error) {
      console.error('Email auth unexpected error:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive'
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setGoogleLoading(true)
    console.log('Starting Google authentication...')
    
    try {
      const { error } = await signInWithGoogle()
      console.log('Google auth result:', { error })
      
      if (error) {
        console.error('Google auth error details:', {
          message: error.message,
          status: error.status,
          details: error
        })
        
        // Check for specific error types
        if (error.message?.includes('provider is not enabled') || 
            error.message?.includes('Unsupported provider')) {
          toast({
            title: 'Google Sign-In Not Available',
            description: 'Google OAuth is not configured. Please use email/password or contact support.',
            variant: 'destructive'
          })
        } else if (error.message?.includes('redirect') || 
                   error.message?.includes('unauthorized')) {
          toast({
            title: 'Configuration Error',
            description: 'Google OAuth configuration issue. Please contact support.',
            variant: 'destructive'
          })
        } else {
          toast({
            title: 'Google Sign-In Error',
            description: error.message || 'Failed to sign in with Google',
            variant: 'destructive'
          })
        }
        return false
      }
      
      console.log('Google auth initiated successfully')
      return true
    } catch (error) {
      console.error('Google auth unexpected error:', error)
      toast({
        title: 'Error',
        description: 'Failed to sign in with Google',
        variant: 'destructive'
      })
      return false
    } finally {
      setGoogleLoading(false)
    }
  }

  return {
    loading,
    googleLoading,
    handleEmailAuth,
    handleGoogleAuth
  }
}
