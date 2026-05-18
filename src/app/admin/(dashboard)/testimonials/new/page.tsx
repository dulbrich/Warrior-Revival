import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/role";
import TestimonialForm from "../TestimonialForm";
import { createTestimonialAction } from "../actions";

export default async function NewTestimonialPage() {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin?error=admins_only");
  }
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
          New testimonial
        </h1>
        <p className="mt-2 text-sm text-textSecondary">
          Lands at the bottom of the carousel rotation. Reorder later from the
          list page.
        </p>
      </div>
      <TestimonialForm mode="create" action={createTestimonialAction} />
    </main>
  );
}
