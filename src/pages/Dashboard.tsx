
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getUserCircles } from '@/services/circleService';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import BalanceOverview from '@/components/dashboard/BalanceOverview';
import RecentInteractions from '@/components/dashboard/RecentInteractions';
import CirclesList from '@/components/dashboard/CirclesList';
import BalanceByCircle from '@/components/dashboard/BalanceByCircle';
import InteractionHistory from '@/components/dashboard/InteractionHistory';

// Type definitions for data structures
interface Circle {
  id: number;
  name: string;
  description: string;
  created_by: string;
  invite_code: string;
}

interface CircleMembership {
  id: number;
  circle_id: number;
  user_id: string;
  user_name: string;
  joined_at: string;
  circle: Circle;
}

/**
 * Main dashboard page component
 * Displays user's circles, balance overview, and recent interactions
 * Handles authentication and data fetching
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // State management
  const [userCircles, setUserCircles] = useState<CircleMembership[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch user's circles on component mount
   * Redirects to auth if user is not authenticated
   */
  useEffect(() => {
    const fetchUserCircles = async () => {
      // Check authentication
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        setLoading(true);
        const circles = await getUserCircles();
        setUserCircles(circles);
      } catch (error) {
        console.error('Error fetching circles:', error);
        toast({
          title: "Error loading circles",
          description: "Could not load your circles. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserCircles();
  }, [user, navigate, toast]);

  // Placeholder balance calculation (to be implemented with actual interaction data)
  const userBalance = 0;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-600">Loading your circles...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Header with navigation and main actions */}
      <DashboardHeader />

      <div className="container mx-auto px-4 pb-8">
        {/* Key metrics overview */}
        <BalanceOverview userBalance={userBalance} circleCount={userCircles.length} />

        {/* Main content tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-orange-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-100 data-[state=active]:to-rose-100">
              Overview
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-100 data-[state=active]:to-rose-100">
              History
            </TabsTrigger>
            <TabsTrigger value="by-group" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-100 data-[state=active]:to-rose-100">
              Balance by Circle
            </TabsTrigger>
          </TabsList>

          {/* Overview tab: Recent interactions and circles list */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <RecentInteractions />
              <CirclesList userCircles={userCircles} />
            </div>
          </TabsContent>

          {/* History tab: Detailed interaction history */}
          <TabsContent value="history" className="space-y-6">
            <InteractionHistory />
          </TabsContent>

          {/* Balance by circle tab: Detailed balance breakdown */}
          <TabsContent value="by-group" className="space-y-6">
            <BalanceByCircle userCircles={userCircles} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
