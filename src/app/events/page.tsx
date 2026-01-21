import { Suspense } from "react";
import EventsPageClient from "./EventsPageClient";

export default function EventsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-light" />}>
      <EventsPageClient />
    </Suspense>
  );
}
