-- Supabase SQL for weapons, combos, and tuning
create table if not exists weapons (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  platform text not null check (platform in ('zen', 'xim')),
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists combos (
  id uuid primary key default gen_random_uuid(),
  weapon_id uuid references weapons(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists tuning (
  id uuid primary key default gen_random_uuid(),
  weapon_id uuid references weapons(id) on delete cascade,
  combo_id uuid references combos(id) on delete set null,
  user_id uuid references users(id) on delete cascade,
  vertical_recoil float,
  horizontal_recoil float,
  timing float,
  notes text,
  created_at timestamp with time zone default timezone('utc', now())
);
