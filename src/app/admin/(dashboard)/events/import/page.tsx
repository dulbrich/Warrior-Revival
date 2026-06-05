import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/role";
import ImportClient from "./ImportClient";

export default async function ImportEventsPage() {
  const user = await getSessionUser();
  if (!user || !user.role) redirect("/admin/login");
  const canPublish = user.role === "admin";

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
          Import events
        </h1>
        <p className="mt-2 text-sm text-textSecondary">
          Bulk-add events from a JSON file. Duplicates — same name and date,
          whether repeated in the file or already on the calendar — are detected
          and skipped.
        </p>
      </div>
      <ImportClient canPublish={canPublish} />
    </main>
  );
}
