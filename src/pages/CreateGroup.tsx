
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Copy, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CreateGroup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [newMember, setNewMember] = useState('');
  const [inviteLink, setInviteLink] = useState('');

  const addMember = () => {
    if (newMember.trim() && !members.includes(newMember.trim())) {
      setMembers([...members, newMember.trim()]);
      setNewMember('');
    }
  };

  const removeMember = (member: string) => {
    setMembers(members.filter(m => m !== member));
  };

  const generateInviteLink = () => {
    const linkId = Math.random().toString(36).substring(2, 15);
    setInviteLink(`https://guberspiel.app/join/${linkId}`);
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast({
      title: "Link copied!",
      description: "Invite link has been copied to clipboard.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) {
      toast({
        title: "Group name required",
        description: "Please enter a name for your group.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Group created!",
      description: `${groupName} has been created successfully.`,
    });

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
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
          <h1 className="text-xl font-bold text-gray-900">Create New Group</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-indigo-600" />
                <span>Set Up Your Group</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Group Name */}
                <div className="space-y-2">
                  <Label htmlFor="groupName">Group Name *</Label>
                  <Input
                    id="groupName"
                    placeholder="e.g., Flatmates, Study Group, Family"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="bg-white/70"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="What's this group for? (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-white/70"
                    rows={3}
                  />
                </div>

                {/* Add Members */}
                <div className="space-y-3">
                  <Label>Add Members</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter name or email"
                      value={newMember}
                      onChange={(e) => setNewMember(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMember())}
                      className="bg-white/70"
                    />
                    <Button 
                      type="button" 
                      onClick={addMember}
                      variant="outline"
                      className="bg-white/70"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Members List */}
                  {members.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Group Members:</p>
                      <div className="flex flex-wrap gap-2">
                        {members.map((member, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary"
                            className="bg-indigo-100 text-indigo-700 flex items-center space-x-2"
                          >
                            <span>{member}</span>
                            <button
                              type="button"
                              onClick={() => removeMember(member)}
                              className="ml-1 hover:text-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Generate Invite Link */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Invite Link</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={generateInviteLink}
                      className="bg-white/70"
                    >
                      Generate Link
                    </Button>
                  </div>
                  
                  {inviteLink && (
                    <div className="flex space-x-2">
                      <Input
                        value={inviteLink}
                        readOnly
                        className="bg-gray-50"
                      />
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={copyInviteLink}
                        className="bg-white/70"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Info Box */}
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-medium text-indigo-900 mb-2">How Güberspiel Works</h4>
                  <ul className="text-sm text-indigo-700 space-y-1">
                    <li>• Track giving and receiving moments in your group</li>
                    <li>• Each interaction is worth 1-3 points based on significance</li>
                    <li>• See individual and group balance in real-time</li>
                    <li>• Encourage fairness and gratitude in relationships</li>
                  </ul>
                </div>

                {/* Submit */}
                <Button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  size="lg"
                >
                  Create Group
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
