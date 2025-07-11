
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Users, Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { joinCircle } from '@/services/circleService'
import { useAuth } from '@/contexts/AuthContext';

/**
 * Join Group page component
 * Allows users to join existing circles using invite links
 * Handles form validation and circle joining process
 */
const JoinGroup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Form state management
  const [loading, setLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [yourName, setYourName] = useState('');

  /**
   * Handle form submission to join a circle
   * Validates input, extracts invite code, and calls join service
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!inviteLink.trim() || !yourName.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter both the invite link and your name.",
        variant: "destructive"
      });
      return;
    }

    // Authentication check
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to join a circle.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    // Extract invite code from full link (supports both full URLs and direct codes)
    const inviteCode = inviteLink.split('/').pop() || inviteLink;

    setLoading(true);
    try {
      await joinCircle(inviteCode, yourName);
      
      toast({
        title: "Joined circle!",
        description: "You've successfully joined the circle.",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error joining circle",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header with back navigation */}
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
          <h1 className="text-xl font-bold text-gray-900">Join Circle</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-lg mx-auto">
          {/* Main form card */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="text-center">
              {/* Icon and title */}
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <CardTitle>Join an Existing Circle</CardTitle>
              <p className="text-gray-600">Enter the invite link you received to join a circle</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User name input */}
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

                {/* Invite link input */}
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

                {/* Information box about the joining process */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• You'll be added to the circle immediately</li>
                    <li>• Start logging your interactions with circle members</li>
                    <li>• View your balance and circle dynamics</li>
                    <li>• Help create a more balanced social environment</li>
                  </ul>
                </div>

                {/* Submit button */}
                <Button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? 'Joining Circle...' : 'Join Circle'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Alternative action */}
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Don't have an invite link?</p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/create-group')}
              className="bg-white/70 backdrop-blur-sm"
            >
              Create Your Own Circle
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinGroup;
