
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, HandHeart, Star } from 'lucide-react';

interface BalanceOverviewProps {
  userBalance: number;
  circleCount: number;
}

const BalanceOverview = ({ userBalance, circleCount }: BalanceOverviewProps) => {
  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg col-span-2 hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-gray-800">
            <div className="flex items-center space-x-2">
              <HandHeart className="h-5 w-5 text-rose-500" />
              <span>Your Heart's Balance</span>
            </div>
            {userBalance >= 0 ? (
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            ) : (
              <TrendingDown className="h-5 w-5 text-amber-600" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">
            <span className={userBalance >= 0 ? 'text-emerald-600' : 'text-amber-600'}>
              {userBalance >= 0 ? '+' : ''}{userBalance}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-3">
            {userBalance > 0 && "Your heart overflows with giving ✨"}
            {userBalance === 0 && "Beautiful harmony in your relationships 🌸"}
            {userBalance < 0 && "You're cherished and supported 💕"}
          </p>
          <div className="text-xs text-gray-500">
            Across {circleCount} loving circles
          </div>
        </CardContent>
      </Card>

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
