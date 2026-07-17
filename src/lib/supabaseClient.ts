import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!supabaseConfigured) {
  // Loud warning in the console rather than a silent failure — makes it obvious
  // during setup if the .env file / Vercel env vars haven't been configured yet.
  console.warn(
    '[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. ' +
      'Copy .env.example to .env.local, fill in your project credentials, and restart `npm run dev`.'
  );
}

// createClient() throws immediately if given an empty/invalid URL, which would
// crash the whole app (blank white screen) before React even renders. Falling
// back to a syntactically-valid placeholder URL means the app still boots —
// Supabase calls will just fail gracefully at request time instead.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);
