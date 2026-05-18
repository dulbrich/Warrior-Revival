import { redirect } from "next/navigation";
import EventForm from "../EventForm";
import { createEventAction } from "../actions";
import { getSessionUser } from "@/lib/auth/role";

export default async function NewEventPage() {
  const user = await getSessionUser();
  if (!user || !user.role) redirect("/admin/login");
  const canSetStatus = user.role === "admin";

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
          {canSetStatus ? (
            <>
              Status defaults to <span className="font-semibold">pending</span>{" "}
              — switch to <span className="font-semibold">approved</span> on
              this page to publish immediately.
            </>
          ) : (
            <>
              Your event will be submitted as{" "}
              <span className="font-semibold">pending</span> for an
              administrator to approve.
            </>
          )}
        </p>
      </div>
      <EventForm mode="create" action={createEventAction} canSetStatus={canSetStatus} />
    </main>
  );
}
