
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Group {
  id: string;
  name: string;
}

interface GroupSelectorProps {
  selectedGroup: string;
  setSelectedGroup: (group: string) => void;
  groups: Group[];
}

const GroupSelector = ({ selectedGroup, setSelectedGroup, groups }: GroupSelectorProps) => {
  return (
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
  );
};

export default GroupSelector;
