import { IMAGE_KEYS } from "@/lib/events/imageKeys";
import { EVENT_STATUSES } from "@/lib/events/schema";
import type { EventRow } from "@/lib/events/types";

type Props = {
  mode: "create" | "edit";
  action: (formData: FormData) => void | Promise<void>;
  defaults?: Partial<EventRow>;
};

// Renders the admin event form. Server-component-friendly: all controls are
// plain HTML and the form posts to a server action. Uncontrolled inputs with
// defaultValue keep the page fast and avoid client-side state.
export default function EventForm({ mode, action, defaults }: Props) {
  const v = defaults ?? {};
  return (
    <form action={action} className="space-y-8">
      {mode === "edit" && v.id ? (
        <input type="hidden" name="id" value={v.id} />
      ) : null}

      <Section title="Basics">
        <Field label="Name" required>
          <input
            name="name"
            required
            defaultValue={v.name ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Status">
          <select
            name="status"
            defaultValue={v.status ?? "pending"}
            className={inputClass}
          >
            {EVENT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Audience">
          <input
            name="audience"
            placeholder='e.g. "Veteran + Family"'
            defaultValue={v.audience ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Image">
          <select
            name="image_key"
            defaultValue={v.image_key ?? ""}
            className={inputClass}
          >
            <option value="">— None (uses logo) —</option>
            {IMAGE_KEYS.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </Field>
      </Section>

      <Section title="When">
        <Field label="Date" required>
          <input
            name="event_date"
            type="date"
            required
            defaultValue={v.event_date ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Start time">
          <input
            name="start_time"
            type="time"
            defaultValue={(v.start_time ?? "").slice(0, 5)}
            className={inputClass}
          />
        </Field>
        <Field label="End time">
          <input
            name="end_time"
            type="time"
            defaultValue={(v.end_time ?? "").slice(0, 5)}
            className={inputClass}
          />
        </Field>
        <Field label="Timezone">
          <input
            name="timezone"
            defaultValue={v.timezone ?? "America/Denver"}
            className={inputClass}
          />
        </Field>
      </Section>

      <Section title="Where">
        <Field label="Location" required>
          <input
            name="location"
            required
            placeholder='e.g. "Draper, UT"'
            defaultValue={v.location ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Street address">
          <input
            name="address"
            defaultValue={v.address ?? ""}
            className={inputClass}
          />
        </Field>
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="City">
            <input name="city" defaultValue={v.city ?? ""} className={inputClass} />
          </Field>
          <Field label="State">
            <input
              name="state"
              defaultValue={v.state ?? ""}
              className={inputClass}
            />
          </Field>
          <Field label="ZIP">
            <input name="zip" defaultValue={v.zip ?? ""} className={inputClass} />
          </Field>
        </div>
      </Section>

      <Section title="Details">
        <Field label="Description">
          <textarea
            name="description"
            rows={4}
            defaultValue={v.description ?? ""}
            className={`${inputClass} resize-y`}
          />
        </Field>
        <Field label="Cost">
          <input
            name="cost"
            placeholder='e.g. "Free" or "$25"'
            defaultValue={v.cost ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Registration link">
          <input
            name="register_link"
            type="url"
            placeholder="https://..."
            defaultValue={v.register_link ?? ""}
            className={inputClass}
          />
        </Field>
      </Section>

      <Section title="Host & contact">
        <Field label="Host name">
          <input
            name="host_name"
            defaultValue={v.host_name ?? ""}
            className={inputClass}
          />
        </Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Contact name">
            <input
              name="contact_name"
              defaultValue={v.contact_name ?? ""}
              className={inputClass}
            />
          </Field>
          <Field label="Contact phone">
            <input
              name="contact_phone"
              defaultValue={v.contact_phone ?? ""}
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
        <a
          href="/admin/events"
          className="rounded-md border border-border px-4 py-2 text-sm font-semibold uppercase tracking-wide text-textSecondary transition hover:border-primary hover:text-primary"
        >
          Cancel
        </a>
        <button
          type="submit"
          className="rounded-md bg-accent px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {mode === "create" ? "Create event" : "Save changes"}
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "block w-full rounded-md border border-border bg-white px-3 py-2 text-base text-textPrimary placeholder:text-textSecondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

function Section({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <h2 className="font-heading text-lg font-semibold text-primary">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  children
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-textPrimary">
        {label}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
