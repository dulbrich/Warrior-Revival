import { Suspense } from "react";
import AboutPageClient from "./AboutPageClient";

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-light" />}>
      <AboutPageClient />
    </Suspense>
  );
}
