
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, ArrowUp, Calendar, Clock } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface RecentInteraction {
  id: number;
  description: string;
  points: number;
  created_at: string;
  circle: {
    name: string;
  };
  receiver_profile?: {
    user_name: string;
  };
}

/**
 * Component to display recent giving interactions/moments of care
 * Fetches real data from Supabase interactions table
 */
const RecentInteractions = () => {
  const { user } = useAuth();

  const { data: interactions = [], isLoading } = useQuery({
    queryKey: ['recent-interactions', user?.id],
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
        .order('created_at', { ascending: false })
        .limit(5);

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
            <Heart className="h-5 w-5 text-rose-500" />
            <span>Recent Care Given</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">Loading your interactions...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-gray-800">
          <Heart className="h-5 w-5 text-rose-500" />
          <span>Recent Care Given</span>
        </CardTitle>
        <p className="text-gray-600 text-sm">Your latest acts of kindness and support</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {interactions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No giving interactions yet. Start sharing moments of care!
          </p>
        ) : (
          <div className="space-y-4">
            {interactions.map((interaction) => (
              <div
                key={interaction.id}
                className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors bg-white/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="default"
                        className="flex items-center space-x-1 bg-green-100 text-green-800"
                      >
                        <ArrowUp className="h-3 w-3" />
                        <span>Gave</span>
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {interaction.circle?.name || 'Unknown Circle'}
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900">{interaction.description}</h4>
                      <p className="text-sm text-gray-600">
                        To {interaction.receiver_name}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {format(new Date(interaction.created_at), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDistanceToNow(new Date(interaction.created_at), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-orange-600">
                      +{interaction.points}
                    </div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentInteractions;
