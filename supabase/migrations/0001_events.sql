-- Warrior Revival events table. Source of truth for both the public events
-- page (anon reads, filtered to status = 'approved') and the /admin events UI
-- (authenticated reads + mutations).

create type event_status as enum ('pending', 'approved', 'removed');

create table events (
  id              uuid primary key default gen_random_uuid(),
  status          event_status not null default 'pending',
  name            text not null,
  description     text,
  event_date      date not null,
  start_time      time,
  end_time        time,
  timezone        text not null default 'America/Denver',
  location        text not null,
  address         text,
  city            text,
  state           text,
  zip             text,
  audience        text,
  image_key       text,
  register_link   text,
  cost            text,
  host_name       text,
  contact_name    text,
  contact_phone   text,
  notes           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  unique (name, event_date)
);

create index events_event_date_idx on events (event_date);
create index events_status_idx on events (status);

-- Auto-bump updated_at on any UPDATE.
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger events_set_updated_at
  before update on events
  for each row
  execute function set_updated_at();

-- Row-level security: public site uses the anon key and sees only approved
-- events; the /admin UI uses an authenticated session (Supabase Auth magic
-- link) and sees / mutates everything.
alter table events enable row level security;

create policy "anon and authenticated can read approved events"
  on events for select
  to anon, authenticated
  using (status = 'approved');

create policy "authenticated can read all events"
  on events for select
  to authenticated
  using (true);

create policy "authenticated can insert events"
  on events for insert
  to authenticated
  with check (true);

create policy "authenticated can update events"
  on events for update
  to authenticated
  using (true)
  with check (true);

create policy "authenticated can delete events"
  on events for delete
  to authenticated
  using (true);
