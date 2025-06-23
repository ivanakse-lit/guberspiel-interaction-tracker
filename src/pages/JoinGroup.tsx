
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Users, Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const JoinGroup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [inviteLink, setInviteLink] = useState('');
  const [yourName, setYourName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteLink.trim() || !yourName.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter both the invite link and your name.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Joined group!",
      description: "You've successfully joined the group.",
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
          <h1 className="text-xl font-bold text-gray-900">Join Group</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-lg mx-auto">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <CardTitle>Join an Existing Group</CardTitle>
              <p className="text-gray-600">Enter the invite link you received to join a group</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Your Name */}
                <div className="space-y-2">
                  <Label htmlFor="yourName">Your Name *</Label>
                  <Input
                    id="yourName"
                    placeholder="Enter your name"
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                    className="bg-white/70"
                  />
                </div>

                {/* Invite Link */}
                <div className="space-y-2">
                  <Label htmlFor="inviteLink">Invite Link *</Label>
                  <div className="relative">
                    <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="inviteLink"
                      placeholder="https://guberspiel.app/join/..."
                      value={inviteLink}
                      onChange={(e) => setInviteLink(e.target.value)}
                      className="bg-white/70 pl-10"
                    />
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• You'll be added to the group immediately</li>
                    <li>• Start logging your interactions with group members</li>
                    <li>• View your balance and group dynamics</li>
                    <li>• Help create a more balanced social environment</li>
                  </ul>
                </div>

                {/* Submit */}
                <Button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  size="lg"
                >
                  Join Group
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Alternative */}
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Don't have an invite link?</p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/create-group')}
              className="bg-white/70 backdrop-blur-sm"
            >
              Create Your Own Group
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinGroup;
