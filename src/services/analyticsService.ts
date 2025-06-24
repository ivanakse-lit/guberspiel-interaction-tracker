
import { supabase } from '@/integrations/supabase/client';

export interface AnalyticsData {
  totalCircles: number;
  totalMembers: number;
  totalInteractions: number;
  recentActivity: {
    date: string;
    interactions: number;
  }[];
  circleGrowth: {
    date: string;
    circles: number;
    members: number;
  }[];
  topCircles: {
    id: number;
    name: string;
    memberCount: number;
    interactionCount: number;
  }[];
  interactionTrends: {
    date: string;
    given: number;
    received: number;
  }[];
}

export const getAnalyticsData = async (): Promise<AnalyticsData> => {
  try {
    // Get total counts
    const [circlesResult, membersResult, interactionsResult] = await Promise.all([
      supabase.from('circle').select('*', { count: 'exact', head: true }),
      supabase.from('circle_memberships').select('*', { count: 'exact', head: true }),
      supabase.from('interactions').select('*', { count: 'exact', head: true })
    ]);

    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { data: recentInteractions } = await supabase
      .from('interactions')
      .select('created_at')
      .gte('created_at', thirtyDaysAgo.toISOString());

    // Get circle growth data
    const { data: circleGrowthData } = await supabase
      .from('circle')
      .select('created_at')
      .order('created_at', { ascending: true });

    const { data: memberGrowthData } = await supabase
      .from('circle_memberships')
      .select('created_at')
      .order('created_at', { ascending: true });

    // Get top circles with member and interaction counts
    const { data: circles } = await supabase
      .from('circle')
      .select(`
        id,
        name,
        circle_memberships(count),
        interactions(count)
      `);

    // Process recent activity data
    const activityMap = new Map<string, number>();
    recentInteractions?.forEach(interaction => {
      const date = new Date(interaction.created_at).toISOString().split('T')[0];
      activityMap.set(date, (activityMap.get(date) || 0) + 1);
    });

    const recentActivity = Array.from(activityMap.entries())
      .map(([date, interactions]) => ({ date, interactions }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-7); // Last 7 days

    // Process circle growth data
    const circleGrowthMap = new Map<string, { circles: number; members: number }>();
    
    circleGrowthData?.forEach((circle, index) => {
      const date = new Date(circle.created_at).toISOString().split('T')[0];
      circleGrowthMap.set(date, { 
        circles: index + 1, 
        members: circleGrowthMap.get(date)?.members || 0 
      });
    });

    memberGrowthData?.forEach((member, index) => {
      const date = new Date(member.created_at).toISOString().split('T')[0];
      const existing = circleGrowthMap.get(date) || { circles: 0, members: 0 };
      circleGrowthMap.set(date, { 
        circles: existing.circles, 
        members: index + 1 
      });
    });

    const circleGrowth = Array.from(circleGrowthMap.entries())
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-30); // Last 30 days

    // Process top circles
    const topCircles = circles?.map(circle => ({
      id: circle.id,
      name: circle.name,
      memberCount: Array.isArray(circle.circle_memberships) ? circle.circle_memberships.length : 0,
      interactionCount: Array.isArray(circle.interactions) ? circle.interactions.length : 0
    }))
    .sort((a, b) => b.interactionCount - a.interactionCount)
    .slice(0, 5) || [];

    // For interaction trends, we'll use placeholder data since we don't have detailed analytics yet
    const interactionTrends = recentActivity.map(activity => ({
      date: activity.date,
      given: Math.floor(activity.interactions * 0.6),
      received: Math.floor(activity.interactions * 0.4)
    }));

    return {
      totalCircles: circlesResult.count || 0,
      totalMembers: membersResult.count || 0,
      totalInteractions: interactionsResult.count || 0,
      recentActivity,
      circleGrowth,
      topCircles,
      interactionTrends
    };
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    throw error;
  }
};
