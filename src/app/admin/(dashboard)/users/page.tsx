import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/role";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  deleteUserAction,
  inviteUserAction,
  setUserRoleAction
} from "./actions";

type UserRow = {
  id: string;
  email: string;
  role: "admin" | "contributor" | null;
  createdAt: string;
  lastSignInAt: string | null;
};

async function fetchUsers(): Promise<UserRow[]> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
  if (error) throw new Error(`User list failed: ${error.message}`);
  return data.users.map((u) => {
    const meta = (u.app_metadata ?? {}) as { role?: string };
    const role: UserRow["role"] =
      meta.role === "admin" || meta.role === "contributor" ? meta.role : null;
    return {
      id: u.id,
      email: u.email ?? "(no email)",
      role,
      createdAt: u.created_at ?? "",
      lastSignInAt: u.last_sign_in_at ?? null
    };
  });
}

export default async function AdminUsersPage() {
  let me;
  try {
    me = await requireAdmin();
  } catch {
    redirect("/admin?error=admins_only");
  }

  const users = await fetchUsers();
  const adminCount = users.filter((u) => u.role === "admin").length;
  const sorted = [...users].sort((a, b) => a.email.localeCompare(b.email));

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-accent text-sm uppercase tracking-[0.3em] text-secondary">
            Users
          </p>
          <h1 className="mt-2 font-blackOps text-3xl font-normal text-primary md:text-4xl">
            Manage users
          </h1>
          <p className="mt-2 text-sm text-textSecondary">
            Administrators can manage users and events. Contributors can submit
            events for approval and edit their own pending submissions.
          </p>
        </div>
      </div>

      <section className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-card">
        <h2 className="font-heading text-lg font-semibold text-primary">
          Invite a new user
        </h2>
        <p className="mt-1 text-sm text-textSecondary">
          They&apos;ll receive a sign-in link by email and land in the admin on
          first click.
        </p>
        <form action={inviteUserAction} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <input
            name="email"
            type="email"
            required
            placeholder="someone@example.com"
            className="rounded-md border border-border bg-white px-3 py-2 text-base text-textPrimary placeholder:text-textSecondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
          <select
            name="role"
            defaultValue="contributor"
            className="rounded-md border border-border bg-white px-3 py-2 text-base text-textPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <option value="contributor">Contributor</option>
            <option value="admin">Administrator</option>
          </select>
          <button
            type="submit"
            className="rounded-md bg-accent px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90"
          >
            Send invite
          </button>
        </form>
      </section>

      <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-textSecondary">
              <th className="px-5 py-3 font-semibold">Email</th>
              <th className="px-5 py-3 font-semibold">Role</th>
              <th className="px-5 py-3 font-semibold">Last sign-in</th>
              <th className="px-5 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((user) => {
              const isSelf = user.id === me.id;
              const isLastAdmin = user.role === "admin" && adminCount <= 1;
              return (
                <tr
                  key={user.id}
                  className="border-b border-border/80 text-sm text-textPrimary last:border-b-0"
                >
                  <td className="px-5 py-4">
                    <span className="font-semibold">{user.email}</span>
                    {isSelf ? (
                      <span className="ml-2 text-xs text-textSecondary">(you)</span>
                    ) : null}
                  </td>
                  <td className="px-5 py-4">
                    <form
                      action={setUserRoleAction}
                      className="flex items-center gap-2"
                    >
                      <input type="hidden" name="id" value={user.id} />
                      <select
                        name="role"
                        defaultValue={user.role ?? "contributor"}
                        disabled={isSelf || isLastAdmin}
                        className="rounded-md border border-border bg-white px-2 py-1 text-sm text-textPrimary disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <option value="contributor">Contributor</option>
                        <option value="admin">Administrator</option>
                      </select>
                      <button
                        type="submit"
                        disabled={isSelf || isLastAdmin}
                        className="rounded-md border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide text-textSecondary transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Save
                      </button>
                    </form>
                    {user.role === null ? (
                      <p className="mt-1 text-xs text-warning">
                        No role assigned — they can&apos;t access /admin.
                      </p>
                    ) : null}
                  </td>
                  <td className="px-5 py-4 text-textSecondary">
                    {user.lastSignInAt
                      ? new Date(user.lastSignInAt).toLocaleString()
                      : "Never"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <form action={deleteUserAction} className="inline">
                      <input type="hidden" name="id" value={user.id} />
                      <button
                        type="submit"
                        disabled={isSelf || isLastAdmin}
                        className="rounded-md border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide text-textSecondary transition hover:border-red-500 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
