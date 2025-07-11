
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Users, Calendar, TrendingUp, Filter } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const GroupHistory = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  
  // Empty state - will be populated with actual data from API
  const [group] = useState({
    id: parseInt(groupId || '1'),
    name: 'Loading...',
    members: 0,
    balance: 0
  });

  const [interactions] = useState([]);
  const [filterType, setFilterType] = useState('all');

  const filteredInteractions = interactions.filter(interaction => {
    if (filterType === 'all') return true;
    return interaction.type === filterType;
  });

  const totalGiven = 0;
  const totalReceived = 0;
  const totalPoints = totalGiven + totalReceived;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-gray-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-indigo-600" />
              <h1 className="text-xl font-bold text-gray-900">{group.name} History</h1>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/log-interaction')}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Log New Interaction
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Your Total Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">
                +{totalPoints}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                Given
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+{totalGiven}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-blue-600" />
                Received
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">+{totalReceived}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Interactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-600">{interactions.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Interaction History */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <span>Interaction History</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <div className="flex space-x-1">
                  <Button
                    variant={filterType === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType('all')}
                    className="text-xs"
                  >
                    All
                  </Button>
                  <Button
                    variant={filterType === 'give' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType('give')}
                    className="text-xs bg-green-100 text-green-700 hover:bg-green-200"
                  >
                    Given
                  </Button>
                  <Button
                    variant={filterType === 'take' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType('take')}
                    className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    Received
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {interactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No interactions recorded yet.</p>
                <p className="text-sm text-gray-400 mt-2">Start logging moments of care to see them here.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInteractions.map((interaction) => (
                    <TableRow key={interaction.id} className="hover:bg-white/50">
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{interaction.date}</div>
                          <div className="text-gray-500">{interaction.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-gray-900">{interaction.description}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div><span className="text-gray-600">From:</span> {interaction.giver}</div>
                          <div><span className="text-gray-600">To:</span> {interaction.recipient}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={interaction.type === 'give' ? 'default' : 'secondary'}
                          className={interaction.type === 'give' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}
                        >
                          {interaction.type === 'give' ? 'Given' : 'Received'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-bold text-emerald-600">
                          +{interaction.value}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GroupHistory;
