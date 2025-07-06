
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import OAuthDiagnostics from '@/components/auth/OAuthDiagnostics'
import EnhancedAuthForm from '@/components/auth/EnhancedAuthForm'
import { useState } from 'react'

const AuthDebug = () => {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">OAuth Debug Center</h1>
          <p className="text-gray-600">
            Diagnose and test OAuth configuration issues
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {/* Diagnostics Panel */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Configuration Diagnostics</h2>
            <OAuthDiagnostics />
          </div>

          {/* Enhanced Auth Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Enhanced Auth Testing</h2>
            <EnhancedAuthForm 
              mode={mode} 
              onToggleMode={() => setMode(mode === 'signin' ? 'signup' : 'signin')} 
            />
          </div>
        </div>

        {/* Configuration Instructions */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Required Supabase OAuth Configuration</h3>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium">1. Enable Google Provider</h4>
              <p className="text-gray-600 ml-4">
                Go to Supabase Dashboard → Authentication → Providers → Google → Enable
              </p>
            </div>
            <div>
              <h4 className="font-medium">2. Configure OAuth Credentials</h4>
              <p className="text-gray-600 ml-4">
                Add your Google Client ID and Client Secret from Google Cloud Console
              </p>
            </div>
            <div>
              <h4 className="font-medium">3. Set Redirect URLs</h4>
              <p className="text-gray-600 ml-4">
                Authentication → Settings → Add: <code>{window.location.origin}/*</code>
              </p>
            </div>
            <div>
              <h4 className="font-medium">4. Configure Site URL</h4>
              <p className="text-gray-600 ml-4">
                Authentication → Settings → Site URL: <code>{window.location.origin}</code>
              </p>
            </div>
            <div>
              <h4 className="font-medium">5. Google Cloud Console Setup</h4>
              <p className="text-gray-600 ml-4">
                Add <code>{window.location.origin}</code> to Authorized JavaScript origins<br/>
                Add your Supabase callback URL to Authorized redirect URIs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthDebug
