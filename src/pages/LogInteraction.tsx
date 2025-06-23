
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Minus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const LogInteraction = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [interactionType, setInteractionType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [value, setValue] = useState(1);

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

  const filteredPeople = selectedGroup ? people.filter(p => p.group === selectedGroup) : [];

  const togglePerson = (personId: string) => {
    setSelectedPeople(prev => 
      prev.includes(personId) 
        ? prev.filter(p => p !== personId)
        : [...prev, personId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !interactionType || !selectedGroup || selectedPeople.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Interaction logged!",
      description: `Successfully recorded your ${interactionType} interaction.`,
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
          <h1 className="text-xl font-bold text-gray-900">Log New Interaction</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Record an Interaction</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Interaction Type */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Type of Interaction</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant={interactionType === 'give' ? 'default' : 'outline'}
                      className={`h-20 flex-col ${interactionType === 'give' ? 'bg-green-600 hover:bg-green-700' : 'bg-white/70'}`}
                      onClick={() => setInteractionType('give')}
                    >
                      <Plus className="h-6 w-6 mb-2" />
                      I Gave
                    </Button>
                    <Button
                      type="button"
                      variant={interactionType === 'take' ? 'default' : 'outline'}
                      className={`h-20 flex-col ${interactionType === 'take' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white/70'}`}
                      onClick={() => setInteractionType('take')}
                    >
                      <Minus className="h-6 w-6 mb-2" />
                      I Received
                    </Button>
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Helped with moving, Emotional support, Made dinner"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-white/70"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Add more details about this interaction..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-white/70"
                    rows={3}
                  />
                </div>

                {/* Group Selection */}
                <div className="space-y-2">
                  <Label>Group *</Label>
                  <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                    <SelectTrigger className="bg-white/70">
                      <SelectValue placeholder="Select a group" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* People Selection */}
                {selectedGroup && (
                  <div className="space-y-2">
                    <Label>
                      {interactionType === 'give' ? 'Who received?' : 'Who gave?'} *
                    </Label>
                    <div className="space-y-2">
                      {filteredPeople.map((person) => (
                        <div
                          key={person.id}
                          onClick={() => togglePerson(person.id)}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedPeople.includes(person.id)
                              ? 'bg-indigo-100 border-indigo-300'
                              : 'bg-white/70 border-gray-200 hover:bg-white/90'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{person.name}</span>
                            {selectedPeople.includes(person.id) && (
                              <Badge className="bg-indigo-600">Selected</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Value */}
                <div className="space-y-2">
                  <Label>Value (Points)</Label>
                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setValue(Math.max(1, value - 1))}
                      className="bg-white/70"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-2xl font-bold text-indigo-600 min-w-[3rem] text-center">
                      {value}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setValue(value + 1)}
                      className="bg-white/70"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    1 = Small favor, 2 = Significant help, 3+ = Major support
                  </p>
                </div>

                {/* Submit */}
                <Button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  size="lg"
                >
                  Log Interaction
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
