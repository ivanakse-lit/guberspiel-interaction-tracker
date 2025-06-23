
-- Add missing columns to the circle table
ALTER TABLE public.circle 
ADD COLUMN name TEXT NOT NULL DEFAULT '',
ADD COLUMN description TEXT,
ADD COLUMN invite_code TEXT UNIQUE NOT NULL DEFAULT '',
ADD COLUMN created_by UUID REFERENCES auth.users(id);

-- Add missing columns to the circle_memberships table  
ALTER TABLE public.circle_memberships
ADD COLUMN circle_id BIGINT REFERENCES public.circle(id) ON DELETE CASCADE,
ADD COLUMN user_id UUID REFERENCES auth.users(id),
ADD COLUMN user_name TEXT NOT NULL DEFAULT '',
ADD COLUMN joined_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Add missing columns to the interactions table
ALTER TABLE public.interactions
ADD COLUMN circle_id BIGINT REFERENCES public.circle(id) ON DELETE CASCADE,
ADD COLUMN giver_id UUID REFERENCES auth.users(id),
ADD COLUMN receiver_id UUID REFERENCES auth.users(id), 
ADD COLUMN description TEXT NOT NULL DEFAULT '',
ADD COLUMN points INTEGER NOT NULL DEFAULT 0;

-- Enable RLS on all tables
ALTER TABLE public.circle ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.circle_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for circle table
CREATE POLICY "Users can view circles they are members of" ON public.circle
FOR SELECT USING (
  id IN (
    SELECT circle_id FROM public.circle_memberships 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can create circles" ON public.circle
FOR INSERT WITH CHECK (created_by = auth.uid());

-- Create RLS policies for circle_memberships table
CREATE POLICY "Users can view memberships for their circles" ON public.circle_memberships
FOR SELECT USING (
  circle_id IN (
    SELECT circle_id FROM public.circle_memberships 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert memberships for circles they created" ON public.circle_memberships
FOR INSERT WITH CHECK (
  circle_id IN (
    SELECT id FROM public.circle 
    WHERE created_by = auth.uid()
  )
  OR user_id = auth.uid()
);

-- Create RLS policies for interactions table
CREATE POLICY "Users can view interactions in their circles" ON public.interactions
FOR SELECT USING (
  circle_id IN (
    SELECT circle_id FROM public.circle_memberships 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can create interactions in their circles" ON public.interactions
FOR INSERT WITH CHECK (
  circle_id IN (
    SELECT circle_id FROM public.circle_memberships 
    WHERE user_id = auth.uid()
  )
  AND giver_id = auth.uid()
);
