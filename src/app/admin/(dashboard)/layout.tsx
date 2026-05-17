import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// Defense-in-depth: middleware already gates /admin, but if it ever misses
// (e.g. someone disables the matcher) the layout itself bounces non-admins.
export default async function AdminDashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-light">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <a
            href="/admin"
            className="font-heading text-xl font-semibold text-primary"
          >
            Warrior Revival admin
          </a>
          <div className="flex items-center gap-4 text-sm text-textSecondary">
            <span className="hidden sm:inline">{user.email}</span>
            <form action="/admin/logout" method="POST">
              <button
                type="submit"
                className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition hover:border-primary hover:text-primary"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
