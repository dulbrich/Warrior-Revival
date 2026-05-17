import { Suspense } from "react";
import { fetchApprovedEvents } from "@/lib/events/queries";
import EventsPageClient from "./EventsPageClient";

export default async function EventsPage() {
  const events = await fetchApprovedEvents();
  return (
    <Suspense fallback={<div className="min-h-screen bg-light" />}>
      <EventsPageClient events={events} />
    </Suspense>
  );
}
