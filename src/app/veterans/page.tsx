import { Suspense } from "react";
import VeteransPageClient from "./VeteransPageClient";

export default function VeteransPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-light" />}>
      <VeteransPageClient />
    </Suspense>
  );
}
