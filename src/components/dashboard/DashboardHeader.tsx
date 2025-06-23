
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Dashboard header component
 * Provides navigation and primary action button for logging interactions
 */
const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        {/* Left side: Back button and title */}
        <div className="flex items-center space-x-4">
          {/* Back to home navigation */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-orange-600 hover:bg-orange-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Home
          </Button>
          
          {/* Dashboard title with brand elements */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-orange-400 to-rose-400 p-1.5 rounded-full">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
              Your Gratitude Journey
            </h1>
          </div>
        </div>
        
        {/* Right side: Primary action button */}
        <Button 
          onClick={() => navigate('/log-interaction')}
          className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Share a Moment
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
