import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/role";

export default async function AdminHome({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  const user = await getSessionUser();
  if (!user || !user.role) redirect("/admin/login");

  const isAdmin = user.role === "admin";

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <p className="font-accent text-sm uppercase tracking-[0.3em] text-secondary">
        Dashboard
      </p>
      <h1 className="mt-2 font-blackOps text-3xl font-normal text-primary md:text-4xl">
        Welcome back.
      </h1>

      {searchParams?.error === "admins_only" ? (
        <p className="mt-4 max-w-xl rounded-md border border-warning/40 bg-warning/10 px-3 py-2 text-sm text-warning">
          That section is administrators-only.
        </p>
      ) : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <a
          href="/admin/events"
          className="rounded-2xl border border-border bg-surface p-6 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40"
        >
          <p className="font-accent text-xs uppercase tracking-[0.3em] text-secondary">
            Manage
          </p>
          <p className="mt-2 font-heading text-2xl font-semibold text-primary">
            Events
          </p>
          <p className="mt-2 text-sm text-textSecondary">
            {isAdmin
              ? "Approve pending submissions, edit existing events, take events down."
              : "Add a new event for an admin to approve, and edit your own pending submissions."}
          </p>
        </a>

        {isAdmin ? (
          <a
            href="/admin/volunteers"
            className="rounded-2xl border border-border bg-surface p-6 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40"
          >
            <p className="font-accent text-xs uppercase tracking-[0.3em] text-secondary">
              Manage
            </p>
            <p className="mt-2 font-heading text-2xl font-semibold text-primary">
              Volunteers
            </p>
            <p className="mt-2 text-sm text-textSecondary">
              Edit who shows up in the volunteers section of the /about page,
              and set their photo.
            </p>
          </a>
        ) : null}

        {isAdmin ? (
          <a
            href="/admin/testimonials"
            className="rounded-2xl border border-border bg-surface p-6 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40"
          >
            <p className="font-accent text-xs uppercase tracking-[0.3em] text-secondary">
              Manage
            </p>
            <p className="mt-2 font-heading text-2xl font-semibold text-primary">
              Testimonials
            </p>
            <p className="mt-2 text-sm text-textSecondary">
              Quotes that rotate in the &ldquo;What Our Members Say&rdquo;
              carousel on /veterans.
            </p>
          </a>
        ) : null}

        {isAdmin ? (
          <a
            href="/admin/gallery"
            className="rounded-2xl border border-border bg-surface p-6 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40"
          >
            <p className="font-accent text-xs uppercase tracking-[0.3em] text-secondary">
              Manage
            </p>
            <p className="mt-2 font-heading text-2xl font-semibold text-primary">
              Gallery
            </p>
            <p className="mt-2 text-sm text-textSecondary">
              Upload and remove photos that appear on the public /gallery page.
              Keep an eye on storage usage here too.
            </p>
          </a>
        ) : null}

        {isAdmin ? (
          <a
            href="/admin/users"
            className="rounded-2xl border border-border bg-surface p-6 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40"
          >
            <p className="font-accent text-xs uppercase tracking-[0.3em] text-secondary">
              Manage
            </p>
            <p className="mt-2 font-heading text-2xl font-semibold text-primary">
              Users
            </p>
            <p className="mt-2 text-sm text-textSecondary">
              Invite administrators or contributors, change roles, remove
              users.
            </p>
          </a>
        ) : null}
      </div>
    </main>
  );
}
