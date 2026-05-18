import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type Role = "admin" | "contributor";

export type SessionUser = {
  id: string;
  email: string;
  role: Role | null;
};

// Reads the current Supabase session and extracts the role from app_metadata.
// Returns null if the visitor isn't authenticated. Use this everywhere the
// admin UI needs to know "who am I" — the middleware already verified the
// session is valid; this just exposes the typed user + role.
export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return null;
  const meta = (user.app_metadata ?? {}) as { role?: Role };
  const role: Role | null =
    meta.role === "admin" || meta.role === "contributor" ? meta.role : null;
  return { id: user.id, email: user.email ?? "", role };
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) throw new Error("Not authenticated");
  if (user.role !== "admin") throw new Error("Admin role required");
  return user;
}

export async function requireRole(allowed: Role[]): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) throw new Error("Not authenticated");
  if (!user.role || !allowed.includes(user.role)) {
    throw new Error("Insufficient role");
  }
  return user;
}
