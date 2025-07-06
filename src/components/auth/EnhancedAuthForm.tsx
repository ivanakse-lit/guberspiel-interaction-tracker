
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'

interface EnhancedAuthFormProps {
  mode: 'signin' | 'signup'
  onToggleMode: () => void
}

const EnhancedAuthForm: React.FC<EnhancedAuthFormProps> = ({ mode, onToggleMode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [authDebug, setAuthDebug] = useState<string[]>([])
  
  const { signUp, signIn, signInWithGoogle } = useAuth()
  const { toast } = useToast()

  // Debug auth state changes
  useEffect(() => {
    const debugLog = (message: string) => {
      console.log(`[Auth Debug] ${message}`)
      setAuthDebug(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`])
    }

    debugLog('Enhanced Auth Form mounted')
    
    return () => {
      debugLog('Enhanced Auth Form unmounted')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setAuthError(null)
    
    console.log(`[Auth] Starting ${mode} with email:`, email)

    try {
      let result
      if (mode === 'signup') {
        console.log('[Auth] Attempting signup...')
        result = await signUp(email, password, name)
      } else {
        console.log('[Auth] Attempting signin...')  
        result = await signIn(email, password)
      }

      console.log('[Auth] Result:', result)

      if (result.error) {
        console.error('[Auth] Error occurred:', result.error)
        setAuthError(result.error.message)
        toast({
          title: 'Authentication Error',
          description: result.error.message,
          variant: 'destructive'
        })
      } else {
        console.log('[Auth] Success!')
        toast({
          title: mode === 'signup' ? 'Account created!' : 'Welcome back!',
          description: mode === 'signup' ? 'Please check your email to verify your account.' : 'You have been signed in.'
        })
      }
    } catch (error) {
      console.error('[Auth] Unexpected error:', error)
      setAuthError(`Unexpected error: ${error}`)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    setAuthError(null)
    
    console.log('[OAuth] Starting Google authentication...')
    console.log('[OAuth] Current URL:', window.location.href)
    console.log('[OAuth] Origin:', window.location.origin)
    
    try {
      const { error } = await signInWithGoogle()
      console.log('[OAuth] Google auth response:', { error })
      
      if (error) {
        console.error('[OAuth] Google auth error:', {
          message: error.message,
          status: error.status,
          details: error
        })
        
        let errorMessage = error.message
        let userFriendlyMessage = 'Failed to sign in with Google'
        
        // Provide specific error handling
        if (error.message?.includes('provider is not enabled') || 
            error.message?.includes('Unsupported provider')) {
          userFriendlyMessage = 'Google OAuth is not enabled in the Supabase configuration'
          errorMessage = 'Google provider not enabled'
        } else if (error.message?.includes('redirect') || 
                   error.message?.includes('unauthorized')) {
          userFriendlyMessage = 'OAuth redirect URL configuration issue'
          errorMessage = 'Redirect URL mismatch'
        } else if (error.message?.includes('Invalid login credentials')) {
          userFriendlyMessage = 'OAuth credentials configuration issue'
          errorMessage = 'Invalid OAuth credentials'
        }
        
        setAuthError(errorMessage)
        toast({
          title: 'Google Sign-In Error',
          description: userFriendlyMessage,
          variant: 'destructive'
        })
        return false
      }
      
      console.log('[OAuth] Google auth initiated successfully')
      return true
    } catch (error) {
      console.error('[OAuth] Unexpected Google auth error:', error)
      setAuthError(`Google OAuth error: ${error}`)
      toast({
        title: 'Error',
        description: 'Failed to initiate Google sign-in',
        variant: 'destructive'
      })
      return false
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{mode === 'signup' ? 'Create Account' : 'Sign In'}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Error Display */}
        {authError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}

        {/* Google Sign In Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full mb-4"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {googleLoading ? 'Signing in...' : `Continue with Google`}
        </Button>

        <div className="relative mb-4">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-2 text-sm text-gray-500">or</span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Loading...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
          </Button>
        </form>
        
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onToggleMode}
            className="text-sm text-blue-600 hover:underline"
          >
            {mode === 'signup' ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>

        {/* Debug Information */}
        {authDebug.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded text-xs">
            <div className="font-medium mb-2">Debug Log:</div>
            {authDebug.map((log, index) => (
              <div key={index} className="text-gray-600">{log}</div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default EnhancedAuthForm
