
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { getUserCircles } from '@/services/circleService';

interface Group {
  id: string;
  name: string;
}

interface GroupSelectorProps {
  selectedGroup: string;
  setSelectedGroup: (group: string) => void;
  groups?: Group[]; // Make this optional since we'll fetch from database
}

const GroupSelector = ({ selectedGroup, setSelectedGroup }: GroupSelectorProps) => {
  const { user } = useAuth();

  // Fetch user's actual circles from the database
  const { data: userCircles = [], isLoading } = useQuery({
    queryKey: ['user-circles', user?.id],
    queryFn: getUserCircles,
    enabled: !!user?.id,
  });

  // Convert circles to the expected format
  const groups = userCircles.map(membership => ({
    id: membership.circle.id.toString(),
    name: membership.circle.name
  }));

  return (
    <div className="space-y-2">
      <Label>Group *</Label>
      <Select value={selectedGroup} onValueChange={setSelectedGroup}>
        <SelectTrigger className="bg-white/70">
          <SelectValue placeholder={isLoading ? "Loading groups..." : "Select a group"} />
        </SelectTrigger>
        <SelectContent>
          {isLoading ? (
            <SelectItem value="" disabled>
              Loading your circles...
            </SelectItem>
          ) : groups.length === 0 ? (
            <SelectItem value="" disabled>
              No circles found. Create a circle first.
            </SelectItem>
          ) : (
            groups.map((group) => (
              <SelectItem key={group.id} value={group.id}>
                {group.name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default GroupSelector;
