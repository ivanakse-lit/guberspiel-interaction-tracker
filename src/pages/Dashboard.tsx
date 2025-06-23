
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Plus, Users, TrendingUp, TrendingDown, ArrowLeft, BarChart3, Edit, Trash2, HandHeart, Star } from 'lucide-react';
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
      title: "Group removed",
      description: `"${groupName}" has been gently removed from your circles.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-orange-600 hover:bg-orange-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Home
            </Button>
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-orange-400 to-rose-400 p-1.5 rounded-full">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                Your Gratitude Journey
              </h1>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/log-interaction')}
            className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Share a Moment
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-8">
        {/* Balance Overview */}
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
                Across {groups.length} loving circles
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
              <div className="text-2xl font-bold text-indigo-600">{groups.length}</div>
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
              <div className="text-2xl font-bold text-purple-600">12</div>
              <p className="text-gray-600 text-sm">Moments shared</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-orange-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-100 data-[state=active]:to-rose-100">Overview</TabsTrigger>
            <TabsTrigger value="by-group" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-100 data-[state=active]:to-rose-100">Balance by Circle</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Interactions */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Heart className="h-5 w-5 text-rose-500" />
                    <span>Recent Moments of Care</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentInteractions.map((interaction) => (
                    <div key={interaction.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-white/70 to-orange-50/30 rounded-lg border border-orange-100/50">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge 
                            variant={interaction.type === 'give' ? 'default' : 'secondary'}
                            className={interaction.type === 'give' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-blue-100 text-blue-700 border-blue-200'}
                          >
                            {interaction.type === 'give' ? '💝 Shared' : '🤗 Received'}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                            {interaction.group}
                          </Badge>
                          <span className="text-sm text-gray-500">{interaction.date}</span>
                        </div>
                        <p className="font-medium text-gray-900">{interaction.description}</p>
                        <p className="text-sm text-gray-600">
                          {interaction.type === 'give' ? `With love to: ${interaction.recipient}` : `With gratitude from: ${interaction.giver}`}
                        </p>
                      </div>
                      <div className={`text-lg font-bold ${interaction.type === 'give' ? 'text-emerald-600' : 'text-blue-600'}`}>
                        {interaction.type === 'give' ? '+' : '-'}{interaction.value}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Groups */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-800">
                      <Users className="h-5 w-5 text-indigo-500" />
                      <span>Your Circles</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/create-group')}
                      className="bg-white/70 border-orange-200 hover:bg-orange-50 text-orange-700"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      New Circle
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {groups.map((group) => (
                    <div 
                      key={group.id} 
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-white/70 to-indigo-50/30 rounded-lg hover:from-white/90 hover:to-indigo-50/50 transition-all duration-300 border border-indigo-100/50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-2 rounded-full">
                          <Users className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{group.name}</p>
                          <p className="text-sm text-gray-600">{group.members} loving souls</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right mr-2">
                          <div className={`text-lg font-bold ${group.balance >= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {group.balance >= 0 ? '+' : ''}{group.balance}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="flex space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/group/${group.id}/overview`)}
                              className="text-xs bg-white/70 hover:bg-white border-orange-200 text-orange-700"
                            >
                              Overview
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/group/${group.id}/history`)}
                              className="text-xs bg-white/70 hover:bg-white border-orange-200 text-orange-700"
                            >
                              History
                            </Button>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs bg-white/70 hover:bg-white p-1 h-6 w-6 border-orange-200 text-orange-700"
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
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-800">Balance Across Your Circles</span>
                </CardTitle>
                <p className="text-gray-600 text-sm">See how your heart's balance of {userBalance >= 0 ? '+' : ''}{userBalance} flows through each circle of care</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {groups.map((group) => (
                  <div key={group.id} className="bg-gradient-to-r from-white/70 to-orange-50/30 rounded-lg p-6 border border-orange-100/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-2 rounded-full">
                          <Users className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{group.name}</h3>
                          <p className="text-sm text-gray-600">{group.members} cherished members</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${group.balance >= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {group.balance >= 0 ? '+' : ''}{group.balance}
                        </div>
                        <p className="text-xs text-gray-500">Your heart's flow</p>
                      </div>
                    </div>
                    
                    {/* Visual Balance Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className={`h-2 rounded-full ${group.balance >= 0 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-amber-400 to-amber-500'}`}
                        style={{ 
                          width: `${Math.min(Math.abs(group.balance) * 20, 100)}%`,
                          marginLeft: group.balance < 0 ? `${100 - Math.min(Math.abs(group.balance) * 20, 100)}%` : '0'
                        }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>
                        {group.balance > 0 ? '💝 Your heart gives abundantly' : group.balance < 0 ? '🤗 You are cherished and supported' : '🌸 Perfect harmony'}
                      </span>
                      <span>{Math.abs(group.balance)} point difference</span>
                    </div>
                  </div>
                ))}
                
                {/* Summary */}
                <div className="bg-gradient-to-r from-orange-100/80 to-rose-100/80 rounded-lg p-4 mt-6 border border-orange-200/50">
                  <h4 className="font-medium text-orange-900 mb-2 flex items-center space-x-2">
                    <Heart className="h-4 w-4" />
                    <span>Your Heart's Summary</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-emerald-700 font-medium">Giving circles: </span>
                      <span className="text-gray-700">{groups.filter(g => g.balance > 0).length}</span>
                    </div>
                    <div>
                      <span className="text-amber-700 font-medium">Receiving circles: </span>
                      <span className="text-gray-700">{groups.filter(g => g.balance < 0).length}</span>
                    </div>
                    <div>
                      <span className="text-indigo-700 font-medium">Balanced circles: </span>
                      <span className="text-gray-700">{groups.filter(g => g.balance === 0).length}</span>
                    </div>
                    <div>
                      <span className="text-rose-700 font-medium">Overall balance: </span>
                      <span className={`font-medium ${userBalance >= 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
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
