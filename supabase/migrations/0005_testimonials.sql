-- Testimonials shown in the "What Our Members Say" carousel on /veterans.
-- Public read for everyone (the carousel is on the public site); mutations
-- admin-only, mirroring the volunteers pattern.

create table testimonials (
  id          uuid primary key default gen_random_uuid(),
  quote       text not null,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index testimonials_sort_order_idx on testimonials (sort_order);

-- Reuse set_updated_at() from 0001_events.sql.
create trigger testimonials_set_updated_at
  before update on testimonials
  for each row
  execute function set_updated_at();

alter table testimonials enable row level security;

create policy "anon and authenticated can read testimonials"
  on testimonials for select
  to anon, authenticated
  using (true);

create policy "admins can insert testimonials"
  on testimonials for insert
  to authenticated
  with check (is_admin());

create policy "admins can update testimonials"
  on testimonials for update
  to authenticated
  using (is_admin())
  with check (is_admin());

create policy "admins can delete testimonials"
  on testimonials for delete
  to authenticated
  using (is_admin());
