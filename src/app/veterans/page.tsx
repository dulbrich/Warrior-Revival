import { Suspense } from "react";
import { fetchTestimonials } from "@/lib/testimonials/queries";
import VeteransPageClient from "./VeteransPageClient";

export default async function VeteransPage() {
  const testimonials = await fetchTestimonials();
  return (
    <Suspense fallback={<div className="min-h-screen bg-light" />}>
      <VeteransPageClient testimonials={testimonials} />
    </Suspense>
  );
}
