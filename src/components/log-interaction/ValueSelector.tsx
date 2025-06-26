
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, Minus } from 'lucide-react';

interface ValueSelectorProps {
  value: number;
  setValue: (value: number) => void;
}

const ValueSelector = ({ value, setValue }: ValueSelectorProps) => {
  return (
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
  );
};

export default ValueSelector;
