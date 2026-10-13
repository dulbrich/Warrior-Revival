// Supabase keeps the recovery intent with the PKCE verifier, even when an
// email template drops the application's `next` query parameter.
export function getAuthCallbackPath(
  next: string | null,
  redirectType: string | null
): string {
  if (redirectType === "recovery") return "/admin/reset-password";

  // Only allow local admin paths; never send an auth session to another origin.
  if (next && /^\/admin(?:\/[^\\?#]*)?$/.test(next)) return next;

  return "/admin";
}
