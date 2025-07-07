
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import InteractionTypeSelector from '@/components/log-interaction/InteractionTypeSelector';
import DateSelector from '@/components/log-interaction/DateSelector';
import InteractionForm from '@/components/log-interaction/InteractionForm';
import GroupSelector from '@/components/log-interaction/GroupSelector';
import PeopleSelector from '@/components/log-interaction/PeopleSelector';
import ValueSelector from '@/components/log-interaction/ValueSelector';

const LogInteraction = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [interactionType, setInteractionType] = useState('give');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [value, setValue] = useState(1);
  const [interactionDate, setInteractionDate] = useState<Date>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data for people selection (this would come from the selected circle's members in a real app)
  const people = [
    { id: 'sarah', name: 'Sarah', group: 'flatmates' },
    { id: 'mike', name: 'Mike', group: 'flatmates' },
    { id: 'emma', name: 'Emma', group: 'study-group' },
    { id: 'james', name: 'James', group: 'study-group' },
    { id: 'mom', name: 'Mom', group: 'family' },
    { id: 'dad', name: 'Dad', group: 'family' },
  ];

  // Calculate group member count for scoring
  const getGroupMemberCount = (groupId: string) => {
    return people.filter(p => p.group === groupId).length;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to log interactions.",
        variant: "destructive"
      });
      return;
    }

    if (!title || !selectedGroup || selectedPeople.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const isEntireGroup = selectedPeople.includes('entire-group');
      const groupMemberCount = getGroupMemberCount(selectedGroup);
      const finalScore = isEntireGroup ? value * groupMemberCount : value;

      // For entire group interactions, we'll create one interaction record
      // For individual interactions, we'll create one record per selected person
      const interactionsToCreate = [];

      if (isEntireGroup) {
        // Create a single interaction for the entire group
        interactionsToCreate.push({
          circle_id: parseInt(selectedGroup),
          giver_id: user.id,
          receiver_id: null, // null indicates it's for the entire group
          description: title + (description ? ` - ${description}` : ''),
          points: finalScore,
          created_at: interactionDate.toISOString()
        });
      } else {
        // Create individual interactions for each selected person
        // For now, we'll create one interaction with null receiver_id since we don't have actual user IDs
        // In a real implementation, you'd map the selected people to actual user IDs
        interactionsToCreate.push({
          circle_id: parseInt(selectedGroup),
          giver_id: user.id,
          receiver_id: null, // Would be the actual receiver's user ID
          description: title + (description ? ` - ${description}` : ''),
          points: value,
          created_at: interactionDate.toISOString()
        });
      }

      // Insert the interactions into the database
      const { error } = await supabase
        .from('interactions')
        .insert(interactionsToCreate);

      if (error) {
        console.error('Error creating interaction:', error);
        toast({
          title: "Error logging interaction",
          description: "There was a problem saving your interaction. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Care interaction logged!",
        description: `Successfully recorded your act of care (+${finalScore} points) on ${format(interactionDate, 'PPP')}.`,
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting interaction:', error);
      toast({
        title: "Error logging interaction",
        description: "There was a problem saving your interaction. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
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
          <h1 className="text-xl font-bold text-gray-900">Log Care Given</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Record an Act of Care</CardTitle>
              <p className="text-gray-600 text-sm">
                Track the care and support you've given to others in your circles
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <InteractionTypeSelector 
                  interactionType={interactionType}
                  setInteractionType={setInteractionType}
                />

                <DateSelector 
                  interactionDate={interactionDate}
                  setInteractionDate={setInteractionDate}
                />

                <InteractionForm 
                  title={title}
                  setTitle={setTitle}
                  description={description}
                  setDescription={setDescription}
                />

                <GroupSelector 
                  selectedGroup={selectedGroup}
                  setSelectedGroup={setSelectedGroup}
                />

                <PeopleSelector 
                  selectedGroup={selectedGroup}
                  selectedPeople={selectedPeople}
                  setSelectedPeople={setSelectedPeople}
                  people={people}
                  interactionType={interactionType}
                />

                <ValueSelector 
                  value={value}
                  setValue={setValue}
                  selectedPeople={selectedPeople}
                  groupMemberCount={selectedGroup ? getGroupMemberCount(selectedGroup) : 4}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging...' : 'Log Care Given'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LogInteraction;
