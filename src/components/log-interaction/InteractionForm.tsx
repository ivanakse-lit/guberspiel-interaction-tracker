
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface InteractionFormProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

const InteractionForm = ({ title, setTitle, description, setDescription }: InteractionFormProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          placeholder="e.g., Did the dishes, Cleaned common areas, Emotional support, Made dinner for everyone"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-white/70"
        />
        <p className="text-xs text-gray-600">
          Tip: Actions that benefit the whole group (like cleaning shared spaces) score higher!
        </p>
      </div>

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
    </>
  );
};

export default InteractionForm;
