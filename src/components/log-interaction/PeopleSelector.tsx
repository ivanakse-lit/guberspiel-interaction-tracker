
import React from 'react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface Person {
  id: string;
  name: string;
  group: string;
}

interface PeopleSelectorProps {
  selectedGroup: string;
  selectedPeople: string[];
  setSelectedPeople: (people: string[]) => void;
  people: Person[];
  interactionType: string;
}

const PeopleSelector = ({ 
  selectedGroup, 
  selectedPeople, 
  setSelectedPeople, 
  people, 
  interactionType 
}: PeopleSelectorProps) => {
  const filteredPeople = selectedGroup ? people.filter(p => p.group === selectedGroup) : [];

  const togglePerson = (personId: string) => {
    setSelectedPeople(
      selectedPeople.includes(personId) 
        ? selectedPeople.filter(p => p !== personId)
        : [...selectedPeople, personId]
    );
  };

  if (!selectedGroup) return null;

  return (
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
  );
};

export default PeopleSelector;
