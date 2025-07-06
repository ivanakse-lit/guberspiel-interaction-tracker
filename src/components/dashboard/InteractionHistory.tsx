
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { History, ArrowUp, Calendar, Users, Gift } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

interface Interaction {
  id: string;
  type: 'give';
  title: string;
  description?: string;
  points: number;
  date: Date;
  loggedDate: Date;
  circle: string;
  otherPerson: string;
}

// Mock interaction data with only giving interactions
const mockInteractions: Interaction[] = [
  {
    id: '1',
    type: 'give',
    title: 'Helped with moving',
    description: 'Carried boxes and furniture to new apartment',
    points: 3,
    date: new Date('2024-06-20'),
    loggedDate: new Date('2024-06-24'),
    circle: 'Flatmates',
    otherPerson: 'Sarah'
  },
  {
    id: '2',
    type: 'give',
    title: 'Made dinner for everyone',
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
    description: 'Listened and provided comfort during difficult time',
    points: 2,
    date: new Date('2024-06-18'),
    loggedDate: new Date('2024-06-23'),
    circle: 'Family',
    otherPerson: 'Mom'
  }
];

const InteractionHistory = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-gray-800">
          <History className="h-5 w-5 text-indigo-500" />
          <span>Your Giving History</span>
        </CardTitle>
        <p className="text-gray-600 text-sm">Track all the care you've given to others</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockInteractions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No giving interactions yet. Start sharing moments of care!
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Type</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Circle</TableHead>
                  <TableHead>When</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInteractions.map((interaction) => (
                  <TableRow key={interaction.id} className="hover:bg-gray-50/50">
                    <TableCell>
                      <Badge
                        variant="default"
                        className="flex items-center space-x-1 bg-green-100 text-green-800 hover:bg-green-200"
                      >
                        <ArrowUp className="h-3 w-3" />
                        <span>Gave</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">{interaction.title}</div>
                        {interaction.description && (
                          <div className="text-sm text-gray-600">{interaction.description}</div>
                        )}
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="h-3 w-3 mr-1" />
                          To {interaction.otherPerson}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {interaction.circle}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">
                          {format(interaction.date, 'MMM d, yyyy')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {interaction.date.getTime() !== interaction.loggedDate.getTime() ? (
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Logged {formatDistanceToNow(interaction.loggedDate, { addSuffix: true })}
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDistanceToNow(interaction.date, { addSuffix: true })}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Gift className="h-4 w-4 text-orange-500" />
                        <span className="font-bold text-orange-600">
                          +{interaction.points}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractionHistory;
