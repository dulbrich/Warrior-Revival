import Image from "next/image";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/role";

// Defense-in-depth: middleware already gates /admin, but if the matcher is
// ever misconfigured the layout itself bounces visitors without a role.
export default async function AdminDashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user || !user.role) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-light">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
          <div className="flex items-center gap-6">
            <a
              href="/admin"
              className="flex items-center gap-3 font-heading text-xl font-semibold text-primary"
            >
              <Image
                src="/logo.webp"
                alt="Warrior Revival logo"
                width={40}
                height={40}
                className="h-10 w-10"
                priority
              />
              <span>Warrior Revival admin</span>
            </a>
            <nav className="hidden items-center gap-4 text-sm font-semibold md:flex">
              <a
                href="/admin/events"
                className="text-textSecondary transition hover:text-primary"
              >
                Events
              </a>
              {user.role === "admin" ? (
                <>
                  <a
                    href="/admin/volunteers"
                    className="text-textSecondary transition hover:text-primary"
                  >
                    Volunteers
                  </a>
                  <a
                    href="/admin/testimonials"
                    className="text-textSecondary transition hover:text-primary"
                  >
                    Testimonials
                  </a>
                  <a
                    href="/admin/gallery"
                    className="text-textSecondary transition hover:text-primary"
                  >
                    Gallery
                  </a>
                  <a
                    href="/admin/users"
                    className="text-textSecondary transition hover:text-primary"
                  >
                    Users
                  </a>
                </>
              ) : null}
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm text-textSecondary">
            <span className="hidden sm:inline">{user.email}</span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
              {user.role}
            </span>
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
