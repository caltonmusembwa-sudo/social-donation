-- Run this entire file in Supabase > SQL Editor.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.club_content (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('project','event','news')),
  title text not null check (char_length(title) between 1 and 100),
  body text not null check (char_length(body) between 1 and 1200),
  image_url text,
  event_date date,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.club_content enable row level security;

-- A signed-in user may read only their own profile row.
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile" on public.profiles
for select to authenticated using (auth.uid() = id);

-- Public visitors can read published content only.
drop policy if exists "Public can read published content" on public.club_content;
create policy "Public can read published content" on public.club_content
for select to anon, authenticated using (published = true);

-- Only users explicitly marked as admins can read all content or modify it.
drop policy if exists "Admins can read all content" on public.club_content;
create policy "Admins can read all content" on public.club_content
for select to authenticated using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
);
drop policy if exists "Admins can insert content" on public.club_content;
create policy "Admins can insert content" on public.club_content
for insert to authenticated with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
);
drop policy if exists "Admins can update content" on public.club_content;
create policy "Admins can update content" on public.club_content
for update to authenticated using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
) with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
);
drop policy if exists "Admins can delete content" on public.club_content;
create policy "Admins can delete content" on public.club_content
for delete to authenticated using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
);

-- IMPORTANT: Create the first admin user in Supabase Authentication first.
-- Then replace THE-ADMIN-USER-UUID below with that user's actual UUID and run:
-- insert into public.profiles (id, is_admin)
-- values ('THE-ADMIN-USER-UUID', true)
-- on conflict (id) do update set is_admin = true;
