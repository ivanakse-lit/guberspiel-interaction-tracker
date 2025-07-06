
import React from 'react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

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
  people 
}: PeopleSelectorProps) => {
  const filteredPeople = selectedGroup ? people.filter(p => p.group === selectedGroup) : [];

  const togglePerson = (personId: string) => {
    if (personId === 'entire-group') {
      // If selecting entire group, clear individual selections
      setSelectedPeople(
        selectedPeople.includes('entire-group') 
          ? []
          : ['entire-group']
      );
    } else {
      // If selecting individual, remove entire group and toggle individual
      const withoutEntireGroup = selectedPeople.filter(id => id !== 'entire-group');
      setSelectedPeople(
        withoutEntireGroup.includes(personId) 
          ? withoutEntireGroup.filter(p => p !== personId)
          : [...withoutEntireGroup, personId]
      );
    }
  };

  if (!selectedGroup) return null;

  return (
    <div className="space-y-2">
      <Label>Who benefited from your care? *</Label>
      <div className="space-y-2">
        {/* Entire Group Option */}
        <div
          onClick={() => togglePerson('entire-group')}
          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
            selectedPeople.includes('entire-group')
              ? 'bg-emerald-100 border-emerald-300'
              : 'bg-white/70 border-gray-200 hover:bg-white/90'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-emerald-600" />
              <span className="font-medium">Entire Group</span>
            </div>
            {selectedPeople.includes('entire-group') && (
              <Badge className="bg-emerald-600">Selected</Badge>
            )}
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Something that benefits everyone in the group (scores higher!)
          </p>
        </div>

        {/* Individual People */}
        {filteredPeople.map((person) => (
          <div
            key={person.id}
            onClick={() => togglePerson(person.id)}
            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
              selectedPeople.includes(person.id)
                ? 'bg-indigo-100 border-indigo-300'
                : 'bg-white/70 border-gray-200 hover:bg-white/90'
            } ${
              selectedPeople.includes('entire-group') ? 'opacity-50 cursor-not-allowed' : ''
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
