import Image from "next/image";
import type { VolunteerRow } from "@/lib/volunteers/types";
import { volunteerRowToDisplay } from "@/lib/volunteers/types";

type Props = {
  mode: "create" | "edit";
  action: (formData: FormData) => void | Promise<void>;
  defaults?: VolunteerRow;
};

// Plain HTML form posting to a server action. Uncontrolled inputs + the
// multipart enctype so the <input type="file"> File survives into the action.
export default function VolunteerForm({ mode, action, defaults }: Props) {
  const display = defaults ? volunteerRowToDisplay(defaults) : null;
  const hasImage = Boolean(defaults?.image_path);

  return (
    <form action={action} encType="multipart/form-data" className="space-y-8">
      {mode === "edit" && defaults ? (
        <input type="hidden" name="id" value={defaults.id} />
      ) : null}

      <Section title="Basics">
        <Field label="First name" required>
          <input
            name="first_name"
            required
            defaultValue={defaults?.first_name ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Last initial">
          <input
            name="last_initial"
            maxLength={2}
            placeholder="e.g. B"
            defaultValue={defaults?.last_initial ?? ""}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-textSecondary">
            Displayed as <code>First L.</code> on the /about page. Leave blank to
            show first name only.
          </p>
        </Field>
        <Field label="Branch" required>
          <input
            name="branch"
            required
            placeholder='e.g. "U.S. Army" or "Volunteer"'
            defaultValue={defaults?.branch ?? ""}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-textSecondary">
            Always rendered in ALL CAPS regardless of how you type it.
          </p>
        </Field>
      </Section>

      <Section title="Photo">
        {display && hasImage ? (
          <div className="flex items-center gap-4">
            <Image
              src={display.imageUrl}
              alt=""
              width={96}
              height={96}
              className="h-24 w-24 rounded-full border border-border bg-white object-cover"
            />
            <div className="text-sm text-textSecondary">
              Current photo. Upload a new file below to replace it, or tick
              &quot;Remove image&quot; to revert to the Warrior Revival logo.
            </div>
          </div>
        ) : (
          <p className="text-sm text-textSecondary">
            No photo set. The Warrior Revival logo will be used until one is
            uploaded.
          </p>
        )}
        <Field label="Upload image">
          <input
            type="file"
            name="image"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="block w-full text-sm text-textSecondary file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-white hover:file:bg-primary/90"
          />
          <p className="mt-1 text-xs text-textSecondary">
            JPEG, PNG, WebP, or GIF. 5 MB max. Square photos render best
            (cards crop to a circle).
          </p>
        </Field>
        {mode === "edit" && hasImage ? (
          <label className="flex items-center gap-2 text-sm font-semibold text-textPrimary">
            <input
              type="checkbox"
              name="remove_image"
              className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-accent"
            />
            Remove current image (reverts to logo)
          </label>
        ) : null}
      </Section>

      <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
        <a
          href="/admin/volunteers"
          className="rounded-md border border-border px-4 py-2 text-sm font-semibold uppercase tracking-wide text-textSecondary transition hover:border-primary hover:text-primary"
        >
          Cancel
        </a>
        <button
          type="submit"
          className="rounded-md bg-accent px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {mode === "create" ? "Create volunteer" : "Save changes"}
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
