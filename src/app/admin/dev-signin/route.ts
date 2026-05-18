import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

// Dev-only shortcut: generates a real Supabase magic-link token via the
// service-role admin API and redirects the browser through it, landing back
// at /admin/auth/callback with a real ?code= to exchange for a session.
// Skips the email round-trip without faking anything — RLS, auth.uid(),
// and role claims all still work as normal.
//
// Hard-gated to NODE_ENV=development. In production builds this returns 404.
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse("Not found", { status: 404 });
  }

  const email =
    request.nextUrl.searchParams.get("email") ?? process.env.DEV_AUTH_EMAIL ?? "";
  if (!email) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    url.searchParams.set("error", "dev_signin_email_missing");
    return NextResponse.redirect(url);
  }

  const admin = createSupabaseAdminClient();
  const callbackUrl = `${request.nextUrl.origin}/admin/auth/callback`;
  const { data, error } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: { redirectTo: callbackUrl }
  });

  if (error || !data.properties?.action_link) {
    console.error("[dev-signin] generateLink failed:", error?.message);
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    url.searchParams.set("error", "dev_signin_failed");
    return NextResponse.redirect(url);
  }

  // The browser follows this through Supabase's /auth/v1/verify endpoint,
  // which then 302s to callbackUrl with ?code=<...>. The existing callback
  // route handler exchanges that for cookies.
  return NextResponse.redirect(data.properties.action_link);
}
