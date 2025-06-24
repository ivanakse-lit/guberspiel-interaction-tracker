
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';

/**
 * Component to display recent interactions/moments of care
 * Shows empty state when no interactions exist
 */
const RecentInteractions = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-gray-800">
          <Heart className="h-5 w-5 text-rose-500" />
          <span>Recent Moments of Care</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Empty state - will be populated with actual interaction data when implemented */}
        <p className="text-gray-500 text-center py-8">
          No interactions yet. Start sharing moments of care!
        </p>
      </CardContent>
    </Card>
  );
};

export default RecentInteractions;
