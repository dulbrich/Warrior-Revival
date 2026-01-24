export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-textSecondary md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-heading text-base font-semibold text-primary">Warrior Revival</p>
          <p className="text-xs uppercase tracking-[0.2em] text-textSecondary">Utah</p>
        </div>
        <p>Empowering veterans and families through adventure and belonging.</p>
        <button className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          Support the mission
        </button>
      </div>
    </footer>
  );
}
