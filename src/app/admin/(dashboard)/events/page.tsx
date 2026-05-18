import { redirect } from "next/navigation";
import { fetchAllEventsForAdmin } from "@/lib/events/queries";
import { eventRowToDisplay } from "@/lib/events/types";
import { getSessionUser } from "@/lib/auth/role";
import AdminEventsBoard from "./AdminEventsBoard";
import { STATUS_TABS, type StatusTab } from "./statusTabs";

export default async function AdminEventsPage({
  searchParams
}: {
  searchParams?: { status?: string };
}) {
  const user = await getSessionUser();
  if (!user || !user.role) redirect("/admin/login");

  const rows = await fetchAllEventsForAdmin();
  const events = rows.map(eventRowToDisplay);

  const requested = searchParams?.status;
  const initialStatus: StatusTab =
    (STATUS_TABS as readonly string[]).includes(requested ?? "")
      ? (requested as StatusTab)
      : "pending";

  return (
    <AdminEventsBoard
      events={events}
      initialStatus={initialStatus}
      viewerId={user.id}
      viewerRole={user.role}
    />
  );
}
