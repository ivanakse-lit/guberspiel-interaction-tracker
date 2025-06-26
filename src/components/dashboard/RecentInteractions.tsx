
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, ArrowUp, ArrowDown, Calendar, Clock } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

interface RecentInteraction {
  id: string;
  type: 'give' | 'receive';
  title: string;
  points: number;
  date: Date;
  loggedDate: Date;
  circle: string;
  otherPerson: string;
}

// Mock recent interactions
const mockRecentInteractions: RecentInteraction[] = [
  {
    id: '1',
    type: 'give',
    title: 'Helped with moving',
    points: 3,
    date: new Date('2024-06-20'),
    loggedDate: new Date('2024-06-24'),
    circle: 'Flatmates',
    otherPerson: 'Sarah'
  },
  {
    id: '2',
    type: 'receive',
    title: 'Made dinner',
    points: 2,
    date: new Date('2024-06-22'),
    loggedDate: new Date('2024-06-22'),
    circle: 'Flatmates',
    otherPerson: 'Mike'
  },
  {
    id: '3',
    type: 'give',
    title: 'Emotional support',
    points: 2,
    date: new Date('2024-06-18'),
    loggedDate: new Date('2024-06-23'),
    circle: 'Family',
    otherPerson: 'Mom'
  }
];

/**
 * Component to display recent interactions/moments of care
 * Shows detailed information about when interactions occurred vs when they were logged
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
        {mockRecentInteractions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No interactions yet. Start sharing moments of care!
          </p>
        ) : (
          <div className="space-y-4">
            {mockRecentInteractions.map((interaction) => (
              <div
                key={interaction.id}
                className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors bg-white/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={interaction.type === 'give' ? 'default' : 'secondary'}
                        className={`flex items-center space-x-1 ${
                          interaction.type === 'give' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {interaction.type === 'give' ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )}
                        <span>{interaction.type === 'give' ? 'Gave' : 'Received'}</span>
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {interaction.circle}
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900">{interaction.title}</h4>
                      <p className="text-sm text-gray-600">
                        {interaction.type === 'give' ? 'To' : 'From'} {interaction.otherPerson}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Happened: {format(interaction.date, 'MMM d, yyyy')}
                      </div>
                      {interaction.date.getTime() !== interaction.loggedDate.getTime() && (
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Logged: {formatDistanceToNow(interaction.loggedDate, { addSuffix: true })}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-orange-600">
                      +{interaction.points}
                    </div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentInteractions;
