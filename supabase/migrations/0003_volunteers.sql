-- Volunteers list for the public /about page, managed via /admin/volunteers.
-- Public read for everyone, mutations admin-only. Images live in the
-- public-images bucket under the about/volunteers/ prefix.

create table volunteers (
  id             uuid primary key default gen_random_uuid(),
  first_name     text not null,
  last_initial   text not null default '',
  branch         text not null,
  image_path     text,
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index volunteers_sort_order_idx on volunteers (sort_order);

-- Reuse the set_updated_at() function defined in 0001_events.sql.
create trigger volunteers_set_updated_at
  before update on volunteers
  for each row
  execute function set_updated_at();

alter table volunteers enable row level security;

create policy "anon and authenticated can read volunteers"
  on volunteers for select
  to anon, authenticated
  using (true);

create policy "admins can insert volunteers"
  on volunteers for insert
  to authenticated
  with check (is_admin());

create policy "admins can update volunteers"
  on volunteers for update
  to authenticated
  using (is_admin())
  with check (is_admin());

create policy "admins can delete volunteers"
  on volunteers for delete
  to authenticated
  using (is_admin());

-- Storage policies for the public-images bucket, scoped to about/volunteers/*.
-- Public read so /about can render <Image> tags without auth; mutations admin-only.
create policy "anyone can read about/volunteers/*"
  on storage.objects for select
  to anon, authenticated
  using (
    bucket_id = 'public-images'
    and (storage.foldername(name))[1] = 'about'
    and (storage.foldername(name))[2] = 'volunteers'
  );

create policy "admins can upload about/volunteers/*"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'public-images'
    and (storage.foldername(name))[1] = 'about'
    and (storage.foldername(name))[2] = 'volunteers'
    and is_admin()
  );

create policy "admins can update about/volunteers/*"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'public-images'
    and (storage.foldername(name))[1] = 'about'
    and (storage.foldername(name))[2] = 'volunteers'
    and is_admin()
  );

create policy "admins can delete about/volunteers/*"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'public-images'
    and (storage.foldername(name))[1] = 'about'
    and (storage.foldername(name))[2] = 'volunteers'
    and is_admin()
  );
