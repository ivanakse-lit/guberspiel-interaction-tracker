
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Users, LogOut, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Dashboard header component with navigation and main actions
 * Includes user greeting, primary action buttons, and sign out
 */
const DashboardHeader = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.user_metadata?.name || 'Friend'} ✨
          </h1>
          <p className="text-gray-600">
            Nurture your relationships and spread kindness
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            onClick={() => navigate('/analytics')}
            variant="outline"
            className="bg-white/80 backdrop-blur-sm border-indigo-200 hover:bg-indigo-50"
          >
            <BarChart className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          
          <Button 
            onClick={() => navigate('/log-interaction')}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Log Moment
          </Button>
          
          <Button 
            onClick={() => navigate('/join-group')}
            variant="outline"
            className="bg-white/80 backdrop-blur-sm border-orange-200 hover:bg-orange-50"
          >
            <Users className="h-4 w-4 mr-2" />
            Join Circle
          </Button>
          
          <Button 
            onClick={handleSignOut}
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-800"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
