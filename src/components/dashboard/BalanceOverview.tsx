
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, HandHeart, Star } from 'lucide-react';

interface BalanceOverviewProps {
  userBalance: number;
  circleCount: number;
}

/**
 * Overview cards showing user's overall balance and activity metrics
 * Displays balance with contextual messaging based on activity levels
 */
const BalanceOverview = ({ userBalance, circleCount }: BalanceOverviewProps) => {
  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      {/* Main balance card - spans 2 columns for emphasis */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg col-span-2 hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-gray-800">
            <div className="flex items-center space-x-2">
              <HandHeart className="h-5 w-5 text-rose-500" />
              <span>Your Connection Score</span>
            </div>
            <TrendingUp className="h-5 w-5 text-emerald-600" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Balance value - always positive */}
          <div className="text-3xl font-bold mb-2">
            <span className="text-emerald-600">
              +{userBalance}
            </span>
          </div>
          
          {/* Contextual message based on balance state */}
          <p className="text-gray-600 text-sm mb-3">
            {userBalance > 10 && "Your connections are thriving! ✨"}
            {userBalance >= 5 && userBalance <= 10 && "Building beautiful relationships 🌸"}
            {userBalance > 0 && userBalance < 5 && "Growing your circle of care 💕"}
            {userBalance === 0 && "Ready to start your journey 🌱"}
          </p>
          
          {/* Circle count context */}
          <div className="text-xs text-gray-500">
            Across {circleCount} loving circles
          </div>
        </CardContent>
      </Card>

      {/* Circles count card */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-800">
            <Users className="h-4 w-4 text-indigo-500" />
            <span>Circles of Care</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-indigo-600">{circleCount}</div>
        </CardContent>
      </Card>

      {/* Weekly activity card */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-800">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>This Week</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">0</div>
          <p className="text-gray-600 text-sm">Moments shared</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceOverview;
