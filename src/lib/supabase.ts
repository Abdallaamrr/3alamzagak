import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://glbixlrtxiwpmdrenwj.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsYml4bHJ0eGl3cHJtZHJlbndqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NjYwNTYsImV4cCI6MjEwNDQ0MjA1Nn0.-txdgerjH2dDfzTUYJjoRIVySXy7IEhKArYpAbYqr3A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
