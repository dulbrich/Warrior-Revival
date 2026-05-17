import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Runs on every request (see src/middleware.ts). Refreshes Supabase auth
// tokens via cookies so server components see a fresh session. Also gates
// /admin by role: any signed-in user with role 'admin' or 'contributor' can
// reach /admin/*; only admins can reach /admin/users*.
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({ request });
          response.cookies.set({ name, value: "", ...options });
        }
      }
    }
  );

  // Do not put any logic between createServerClient() and getUser() — it can
  // cause hard-to-debug session sync issues with @supabase/ssr.
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname.startsWith("/admin/login");
  const isAuthRoute = pathname.startsWith("/admin/auth");
  const isUsersRoute = pathname.startsWith("/admin/users");

  if (isAdminRoute && !isLoginRoute && !isAuthRoute) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    const meta = (user.app_metadata ?? {}) as { role?: string };
    const role = meta.role;
    if (role !== "admin" && role !== "contributor") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("error", "not_authorized");
      return NextResponse.redirect(url);
    }
    if (isUsersRoute && role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      url.searchParams.set("error", "admins_only");
      return NextResponse.redirect(url);
    }
  }

  return response;
}
