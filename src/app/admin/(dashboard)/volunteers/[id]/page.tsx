import { notFound, redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/role";
import { fetchVolunteerById } from "@/lib/volunteers/queries";
import VolunteerForm from "../VolunteerForm";
import { updateVolunteerAction } from "../actions";

export default async function EditVolunteerPage({
  params
}: {
  params: { id: string };
}) {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin?error=admins_only");
  }
  const row = await fetchVolunteerById(params.id);
  if (!row) notFound();
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
          Edit volunteer
        </h1>
        <p className="mt-1 text-sm text-textSecondary">{row.first_name}</p>
      </div>
      <VolunteerForm mode="edit" defaults={row} action={updateVolunteerAction} />
    </main>
  );
}
