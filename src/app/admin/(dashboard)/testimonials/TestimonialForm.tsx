import type { TestimonialRow } from "@/lib/testimonials/types";

type Props = {
  mode: "create" | "edit";
  action: (formData: FormData) => void | Promise<void>;
  defaults?: TestimonialRow;
};

export default function TestimonialForm({ mode, action, defaults }: Props) {
  return (
    <form action={action} className="space-y-6">
      {mode === "edit" && defaults ? (
        <input type="hidden" name="id" value={defaults.id} />
      ) : null}

      <section className="rounded-2xl border border-border bg-surface p-6 shadow-card">
        <h2 className="font-heading text-lg font-semibold text-primary">Quote</h2>
        <p className="mt-1 text-sm text-textSecondary">
          Renders verbatim in the &ldquo;What Our Members Say&rdquo; carousel on
          /veterans. Up to 2,000 characters.
        </p>
        <div className="mt-4">
          <textarea
            name="quote"
            required
            rows={7}
            maxLength={2000}
            defaultValue={defaults?.quote ?? ""}
            placeholder="What did the member say?"
            className="block w-full resize-y rounded-md border border-border bg-white px-3 py-2 text-base text-textPrimary placeholder:text-textSecondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
        </div>
      </section>

      <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
        <a
          href="/admin/testimonials"
          className="rounded-md border border-border px-4 py-2 text-sm font-semibold uppercase tracking-wide text-textSecondary transition hover:border-primary hover:text-primary"
        >
          Cancel
        </a>
        <button
          type="submit"
          className="rounded-md bg-accent px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {mode === "create" ? "Create testimonial" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
