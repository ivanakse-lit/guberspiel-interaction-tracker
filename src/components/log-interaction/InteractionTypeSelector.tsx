
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, Minus } from 'lucide-react';

interface InteractionTypeSelectorProps {
  interactionType: string;
  setInteractionType: (type: string) => void;
}

const InteractionTypeSelector = ({ interactionType, setInteractionType }: InteractionTypeSelectorProps) => {
  return (
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
  );
};

export default InteractionTypeSelector;
