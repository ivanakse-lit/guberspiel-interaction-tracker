
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DateSelectorProps {
  interactionDate: Date;
  setInteractionDate: (date: Date) => void;
}

const DateSelector = ({ interactionDate, setInteractionDate }: DateSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>When did this happen? *</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal bg-white/70",
              !interactionDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {interactionDate ? format(interactionDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={interactionDate}
            onSelect={(date) => date && setInteractionDate(date)}
            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <p className="text-sm text-gray-600">
        You can backdate this interaction if it happened earlier
      </p>
    </div>
  );
};

export default DateSelector;
