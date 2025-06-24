
-- First, completely drop all existing policies and functions to start fresh
DROP POLICY IF EXISTS "Users can view circles they created or are members of" ON public.circle;
DROP POLICY IF EXISTS "Users can view memberships for circles they are in" ON public.circle_memberships;
DROP POLICY IF EXISTS "Users can insert memberships" ON public.circle_memberships;
DROP POLICY IF EXISTS "Users can view interactions in their circles" ON public.interactions;
DROP POLICY IF EXISTS "Users can create interactions in their circles" ON public.interactions;

-- Also drop any remaining old policies
DROP POLICY IF EXISTS "Users can view memberships for their circles" ON public.circle_memberships;
DROP POLICY IF EXISTS "Users can insert memberships for circles they created" ON public.circle_memberships;
DROP POLICY IF EXISTS "Users can view circles they are members of" ON public.circle;
DROP POLICY IF EXISTS "Users can create circles" ON public.circle;

-- Drop existing functions
DROP FUNCTION IF EXISTS public.user_is_circle_creator(BIGINT);
DROP FUNCTION IF EXISTS public.user_is_circle_member(BIGINT);

-- Create improved security definer functions
CREATE OR REPLACE FUNCTION public.is_circle_creator(circle_id BIGINT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.circle 
    WHERE id = circle_id AND created_by = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_circle_member(circle_id BIGINT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.circle_memberships 
    WHERE circle_id = is_circle_member.circle_id AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Create simple, non-recursive policies for circle table
CREATE POLICY "Users can create circles" ON public.circle
FOR INSERT WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can view their own circles" ON public.circle
FOR SELECT USING (created_by = auth.uid());

CREATE POLICY "Users can view circles they are members of" ON public.circle
FOR SELECT USING (
  public.is_circle_member(id)
);

-- Create simple policies for circle_memberships table
CREATE POLICY "Users can view their own memberships" ON public.circle_memberships
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Circle creators can view all memberships" ON public.circle_memberships
FOR SELECT USING (
  public.is_circle_creator(circle_id)
);

CREATE POLICY "Users can join circles" ON public.circle_memberships
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Circle creators can add members" ON public.circle_memberships
FOR INSERT WITH CHECK (
  public.is_circle_creator(circle_id)
);

-- Create policies for interactions table
CREATE POLICY "Users can view interactions in their circles" ON public.interactions
FOR SELECT USING (
  public.is_circle_member(circle_id)
);

CREATE POLICY "Users can create interactions in their circles" ON public.interactions
FOR INSERT WITH CHECK (
  giver_id = auth.uid() AND public.is_circle_member(circle_id)
);
