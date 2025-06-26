
import React, { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { useAuthActions } from '@/hooks/useAuthActions'
import GoogleSignInButton from '@/components/auth/GoogleSignInButton'
import EmailAuthForm from '@/components/auth/EmailAuthForm'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const { loading, googleLoading, handleEmailAuth, handleGoogleAuth } = useAuthActions()

  const handleEmailSubmit = async (email: string, password: string, name?: string) => {
    const success = await handleEmailAuth(mode, email, password, name)
    if (success) {
      resetForm()
      onClose()
    }
    return success
  }

  const handleGoogleClick = async () => {
    const success = await handleGoogleAuth()
    if (success) {
      onClose()
    }
  }

  const resetForm = () => {
    setMode('signin')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === 'signup' ? 'Create Account' : 'Sign In'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <GoogleSignInButton onClick={handleGoogleClick} loading={googleLoading} />
          
          <div className="relative">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">or</span>
            </div>
          </div>

          <EmailAuthForm 
            mode={mode} 
            onSubmit={handleEmailSubmit} 
            loading={loading} 
          />
          
          <div className="text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
              className="text-sm text-blue-600 hover:underline"
            >
              {mode === 'signup' ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal
