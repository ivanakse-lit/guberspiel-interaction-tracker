
import React from 'react'
import { Button } from '@/components/ui/button'
import { Heart, User, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { User as SupabaseUser } from '@supabase/supabase-js'

interface LandingHeaderProps {
  user: SupabaseUser | null
  onSignOut: () => void
  onSignInClick: () => void
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ user, onSignOut, onSignInClick }) => {
  const navigate = useNavigate()

  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-orange-400 to-rose-400 p-2 rounded-full">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
            Güberspiel
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-orange-200">
                <User className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-gray-700">
                  Welcome, {user.user_metadata?.name || user.email?.split('@')[0] || 'Friend'}!
                </span>
              </div>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600"
              >
                Dashboard
              </Button>
              <Button 
                onClick={onSignOut}
                variant="outline"
                size="sm"
                className="bg-white/80 backdrop-blur-sm border-orange-200 hover:bg-orange-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <Button 
              variant="outline" 
              onClick={onSignInClick}
              className="bg-white/80 backdrop-blur-sm border-orange-200 hover:bg-orange-50 text-orange-700"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default LandingHeader
