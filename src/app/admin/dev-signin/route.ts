import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Dev-only shortcut: mints a magic-link token via the service-role API,
// then verifies it server-side with the cookie-integrated SSR client so
// session cookies are set in one step. No email round-trip, no PKCE
// dependency on a browser-initiated sign-in flow.
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
  const { data, error: linkError } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email
  });

  if (linkError || !data.properties?.hashed_token) {
    console.error("[dev-signin] generateLink failed:", linkError?.message);
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    url.searchParams.set("error", "dev_signin_failed");
    return NextResponse.redirect(url);
  }

  // Verify the hashed token directly via the SSR client. Its cookie handler
  // writes the session cookies onto the response stream for us. We skip the
  // browser → Supabase /auth/v1/verify → /admin/auth/callback chain entirely
  // because that path relies on a PKCE code_verifier cookie which only gets
  // set during a browser-initiated signInWithOtp().
  const supabase = createSupabaseServerClient();
  const { error: verifyError } = await supabase.auth.verifyOtp({
    type: "magiclink",
    token_hash: data.properties.hashed_token
  });

  if (verifyError) {
    console.error("[dev-signin] verifyOtp failed:", verifyError.message);
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    url.searchParams.set("error", "dev_signin_failed");
    return NextResponse.redirect(url);
  }

  const url = request.nextUrl.clone();
  url.pathname = "/admin";
  url.search = "";
  return NextResponse.redirect(url);
}
