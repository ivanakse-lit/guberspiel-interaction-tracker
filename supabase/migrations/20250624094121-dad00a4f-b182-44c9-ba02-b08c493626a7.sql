
-- First, drop the existing problematic policies
DROP POLICY IF EXISTS "Users can view memberships for their circles" ON public.circle_memberships;
DROP POLICY IF EXISTS "Users can insert memberships for circles they created" ON public.circle_memberships;
DROP POLICY IF EXISTS "Users can view circles they are members of" ON public.circle;
DROP POLICY IF EXISTS "Users can view interactions in their circles" ON public.interactions;
DROP POLICY IF EXISTS "Users can create interactions in their circles" ON public.interactions;

-- Create security definer functions to avoid recursion
CREATE OR REPLACE FUNCTION public.user_is_circle_creator(circle_id BIGINT)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.circle 
    WHERE id = circle_id AND created_by = auth.uid()
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.user_is_circle_member(circle_id BIGINT)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.circle_memberships 
    WHERE circle_id = user_is_circle_member.circle_id AND user_id = auth.uid()
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create new policies using security definer functions
CREATE POLICY "Users can view circles they created or are members of" ON public.circle
FOR SELECT USING (
  created_by = auth.uid() OR 
  id IN (
    SELECT cm.circle_id FROM public.circle_memberships cm 
    WHERE cm.user_id = auth.uid()
  )
);

CREATE POLICY "Users can view memberships for circles they are in" ON public.circle_memberships
FOR SELECT USING (
  user_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.circle_memberships cm2 
    WHERE cm2.circle_id = circle_memberships.circle_id 
    AND cm2.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert memberships" ON public.circle_memberships
FOR INSERT WITH CHECK (
  user_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.circle 
    WHERE id = circle_memberships.circle_id 
    AND created_by = auth.uid()
  )
);

CREATE POLICY "Users can view interactions in their circles" ON public.interactions
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.circle_memberships cm 
    WHERE cm.circle_id = interactions.circle_id 
    AND cm.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create interactions in their circles" ON public.interactions
FOR INSERT WITH CHECK (
  giver_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM public.circle_memberships cm 
    WHERE cm.circle_id = interactions.circle_id 
    AND cm.user_id = auth.uid()
  )
);
