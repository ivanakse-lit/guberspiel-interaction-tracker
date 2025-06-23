
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Scale, Plus, Users, TrendingUp, TrendingDown, ArrowLeft, BarChart3, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock data for demonstration
  const [userBalance] = useState(5);
  const [recentInteractions] = useState([
    { id: 1, type: 'give', description: 'Helped with moving', recipient: 'Sarah', value: 2, date: '2 hours ago', group: 'Flatmates' },
    { id: 2, type: 'take', description: 'Emotional support during tough time', giver: 'Mike', value: 3, date: '1 day ago', group: 'Study Group' },
    { id: 3, type: 'give', description: 'Cooked dinner for the group', recipient: 'Everyone', value: 1, date: '2 days ago', group: 'Flatmates' },
  ]);

  const [groups, setGroups] = useState([
    { id: 1, name: 'Flatmates', members: 4, balance: 2 },
    { id: 2, name: 'Study Group', members: 6, balance: -1 },
    { id: 3, name: 'Family', members: 5, balance: 3 },
    { id: 4, name: 'Work Team', members: 8, balance: 1 },
  ]);

  const handleDeleteGroup = (groupId: number, groupName: string) => {
    setGroups(prevGroups => prevGroups.filter(group => group.id !== groupId));
    toast({
      title: "Group deleted",
      description: `"${groupName}" has been removed from your groups.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="text-gray-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <Scale className="h-6 w-6 text-indigo-600" />
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/log-interaction')}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Log Interaction
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-8">
        {/* Balance Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Your Overall Balance</span>
                {userBalance >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-green-600" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-600" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                <span className={userBalance >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {userBalance >= 0 ? '+' : ''}{userBalance}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                {userBalance > 0 && "You're giving more than receiving"}
                {userBalance === 0 && "Perfect balance!"}
                {userBalance < 0 && "You're receiving more than giving"}
              </p>
              <div className="text-xs text-gray-500">
                Across {groups.length} groups
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Total Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-600">{groups.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">12</div>
              <p className="text-gray-600 text-sm">Interactions</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="by-group">Balance by Group</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Interactions */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Interactions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentInteractions.map((interaction) => (
                    <div key={interaction.id} className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge 
                            variant={interaction.type === 'give' ? 'default' : 'secondary'}
                            className={interaction.type === 'give' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}
                          >
                            {interaction.type === 'give' ? 'Given' : 'Received'}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {interaction.group}
                          </Badge>
                          <span className="text-sm text-gray-500">{interaction.date}</span>
                        </div>
                        <p className="font-medium text-gray-900">{interaction.description}</p>
                        <p className="text-sm text-gray-600">
                          {interaction.type === 'give' ? `To: ${interaction.recipient}` : `From: ${interaction.giver}`}
                        </p>
                      </div>
                      <div className={`text-lg font-bold ${interaction.type === 'give' ? 'text-green-600' : 'text-blue-600'}`}>
                        {interaction.type === 'give' ? '+' : '-'}{interaction.value}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Groups */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Your Groups</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/create-group')}
                      className="bg-white/70"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      New
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {groups.map((group) => (
                    <div 
                      key={group.id} 
                      className="flex items-center justify-between p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-indigo-100 p-2 rounded-full">
                          <Users className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{group.name}</p>
                          <p className="text-sm text-gray-600">{group.members} members</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right mr-2">
                          <div className={`text-lg font-bold ${group.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {group.balance >= 0 ? '+' : ''}{group.balance}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="flex space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/group/${group.id}/overview`)}
                              className="text-xs bg-white/70 hover:bg-white"
                            >
                              Overview
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/group/${group.id}/history`)}
                              className="text-xs bg-white/70 hover:bg-white"
                            >
                              History
                            </Button>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs bg-white/70 hover:bg-white p-1 h-6 w-6"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteGroup(group.id, group.name)}
                              className="text-xs bg-red-50 hover:bg-red-100 text-red-600 border-red-200 p-1 h-6 w-6"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="by-group" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-indigo-600" />
                  <span>Balance Breakdown by Group</span>
                </CardTitle>
                <p className="text-gray-600 text-sm">See how your overall balance of {userBalance >= 0 ? '+' : ''}{userBalance} is distributed across your groups</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {groups.map((group) => (
                  <div key={group.id} className="bg-white/50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-indigo-100 p-2 rounded-full">
                          <Users className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{group.name}</h3>
                          <p className="text-sm text-gray-600">{group.members} members</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${group.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {group.balance >= 0 ? '+' : ''}{group.balance}
                        </div>
                        <p className="text-xs text-gray-500">Your balance</p>
                      </div>
                    </div>
                    
                    {/* Visual Balance Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className={`h-2 rounded-full ${group.balance >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ 
                          width: `${Math.min(Math.abs(group.balance) * 20, 100)}%`,
                          marginLeft: group.balance < 0 ? `${100 - Math.min(Math.abs(group.balance) * 20, 100)}%` : '0'
                        }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>
                        {group.balance > 0 ? 'You give more' : group.balance < 0 ? 'You receive more' : 'Balanced'}
                      </span>
                      <span>{Math.abs(group.balance)} point difference</span>
                    </div>
                  </div>
                ))}
                
                {/* Summary */}
                <div className="bg-indigo-50 rounded-lg p-4 mt-6">
                  <h4 className="font-medium text-indigo-900 mb-2">Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-green-700 font-medium">Positive groups: </span>
                      <span className="text-gray-700">{groups.filter(g => g.balance > 0).length}</span>
                    </div>
                    <div>
                      <span className="text-red-700 font-medium">Negative groups: </span>
                      <span className="text-gray-700">{groups.filter(g => g.balance < 0).length}</span>
                    </div>
                    <div>
                      <span className="text-indigo-700 font-medium">Balanced groups: </span>
                      <span className="text-gray-700">{groups.filter(g => g.balance === 0).length}</span>
                    </div>
                    <div>
                      <span className="text-indigo-700 font-medium">Total balance: </span>
                      <span className={`font-medium ${userBalance >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                        {userBalance >= 0 ? '+' : ''}{userBalance}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
