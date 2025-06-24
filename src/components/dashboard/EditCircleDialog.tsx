
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserPlus, Copy, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Circle {
  id: number;
  name: string;
  description: string;
  created_by: string;
  invite_code: string;
}

interface CircleMember {
  id: number;
  user_id: string;
  user_name: string;
  joined_at: string;
}

interface EditCircleDialogProps {
  circle: Circle;
  isOpen: boolean;
  onClose: () => void;
}

const EditCircleDialog = ({ circle, isOpen, onClose }: EditCircleDialogProps) => {
  const { toast } = useToast();
  const [name, setName] = useState(circle.name);
  const [description, setDescription] = useState(circle.description || '');
  const [members, setMembers] = useState<CircleMember[]>([]);
  const [newMemberName, setNewMemberName] = useState('');
  const [loading, setLoading] = useState(false);

  // Load circle members
  useEffect(() => {
    const loadMembers = async () => {
      try {
        const { data, error } = await supabase
          .from('circle_memberships')
          .select('*')
          .eq('circle_id', circle.id)
          .not('user_id', 'is', null); // Only get actual members, not pending ones

        if (error) throw error;
        setMembers(data || []);
      } catch (error) {
        console.error('Error loading members:', error);
        toast({
          title: "Error",
          description: "Could not load circle members.",
          variant: "destructive"
        });
      }
    };

    if (isOpen) {
      loadMembers();
    }
  }, [circle.id, isOpen, toast]);

  const handleSave = async () => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('circle')
        .update({
          name: name.trim(),
          description: description.trim()
        })
        .eq('id', circle.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Circle updated successfully!",
      });
      
      onClose();
      // Reload the page to show updated data
      window.location.reload();
    } catch (error) {
      console.error('Error updating circle:', error);
      toast({
        title: "Error",
        description: "Could not update circle. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async () => {
    if (!newMemberName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a member name.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('circle_memberships')
        .insert({
          circle_id: circle.id,
          user_id: '', // Empty until they actually join
          user_name: newMemberName.trim()
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Added ${newMemberName} as a pending member. They can join using the invite code.`,
      });
      
      setNewMemberName('');
    } catch (error) {
      console.error('Error adding member:', error);
      toast({
        title: "Error",
        description: "Could not add member. Please try again.",
        variant: "destructive"
      });
    }
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(circle.invite_code);
    toast({
      title: "Copied!",
      description: "Invite code copied to clipboard.",
    });
  };

  const handleRemoveMember = async (memberId: number, memberName: string) => {
    try {
      const { error } = await supabase
        .from('circle_memberships')
        .delete()
        .eq('id', memberId);

      if (error) throw error;

      setMembers(members.filter(m => m.id !== memberId));
      toast({
        title: "Success",
        description: `Removed ${memberName} from the circle.`,
      });
    } catch (error) {
      console.error('Error removing member:', error);
      toast({
        title: "Error",
        description: "Could not remove member. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Edit Circle: {circle.name}</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Circle Details</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="circle-name">Circle Name</Label>
                <Input
                  id="circle-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter circle name"
                />
              </div>

              <div>
                <Label htmlFor="circle-description">Description</Label>
                <Textarea
                  id="circle-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter circle description"
                  rows={3}
                />
              </div>

              <div>
                <Label>Invite Code</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input value={circle.invite_code} readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyInviteCode}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Share this code with others so they can join your circle
                </p>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-4">
            <div className="space-y-4">
              {/* Add new member */}
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3 flex items-center">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New Member
                </h4>
                <div className="flex space-x-2">
                  <Input
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Enter member name"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddMember()}
                  />
                  <Button onClick={handleAddMember}>
                    Add
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Members will be added as pending until they join using the invite code
                </p>
              </div>

              {/* Current members */}
              <div>
                <h4 className="font-medium mb-3">Current Members ({members.length})</h4>
                <div className="space-y-2">
                  {members.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No members yet</p>
                  ) : (
                    members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Users className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{member.user_name}</p>
                            <p className="text-sm text-gray-500">
                              {member.user_id ? 'Active member' : 'Pending invitation'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {member.user_id ? (
                            <Badge variant="secondary">Active</Badge>
                          ) : (
                            <Badge variant="outline">Pending</Badge>
                          )}
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveMember(member.id, member.user_name)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EditCircleDialog;
