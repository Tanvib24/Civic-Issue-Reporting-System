import { createClient } from '@supabase/supabase-js';

// Prefer environment variables if present
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  role:  'staff' | 'admin';
  points: number;
  department_id: string | null;
  created_at: string;
  updated_at: string;
};
