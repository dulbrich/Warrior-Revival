export default function AdminHome() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <p className="font-accent text-sm uppercase tracking-[0.3em] text-secondary">
        Dashboard
      </p>
      <h1 className="mt-2 font-blackOps text-3xl font-normal text-primary md:text-4xl">
        Welcome back.
      </h1>

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
            Approve pending submissions, edit existing events, take events down.
          </p>
        </a>
      </div>
    </main>
  );
}
