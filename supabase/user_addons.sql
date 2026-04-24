-- Table for owner-controlled add-ons per user/creator
create table if not exists user_addons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  addon_key text not null,
  enabled boolean not null default false,
  unique(user_id, addon_key)
);
-- Example add-ons (managed in code/UI):
-- 'pro', 'device', 'community', 'early_access', 'custom'
