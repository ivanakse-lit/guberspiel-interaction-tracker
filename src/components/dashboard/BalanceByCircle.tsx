
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, Heart } from 'lucide-react';

// Type definitions matching the circle data structure
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

interface BalanceByCircleProps {
  userCircles: CircleMembership[];
}

/**
 * Component to display balance breakdown across all user's circles
 * Shows detailed balance information per circle and overall summary
 */
const BalanceByCircle = ({ userCircles }: BalanceByCircleProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-indigo-600" />
          <span className="text-gray-800">Balance Across Your Circles</span>
        </CardTitle>
        <p className="text-gray-600 text-sm">See how your heart's balance flows through each circle of care</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Empty state when user has no circles */}
        {userCircles.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Join or create circles to see your balance breakdown here.</p>
          </div>
        ) : (
          // Individual circle balance cards
          userCircles.map((membership) => (
            <div key={membership.id} className="bg-gradient-to-r from-white/70 to-orange-50/30 rounded-lg p-6 border border-orange-100/50">
              {/* Circle header with name and balance */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-2 rounded-full">
                    <Users className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{membership.circle.name}</h3>
                    <p className="text-sm text-gray-600">Circle member</p>
                  </div>
                </div>
                {/* Balance display (currently placeholder) */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-600">
                    +0
                  </div>
                  <p className="text-xs text-gray-500">Your heart's flow</p>
                </div>
              </div>
              
              {/* Balance progress bar (placeholder for future implementation) */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div className="h-2 rounded-full bg-gradient-to-r from-gray-300 to-gray-400" style={{ width: '0%' }}></div>
              </div>
              
              {/* Balance status indicator */}
              <div className="flex justify-between text-sm text-gray-600">
                <span>🌸 Perfect harmony</span>
                <span>0 point difference</span>
              </div>
            </div>
          ))
        )}
        
        {/* Summary section - only shown when user has circles */}
        {userCircles.length > 0 && (
          <div className="bg-gradient-to-r from-orange-100/80 to-rose-100/80 rounded-lg p-4 mt-6 border border-orange-200/50">
            <h4 className="font-medium text-orange-900 mb-2 flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Your Heart's Summary</span>
            </h4>
            {/* Balance summary grid (placeholder data) */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-emerald-700 font-medium">Giving circles: </span>
                <span className="text-gray-700">0</span>
              </div>
              <div>
                <span className="text-amber-700 font-medium">Receiving circles: </span>
                <span className="text-gray-700">0</span>
              </div>
              <div>
                <span className="text-indigo-700 font-medium">Balanced circles: </span>
                <span className="text-gray-700">{userCircles.length}</span>
              </div>
              <div>
                <span className="text-rose-700 font-medium">Overall balance: </span>
                <span className="font-medium text-gray-700">+0</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BalanceByCircle;
