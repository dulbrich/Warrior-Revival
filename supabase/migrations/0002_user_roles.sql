-- Two-role authorization for the admin area: 'admin' and 'contributor'. Role
-- lives in auth.users.app_metadata.role and is checked at the row level via
-- the helpers below. Anon read access (status = 'approved') is unchanged.

alter table events
  add column if not exists created_by uuid references auth.users(id) on delete set null;

-- Read role claim out of the current request's JWT. NULL for anon and for
-- authenticated users whose app_metadata has no role assigned yet.
create or replace function auth_role()
returns text
language sql
stable
as $$
  select auth.jwt() -> 'app_metadata' ->> 'role'
$$;

create or replace function is_admin()
returns boolean
language sql
stable
as $$
  select auth_role() = 'admin'
$$;

-- Drop the old single-tier mutate policies (created in 0001_events.sql).
drop policy if exists "authenticated can insert events" on events;
drop policy if exists "authenticated can update events" on events;
drop policy if exists "authenticated can delete events" on events;

-- Insert. Admins: anything. Contributors: only pending rows they own.
create policy "admins can insert events"
  on events for insert
  to authenticated
  with check (is_admin());

create policy "contributors can insert own pending events"
  on events for insert
  to authenticated
  with check (
    auth_role() = 'contributor'
    and status = 'pending'
    and created_by = auth.uid()
  );

-- Update. Admins: anything. Contributors: only their own pending rows, and
-- the row must remain pending (so they can't self-approve).
create policy "admins can update events"
  on events for update
  to authenticated
  using (is_admin())
  with check (is_admin());

create policy "contributors can update own pending events"
  on events for update
  to authenticated
  using (
    auth_role() = 'contributor'
    and created_by = auth.uid()
    and status = 'pending'
  )
  with check (
    auth_role() = 'contributor'
    and created_by = auth.uid()
    and status = 'pending'
  );

-- Delete is admin-only. (Admins normally use status = 'removed' instead;
-- delete is reserved for cleaning up data-entry mistakes.)
create policy "admins can delete events"
  on events for delete
  to authenticated
  using (is_admin());
