
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Users, Trophy, TrendingUp, Award } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const GroupOverview = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  
  // Empty state - will be populated with actual data from API
  const [group] = useState({
    id: parseInt(groupId || '1'),
    name: 'Loading...',
    members: 0,
    totalInteractions: 0,
    totalValue: 0
  });

  const [memberStats] = useState([]);

  // Sort members by total points (highest to lowest)
  const sortedMembers = [...memberStats].sort((a, b) => (b.given + b.received) - (a.given + a.received));
  const currentUserRank = sortedMembers.findIndex(member => member.isCurrentUser) + 1 || 1;

  const mostActiveGiver = memberStats.length > 0 ? memberStats.reduce((prev, current) => 
    prev.given > current.given ? prev : current
  ) : null;

  const mostActiveReceiver = memberStats.length > 0 ? memberStats.reduce((prev, current) => 
    prev.received > current.received ? prev : current
  ) : null;

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
              <h1 className="text-xl font-bold text-gray-900">{group.name} Overview</h1>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              onClick={() => navigate(`/group/${groupId}/history`)}
              className="bg-white/70"
            >
              View History
            </Button>
            <Button 
              onClick={() => navigate('/log-interaction')}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Log Interaction
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-8">
        {/* Group Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Your Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-indigo-600">#{currentUserRank}</div>
                <Trophy className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-xs text-gray-500">out of {group.members} members</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Interactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{group.totalInteractions}</div>
              <p className="text-xs text-gray-500">across all members</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Top Giver</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-green-600">{mostActiveGiver?.name || 'N/A'}</div>
              <p className="text-xs text-gray-500">+{mostActiveGiver?.given || 0} given</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Most Supported</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-blue-600">{mostActiveReceiver?.name || 'N/A'}</div>
              <p className="text-xs text-gray-500">+{mostActiveReceiver?.received || 0} received</p>
            </CardContent>
          </Card>
        </div>

        {/* Member Rankings */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-indigo-600" />
              <span>Member Rankings</span>
            </CardTitle>
            <p className="text-gray-600 text-sm">See how all members are performing in this group</p>
          </CardHeader>
          <CardContent>
            {memberStats.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No member data available yet.</p>
                <p className="text-sm text-gray-400 mt-2">Members will appear here once interactions are logged.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead className="text-center">Given</TableHead>
                    <TableHead className="text-center">Received</TableHead>
                    <TableHead className="text-center">Total Score</TableHead>
                    <TableHead className="text-center">Activity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedMembers.map((member, index) => (
                    <TableRow 
                      key={member.id} 
                      className={`hover:bg-white/50 ${member.isCurrentUser ? 'bg-indigo-50/70' : ''}`}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-lg">#{index + 1}</span>
                          {index === 0 && <Trophy className="h-4 w-4 text-yellow-500" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${member.isCurrentUser ? 'text-indigo-700' : 'text-gray-900'}`}>
                            {member.name}
                          </span>
                          {member.isCurrentUser && (
                            <Badge variant="outline" className="text-xs bg-indigo-100 text-indigo-700">
                              You
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="font-bold text-green-600">+{member.given}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          <span className="font-bold text-blue-600">+{member.received}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-bold text-lg text-emerald-600">
                          +{member.given + member.received}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{member.totalInteractions}</div>
                          <div className="text-xs text-gray-500">interactions</div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Your Position Analysis */}
        {memberStats.length > 0 && (
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="text-indigo-700">Your Position Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Performance Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Your rank:</span>
                      <span className="font-medium">#{currentUserRank} out of {group.members}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Your total score:</span>
                      <span className="font-medium text-emerald-600">
                        +{(memberStats.find(m => m.isCurrentUser)?.given || 0) + (memberStats.find(m => m.isCurrentUser)?.received || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Activity level:</span>
                      <span className="font-medium">
                        {((memberStats.find(m => m.isCurrentUser)?.totalInteractions || 0) / group.totalInteractions * 100).toFixed(0)}% of total
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Recommendations</h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    {currentUserRank === 1 ? (
                      <p className="text-green-600">🎉 You're the most active member! Keep up the great work.</p>
                    ) : currentUserRank <= group.members / 2 ? (
                      <p>👍 You're performing well in this group.</p>
                    ) : (
                      <p className="text-orange-600">💡 Consider being more active to improve your ranking.</p>
                    )}
                    <p>You've been involved in {((memberStats.find(m => m.isCurrentUser)?.totalInteractions || 0) / group.totalInteractions * 100).toFixed(0)}% of group interactions.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GroupOverview;
