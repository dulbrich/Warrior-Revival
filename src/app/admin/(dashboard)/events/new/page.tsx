import EventForm from "../EventForm";
import { createEventAction } from "../actions";

export default function NewEventPage() {
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
          New event
        </h1>
        <p className="mt-2 text-sm text-textSecondary">
          Status defaults to <span className="font-semibold">pending</span> — switch to{" "}
          <span className="font-semibold">approved</span> on this page to publish
          immediately.
        </p>
      </div>
      <EventForm mode="create" action={createEventAction} />
    </main>
  );
}
