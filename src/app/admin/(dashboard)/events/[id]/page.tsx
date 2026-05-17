import { notFound } from "next/navigation";
import { fetchEventById } from "@/lib/events/queries";
import EventForm from "../EventForm";
import { updateEventAction } from "../actions";

export default async function EditEventPage({
  params
}: {
  params: { id: string };
}) {
  const event = await fetchEventById(params.id);
  if (!event) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:px-8">
      <div className="mb-6">
        <a
          href="/admin/events"
          className="text-sm text-textSecondary hover:text-primary"
        >
          ← Back to events
        </a>
        <h1 className="mt-2 font-blackOps text-3xl font-normal text-primary md:text-4xl">
          Edit event
        </h1>
        <p className="mt-1 text-sm text-textSecondary">{event.name}</p>
      </div>
      <EventForm mode="edit" action={updateEventAction} defaults={event} />
    </main>
  );
}
