import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/role";
import { fetchTestimonialsRaw } from "@/lib/testimonials/queries";
import type { TestimonialRow } from "@/lib/testimonials/types";
import {
  deleteTestimonialAction,
  reorderTestimonialAction
} from "./actions";

export default async function AdminTestimonialsPage() {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin?error=admins_only");
  }
  const rows = await fetchTestimonialsRaw();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-accent text-sm uppercase tracking-[0.3em] text-secondary">
            Testimonials
          </p>
          <h1 className="mt-2 font-blackOps text-3xl font-normal text-primary md:text-4xl">
            Manage testimonials
          </h1>
          <p className="mt-2 text-sm text-textSecondary">
            Quotes shown in the &ldquo;What Our Members Say&rdquo; carousel on
            /veterans. Reorder with the up/down arrows.
          </p>
        </div>
        <a
          href="/admin/testimonials/new"
          className="rounded-md bg-accent px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-accent/90"
        >
          + New testimonial
        </a>
      </div>

      <section className="mt-8 space-y-3">
        {rows.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-surface px-5 py-8 text-center text-sm text-textSecondary">
            No testimonials yet.
          </p>
        ) : (
          rows.map((row, index) => (
            <Row
              key={row.id}
              row={row}
              isFirst={index === 0}
              isLast={index === rows.length - 1}
            />
          ))
        )}
      </section>
    </main>
  );
}

function Row({
  row,
  isFirst,
  isLast
}: {
  row: TestimonialRow;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 shadow-soft sm:flex-row sm:items-start">
      <div className="min-w-0 flex-1">
        <p className="line-clamp-4 text-sm text-textPrimary">{row.quote}</p>
      </div>
      <div className="flex flex-shrink-0 flex-wrap items-center gap-2 sm:flex-col">
        <div className="flex items-center gap-1">
          <ReorderButton id={row.id} direction="up" disabled={isFirst} />
          <ReorderButton id={row.id} direction="down" disabled={isLast} />
        </div>
        <a
          href={`/admin/testimonials/${row.id}`}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-textSecondary transition hover:border-primary hover:text-primary"
        >
          Edit
        </a>
        <form action={deleteTestimonialAction} className="inline">
          <input type="hidden" name="id" value={row.id} />
          <button
            type="submit"
            className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-textSecondary transition hover:border-red-500 hover:text-red-600"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}

function ReorderButton({
  id,
  direction,
  disabled
}: {
  id: string;
  direction: "up" | "down";
  disabled: boolean;
}) {
  return (
    <form action={reorderTestimonialAction} className="inline">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="direction" value={direction} />
      <button
        type="submit"
        disabled={disabled}
        aria-label={direction === "up" ? "Move up" : "Move down"}
        className="rounded-md border border-border px-2 py-1.5 text-sm text-textSecondary transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-textSecondary"
      >
        {direction === "up" ? "↑" : "↓"}
      </button>
    </form>
  );
}
