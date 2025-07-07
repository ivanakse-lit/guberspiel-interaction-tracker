
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { History, ArrowUp, Calendar, Users, Gift } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Interaction {
  id: number;
  description: string;
  points: number;
  created_at: string;
  circle: {
    name: string;
  };
  receiver_name: string;
}

const InteractionHistory = () => {
  const { user } = useAuth();

  const { data: interactions = [], isLoading } = useQuery({
    queryKey: ['interaction-history', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('interactions')
        .select(`
          id,
          description,
          points,
          created_at,
          receiver_id,
          circle:circle_id (
            name
          )
        `)
        .eq('giver_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching interactions:', error);
        return [];
      }

      // Get receiver names for the interactions
      const interactions_with_receivers = await Promise.all(
        (data || []).map(async (interaction) => {
          if (interaction.receiver_id) {
            const { data: membership } = await supabase
              .from('circle_memberships')
              .select('user_name')
              .eq('user_id', interaction.receiver_id)
              .single();
            
            return {
              ...interaction,
              receiver_name: membership?.user_name || 'Unknown'
            };
          }
          return { ...interaction, receiver_name: 'Unknown' };
        })
      );

      return interactions_with_receivers;
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-800">
            <History className="h-5 w-5 text-indigo-500" />
            <span>Your Giving History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">Loading your history...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-gray-800">
          <History className="h-5 w-5 text-indigo-500" />
          <span>Your Giving History</span>
        </CardTitle>
        <p className="text-gray-600 text-sm">Track all the care you've given to others</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {interactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No giving interactions yet. Start sharing moments of care!
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Type</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Circle</TableHead>
                  <TableHead>When</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interactions.map((interaction) => (
                  <TableRow key={interaction.id} className="hover:bg-gray-50/50">
                    <TableCell>
                      <Badge
                        variant="default"
                        className="flex items-center space-x-1 bg-green-100 text-green-800 hover:bg-green-200"
                      >
                        <ArrowUp className="h-3 w-3" />
                        <span>Gave</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">{interaction.description}</div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="h-3 w-3 mr-1" />
                          To {interaction.receiver_name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {interaction.circle?.name || 'Unknown Circle'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">
                          {format(new Date(interaction.created_at), 'MMM d, yyyy')}
                        </div>
                        <div className="text-xs text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDistanceToNow(new Date(interaction.created_at), { addSuffix: true })}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Gift className="h-4 w-4 text-orange-500" />
                        <span className="font-bold text-orange-600">
                          +{interaction.points}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractionHistory;
