import { createBrowserClient } from "@supabase/ssr";

// Use in Client Components (e.g. the admin login form). Reads the anon key
// from NEXT_PUBLIC_ env vars and persists the auth session in cookies that
// the server-side helpers in ./server can also see.
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
