import { formatBytes, getProjectStorageUsage } from "@/lib/storage/usage";

// Server component: renders project-wide Supabase Storage usage as a
// colored bar + per-bucket breakdown. Calls listBuckets() under the hood,
// so it requires the service-role key — render only inside admin pages.
export default async function StorageUsageBar() {
  let usage;
  try {
    usage = await getProjectStorageUsage();
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return (
      <div className="rounded-2xl border border-warning/40 bg-warning/10 px-4 py-3 text-sm text-warning">
        Couldn&apos;t read storage usage: {message}
      </div>
    );
  }

  const tone =
    usage.percentage >= 85
      ? "bg-red-500"
      : usage.percentage >= 60
        ? "bg-warning"
        : "bg-success";

  return (
    <section className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-heading text-base font-semibold text-primary">
          Supabase Storage
        </p>
        <p className="text-sm text-textSecondary">
          <span className="font-semibold text-textPrimary">
            {formatBytes(usage.usedBytes)}
          </span>{" "}
          of {formatBytes(usage.limitBytes)} (
          {usage.percentage.toFixed(2)}%)
        </p>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-border">
        <div
          className={`h-full ${tone} transition-all`}
          style={{
            width: `${Math.min(100, Math.max(0.5, usage.percentage))}%`
          }}
        />
      </div>
      {usage.bucketBreakdown.length > 0 ? (
        <dl className="mt-4 grid gap-1 text-xs text-textSecondary sm:grid-cols-2">
          {usage.bucketBreakdown.map((b) => (
            <div key={b.name} className="flex items-baseline justify-between gap-3">
              <dt className="truncate">{b.name}</dt>
              <dd className="font-semibold text-textPrimary">
                {formatBytes(b.bytes)}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}
