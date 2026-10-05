import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthCallbackPath } from "@/lib/auth/callback";

// Exchanges an emailed Supabase auth code (recovery or invitation) for a
// session, then redirects to the requested admin destination. Middleware and
// server-side role guards remain responsible for admin authorization.
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const next = request.nextUrl.searchParams.get("next");

  if (code) {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // auth-js returns the PKCE redirect type at runtime, but its public
      // AuthTokenResponse type currently omits that field.
      const redirectType =
        "redirectType" in data && typeof data.redirectType === "string"
          ? data.redirectType
          : null;
      const url = request.nextUrl.clone();
      url.pathname = getAuthCallbackPath(next, redirectType);
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = "";
  url.searchParams.set("error", "callback_failed");
  return NextResponse.redirect(url);
}
