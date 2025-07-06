
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'

interface DiagnosticResult {
  test: string
  status: 'pass' | 'fail' | 'warning'
  message: string
  solution?: string
}

const OAuthDiagnostics: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runDiagnostics = async () => {
    setIsRunning(true)
    const results: DiagnosticResult[] = []

    // Test 1: Check if Supabase client is initialized
    try {
      const { data, error } = await supabase.auth.getSession()
      results.push({
        test: 'Supabase Client Connection',
        status: error ? 'fail' : 'pass',
        message: error ? `Connection failed: ${error.message}` : 'Supabase client connected successfully'
      })
    } catch (error) {
      results.push({
        test: 'Supabase Client Connection',
        status: 'fail',
        message: `Failed to connect to Supabase: ${error}`
      })
    }

    // Test 2: Check current URL and expected redirect
    const currentUrl = window.location.origin
    const expectedRedirect = `${currentUrl}/`
    results.push({
      test: 'Redirect URL Configuration',
      status: 'warning',
      message: `Current origin: ${currentUrl}`,
      solution: `Add ${expectedRedirect} to your Supabase Auth settings under 'Redirect URLs'`
    })

    // Test 3: Test Google OAuth configuration
    try {
      console.log('Testing Google OAuth configuration...')
      
      // This will help us see what happens when we try to initiate OAuth
      const response = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: expectedRedirect,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      })

      if (response.error) {
        results.push({
          test: 'Google OAuth Provider',
          status: 'fail',
          message: `OAuth error: ${response.error.message}`,
          solution: response.error.message.includes('provider') 
            ? 'Enable Google OAuth provider in Supabase Dashboard > Authentication > Providers'
            : 'Check OAuth client configuration in Google Cloud Console'
        })
      } else {
        results.push({
          test: 'Google OAuth Provider',
          status: 'pass',
          message: 'OAuth provider configuration appears correct'
        })
      }
    } catch (error) {
      results.push({
        test: 'Google OAuth Provider',
        status: 'fail',
        message: `OAuth test failed: ${error}`,
        solution: 'Check Google OAuth configuration in Supabase dashboard'
      })
    }

    // Test 4: Check for auth state changes
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change detected:', event, session)
      results.push({
        test: 'Auth State Listener',
        status: 'pass',
        message: `Auth event detected: ${event}`,
      })
    })

    // Clean up listener after a short delay
    setTimeout(() => {
      authListener.data.subscription.unsubscribe()
    }, 1000)

    setDiagnostics(results)
    setIsRunning(false)
  }

  const getStatusIcon = (status: DiagnosticResult['status']) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>OAuth Diagnostics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={runDiagnostics} disabled={isRunning} className="w-full">
          {isRunning ? 'Running Diagnostics...' : 'Run OAuth Diagnostics'}
        </Button>

        {diagnostics.length > 0 && (
          <div className="space-y-3">
            {diagnostics.map((result, index) => (
              <Alert key={index} className={`
                ${result.status === 'pass' ? 'border-green-200 bg-green-50' : ''}
                ${result.status === 'fail' ? 'border-red-200 bg-red-50' : ''}
                ${result.status === 'warning' ? 'border-yellow-200 bg-yellow-50' : ''}
              `}>
                <div className="flex items-start gap-3">
                  {getStatusIcon(result.status)}
                  <div className="flex-1">
                    <div className="font-medium">{result.test}</div>
                    <AlertDescription className="mt-1">
                      {result.message}
                      {result.solution && (
                        <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                          <strong>Solution:</strong> {result.solution}
                        </div>
                      )}
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Manual Configuration Checklist:</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <input type="checkbox" id="providers" />
              <label htmlFor="providers">
                Google OAuth enabled in Supabase Dashboard → Authentication → Providers
              </label>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" id="client-id" />
              <label htmlFor="client-id">
                Google Client ID and Secret configured in Supabase
              </label>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" id="redirect-urls" />
              <label htmlFor="redirect-urls">
                Redirect URLs configured: {window.location.origin}/*
              </label>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" id="site-url" />
              <label htmlFor="site-url">
                Site URL set to: {window.location.origin}
              </label>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" id="google-console" />
              <label htmlFor="google-console">
                Google Cloud Console: Authorized origins and redirect URIs configured
              </label>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export default OAuthDiagnostics
