
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus, Edit, Trash2, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import EditCircleDialog from './EditCircleDialog';

// Type definitions for circle data structure
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

interface CirclesListProps {
  userCircles: CircleMembership[];
}

/**
 * Component to display user's circles with management actions
 * Handles empty state and provides navigation to circle details
 */
const CirclesList = ({ userCircles }: CirclesListProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [editingCircle, setEditingCircle] = useState<Circle | null>(null);

  /**
   * Navigate to circle overview when circle is clicked
   */
  const handleCircleClick = (circleId: number) => {
    console.log('Navigating to circle overview:', circleId);
    navigate(`/group/${circleId}/overview`);
  };

  /**
   * Placeholder handler for circle deletion - to be implemented
   */
  const handleDeleteGroup = (groupId: number, groupName: string) => {
    toast({
      title: "Group removal",
      description: `Removing "${groupName}" will be implemented soon.`,
    });
  };

  /**
   * Handle edit circle
   */
  const handleEditCircle = (e: React.MouseEvent, circle: Circle) => {
    e.stopPropagation(); // Prevent circle click when editing
    setEditingCircle(circle);
  };

  return (
    <>
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-800">
              <Users className="h-5 w-5 text-indigo-500" />
              <span>Your Circles</span>
            </div>
            {/* Quick action to create new circle */}
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
          {/* Empty state when user has no circles */}
          {userCircles.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't joined any circles yet.</p>
              <div className="space-y-2">
                {/* Primary action: Create first circle */}
                <Button 
                  onClick={() => navigate('/create-group')}
                  className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white"
                >
                  Create Your First Circle
                </Button>
                <div className="text-gray-400 text-sm">
                  Invite your loved ones via secure email invitations
                </div>
              </div>
            </div>
          ) : (
            // List of user's circles
            userCircles.map((membership) => (
              <div 
                key={membership.id} 
                className="flex items-center justify-between p-4 bg-gradient-to-r from-white/70 to-indigo-50/30 rounded-lg hover:from-white/90 hover:to-indigo-50/50 transition-all duration-300 border border-indigo-100/50 cursor-pointer"
                onClick={() => handleCircleClick(membership.circle.id)}
              >
                {/* Circle info */}
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-2 rounded-full">
                    <Users className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{membership.circle.name}</p>
                    <p className="text-sm text-gray-600">{membership.circle.description || 'No description'}</p>
                  </div>
                </div>
                
                {/* Balance and action buttons */}
                <div className="flex items-center space-x-2">
                  {/* Current balance display (placeholder) */}
                  <div className="text-right mr-2">
                    <div className="text-lg font-bold text-gray-600">
                      +0
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex flex-col space-y-1">
                    {/* Navigation buttons */}
                    <div className="flex space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/group/${membership.circle.id}/overview`);
                        }}
                        className="text-xs bg-white/70 hover:bg-white border-orange-200 text-orange-700"
                      >
                        Overview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/group/${membership.circle.id}/history`);
                        }}
                        className="text-xs bg-white/70 hover:bg-white border-orange-200 text-orange-700"
                      >
                        History
                      </Button>
                    </div>
                    
                    {/* Management buttons */}
                    <div className="flex space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => handleEditCircle(e, membership.circle)}
                        className="text-xs bg-white/70 hover:bg-white p-1 h-6 w-6 border-orange-200 text-orange-700"
                      >
                        <Settings className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteGroup(membership.circle.id, membership.circle.name);
                        }}
                        className="text-xs bg-red-50 hover:bg-red-100 text-red-600 border-red-200 p-1 h-6 w-6"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Edit Circle Dialog */}
      {editingCircle && (
        <EditCircleDialog
          circle={editingCircle}
          isOpen={!!editingCircle}
          onClose={() => setEditingCircle(null)}
        />
      )}
    </>
  );
};

export default CirclesList;
