import { Suspense } from "react";
import { fetchVolunteers } from "@/lib/volunteers/queries";
import AboutPageClient from "./AboutPageClient";

export default async function AboutPage() {
  const volunteers = await fetchVolunteers();
  return (
    <Suspense fallback={<div className="min-h-screen bg-light" />}>
      <AboutPageClient volunteers={volunteers} />
    </Suspense>
  );
}
