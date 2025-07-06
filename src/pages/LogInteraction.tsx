
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import InteractionTypeSelector from '@/components/log-interaction/InteractionTypeSelector';
import DateSelector from '@/components/log-interaction/DateSelector';
import InteractionForm from '@/components/log-interaction/InteractionForm';
import GroupSelector from '@/components/log-interaction/GroupSelector';
import PeopleSelector from '@/components/log-interaction/PeopleSelector';
import ValueSelector from '@/components/log-interaction/ValueSelector';

const LogInteraction = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [interactionType, setInteractionType] = useState('give');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [value, setValue] = useState(1);
  const [interactionDate, setInteractionDate] = useState<Date>(new Date());

  // Mock data
  const groups = [
    { id: 'flatmates', name: 'Flatmates' },
    { id: 'study-group', name: 'Study Group' },
    { id: 'family', name: 'Family' },
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !selectedGroup || selectedPeople.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const isEntireGroup = selectedPeople.includes('entire-group');
    const groupMemberCount = getGroupMemberCount(selectedGroup);
    const finalScore = isEntireGroup ? value * groupMemberCount : value;

    toast({
      title: "Care interaction logged!",
      description: `Successfully recorded your act of care (+${finalScore} points) on ${format(interactionDate, 'PPP')}.`,
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
                  groups={groups}
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
                >
                  Log Care Given
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
