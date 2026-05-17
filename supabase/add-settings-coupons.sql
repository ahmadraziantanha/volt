-- =====================================================================
-- VOLT — Settings + Coupons + Order discount columns
-- Paste into Supabase SQL editor → Run. Safe to re-run.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1 / settings  (single source of truth for shipping fees etc.)
-- ---------------------------------------------------------------------
create table if not exists public.settings (
  key         text primary key,
  value       jsonb not null,
  updated_at  timestamptz not null default now()
);

alter table public.settings enable row level security;

-- Public reads (so the storefront can show the free-shipping threshold)
drop policy if exists "settings are publicly readable" on public.settings;
create policy "settings are publicly readable"
  on public.settings for select using (true);

-- Seed defaults if they don't already exist
insert into public.settings (key, value)
values (
  'shipping',
  '{"flat_fee_cents": 1500, "free_threshold_cents": 20000, "enabled": true}'::jsonb
)
on conflict (key) do nothing;

-- ---------------------------------------------------------------------
-- 2 / coupons
-- ---------------------------------------------------------------------
create table if not exists public.coupons (
  id              uuid primary key default gen_random_uuid(),
  code            text not null unique,
  description     text,
  discount_type   text not null check (discount_type in ('percent', 'fixed')),
  discount_value  integer not null check (discount_value > 0),
  -- For 'percent' types, 1..100. For 'fixed' types, cents.
  min_subtotal    integer not null default 0 check (min_subtotal >= 0),
  max_uses        integer check (max_uses is null or max_uses > 0),
  uses_count      integer not null default 0,
  valid_until     timestamptz,
  active          boolean not null default true,
  created_at      timestamptz not null default now()
);

create index if not exists coupons_code_idx on public.coupons(code);

alter table public.coupons enable row level security;

-- Public can read active coupons only by exact code lookup (we don't enforce
-- this in policy — server-side validation handles it). Block list/scan.
-- No public read policy = anon can't browse codes. Service role bypasses RLS.

-- ---------------------------------------------------------------------
-- 3 / orders — add discount columns (idempotent)
-- ---------------------------------------------------------------------
alter table public.orders
  add column if not exists coupon_code text,
  add column if not exists discount integer not null default 0
    check (discount >= 0);

-- ---------------------------------------------------------------------
-- Verify
--   select * from public.settings;
--   select code, discount_type, discount_value, active from public.coupons;
-- ---------------------------------------------------------------------
