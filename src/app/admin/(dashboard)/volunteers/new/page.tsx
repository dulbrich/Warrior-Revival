import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/role";
import VolunteerForm from "../VolunteerForm";
import { createVolunteerAction } from "../actions";

export default async function NewVolunteerPage() {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin?error=admins_only");
  }
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:px-8">
      <div className="mb-6">
        <a
          href="/admin/volunteers"
          className="text-sm text-textSecondary hover:text-primary"
        >
          ← Back to volunteers
        </a>
        <h1 className="mt-2 font-blackOps text-3xl font-normal text-primary md:text-4xl">
          New volunteer
        </h1>
        <p className="mt-2 text-sm text-textSecondary">
          They&apos;ll appear at the bottom of the /about list. Reorder with
          the up/down arrows on the list page.
        </p>
      </div>
      <VolunteerForm mode="create" action={createVolunteerAction} />
    </main>
  );
}
