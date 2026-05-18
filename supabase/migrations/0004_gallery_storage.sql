-- Storage policies for the public-images bucket, scoped to gallery/*.
-- No table — the bucket itself is the source of truth for gallery photos.
-- Public read everywhere; admin-only writes via the existing is_admin()
-- helper from 0002_user_roles.sql.

create policy "anyone can read gallery/*"
  on storage.objects for select
  to anon, authenticated
  using (
    bucket_id = 'public-images'
    and (storage.foldername(name))[1] = 'gallery'
  );

create policy "admins can upload gallery/*"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'public-images'
    and (storage.foldername(name))[1] = 'gallery'
    and is_admin()
  );

create policy "admins can update gallery/*"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'public-images'
    and (storage.foldername(name))[1] = 'gallery'
    and is_admin()
  );

create policy "admins can delete gallery/*"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'public-images'
    and (storage.foldername(name))[1] = 'gallery'
    and is_admin()
  );
