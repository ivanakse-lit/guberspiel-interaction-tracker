
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, Minus, Users, User } from 'lucide-react';

interface ValueSelectorProps {
  value: number;
  setValue: (value: number) => void;
  selectedPeople: string[];
  groupMemberCount?: number;
}

const ValueSelector = ({ value, setValue, selectedPeople, groupMemberCount = 4 }: ValueSelectorProps) => {
  const isEntireGroup = selectedPeople.includes('entire-group');
  const finalScore = isEntireGroup ? value * groupMemberCount : value;

  return (
    <div className="space-y-3">
      <Label>Impact Level</Label>
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

      {/* Score Calculation Display */}
      <div className="bg-gradient-to-r from-orange-50 to-rose-50 rounded-lg p-4 border border-orange-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {isEntireGroup ? (
              <>
                <Users className="h-4 w-4 text-emerald-600" />
                <span className="font-medium text-emerald-700">Group Benefit</span>
              </>
            ) : (
              <>
                <User className="h-4 w-4 text-indigo-600" />
                <span className="font-medium text-indigo-700">Individual Benefit</span>
              </>
            )}
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-orange-600">+{finalScore}</div>
            <div className="text-xs text-gray-500">points</div>
          </div>
        </div>
        
        {isEntireGroup && (
          <div className="text-sm text-gray-600">
            {value} × {groupMemberCount} members = {finalScore} points
          </div>
        )}
      </div>

      <p className="text-sm text-gray-600">
        1 = Small help, 2 = Significant support, 3+ = Major contribution
      </p>
    </div>
  );
};

export default ValueSelector;
