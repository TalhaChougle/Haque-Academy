-- ============================================================
-- Haque Academy — Supabase setup
-- Run this once in your Supabase project's SQL Editor
-- (Dashboard → SQL Editor → New query → paste → Run)
-- ============================================================

-- ---------- Gallery ----------
create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  src text not null,
  title text not null,
  category text not null,
  created_at timestamptz not null default now()
);

alter table gallery_items enable row level security;

-- Anyone can view gallery photos (public site)
create policy "Public can read gallery"
  on gallery_items for select
  using (true);

-- Only logged-in (admin) users can add/edit/delete
create policy "Admins can insert gallery"
  on gallery_items for insert
  to authenticated
  with check (true);

create policy "Admins can update gallery"
  on gallery_items for update
  to authenticated
  using (true);

create policy "Admins can delete gallery"
  on gallery_items for delete
  to authenticated
  using (true);

-- ---------- Notices ----------
create table if not exists notices (
  id uuid primary key default gen_random_uuid(),
  heading text not null,
  date date not null,
  description text not null default '',
  file_url text,
  file_name text,
  created_at timestamptz not null default now()
);

alter table notices enable row level security;

create policy "Public can read notices"
  on notices for select
  using (true);

create policy "Admins can insert notices"
  on notices for insert
  to authenticated
  with check (true);

create policy "Admins can update notices"
  on notices for update
  to authenticated
  using (true);

create policy "Admins can delete notices"
  on notices for delete
  to authenticated
  using (true);

-- ============================================================
-- Storage buckets (run in SQL editor too — creates public buckets)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('notices', 'notices', true)
on conflict (id) do nothing;

-- Allow public read of files in both buckets
create policy "Public read gallery files"
  on storage.objects for select
  using (bucket_id = 'gallery');

create policy "Public read notice files"
  on storage.objects for select
  using (bucket_id = 'notices');

-- Allow only logged-in admins to upload/delete files
create policy "Admins upload gallery files"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'gallery');

create policy "Admins delete gallery files"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'gallery');

create policy "Admins upload notice files"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'notices');

create policy "Admins delete notice files"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'notices');

-- ============================================================
-- Seed the gallery with the current default photos (optional —
-- skip this if you'd rather add photos yourself via edit mode)
-- ============================================================
insert into gallery_items (src, title, category) values
  ('https://images.pexels.com/photos/37169819/pexels-photo-37169819.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', 'Inter-School Cricket Victory', 'Sports'),
  ('https://images.pexels.com/photos/3231358/pexels-photo-3231358.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', 'Classroom Learning', 'Education'),
  ('https://images.pexels.com/photos/8926832/pexels-photo-8926832.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', 'Science Exhibition', 'Events'),
  ('https://images.pexels.com/photos/37107330/pexels-photo-37107330.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', 'Patna Zoo Visit', 'Trips'),
  ('https://images.pexels.com/photos/16118310/pexels-photo-16118310.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', 'Independence Day Celebration', 'Events'),
  ('https://images.pexels.com/photos/9714143/pexels-photo-9714143.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', 'Multi Sports Program', 'Sports')
on conflict do nothing;

-- ---------- Annual Events ----------
create table if not exists annual_events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon_name text not null, -- E.g. 'FlaskConical', 'Flag', etc.
  color text not null, -- E.g. 'bg-blue-50 text-blue-600'
  created_at timestamptz not null default now()
);

alter table annual_events enable row level security;

-- Anyone can read events
create policy "Public can read annual_events"
  on annual_events for select
  using (true);

-- Only logged-in (admin) users can add/edit/delete
create policy "Admins can insert annual_events"
  on annual_events for insert
  to authenticated
  with check (true);

create policy "Admins can update annual_events"
  on annual_events for update
  to authenticated
  using (true);

create policy "Admins can delete annual_events"
  on annual_events for delete
  to authenticated
  using (true);

-- Seed default events
insert into annual_events (name, icon_name, color) values
  ('Science Exhibition', 'FlaskConical', 'bg-blue-50 text-blue-600'),
  ('15th Aug Independence Day', 'Flag', 'bg-orange-50 text-orange-600'),
  ('26th Jan Republic Day', 'Flag', 'bg-green-50 text-green-600'),
  ('School Foundation Day', 'Calendar', 'bg-purple-50 text-purple-600'),
  ('Ramazan Iftaar Program', 'Moon', 'bg-emerald-50 text-emerald-600'),
  ('Annual Day Celebration', 'GraduationCap', 'bg-pink-50 text-pink-600')
on conflict do nothing;

