
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jqebudjmyxhtsamrzkfm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZWJ1ZGpteXhodHNhbXJ6a2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MzMwMjIsImV4cCI6MjA2NzUwOTAyMn0.KO5bNWA-LsOrPppdQcvdg9IWmjukxDl-qTFXOLaukXE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
