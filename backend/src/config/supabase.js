// backend/src/config/supabase.js
import { createClient } from '@supabase/supabase-js';
import { ENV } from './env.js';

// Admin client — uses service role key, bypasses RLS
// NEVER expose this key to the frontend
export const supabaseAdmin = createClient(
  ENV.SUPABASE_URL,
  ENV.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession:   false,
    },
  }
);

// Public client — uses anon key, respects RLS
// Used for verifying user JWT tokens
export const supabasePublic = createClient(
  ENV.SUPABASE_URL,
  ENV.SUPABASE_ANON_KEY
);
