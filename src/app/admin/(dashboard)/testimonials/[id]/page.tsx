import { notFound, redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/role";
import { fetchTestimonialById } from "@/lib/testimonials/queries";
import TestimonialForm from "../TestimonialForm";
import { updateTestimonialAction } from "../actions";

export default async function EditTestimonialPage({
  params
}: {
  params: { id: string };
}) {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin?error=admins_only");
  }
  const row = await fetchTestimonialById(params.id);
  if (!row) notFound();
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:px-8">
      <div className="mb-6">
        <a
          href="/admin/testimonials"
          className="text-sm text-textSecondary hover:text-primary"
        >
          ← Back to testimonials
        </a>
        <h1 className="mt-2 font-blackOps text-3xl font-normal text-primary md:text-4xl">
          Edit testimonial
        </h1>
      </div>
      <TestimonialForm
        mode="edit"
        defaults={row}
        action={updateTestimonialAction}
      />
    </main>
  );
}
