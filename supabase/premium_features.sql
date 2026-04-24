-- Table for owner-controlled premium features
create table if not exists premium_features (
  key text primary key,
  enabled boolean not null default false
);
-- Example insertions (run once):
insert into premium_features (key, enabled) values ('zen_live_tuning', true) on conflict (key) do nothing;
insert into premium_features (key, enabled) values ('xim_live_tuning', false) on conflict (key) do nothing;
