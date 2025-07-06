
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

interface InteractionTypeSelectorProps {
  interactionType: string;
  setInteractionType: (type: string) => void;
}

const InteractionTypeSelector = ({ interactionType, setInteractionType }: InteractionTypeSelectorProps) => {
  // Auto-select "give" since it's the only option
  React.useEffect(() => {
    if (!interactionType) {
      setInteractionType('give');
    }
  }, [interactionType, setInteractionType]);

  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Type of Interaction</Label>
      <div className="grid grid-cols-1 gap-4">
        <Button
          type="button"
          variant="default"
          className="h-20 flex-col bg-green-600 hover:bg-green-700"
          onClick={() => setInteractionType('give')}
        >
          <Plus className="h-6 w-6 mb-2" />
          I Gave Care
        </Button>
      </div>
      <p className="text-sm text-gray-600">
        Only giving interactions are tracked as they contribute to your connection score.
      </p>
    </div>
  );
};

export default InteractionTypeSelector;
