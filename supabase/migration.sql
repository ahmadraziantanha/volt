-- =====================================================================
-- VOLT — Schema migration
-- Paste this into the Supabase SQL editor (Project → SQL → New query).
-- Safe to re-run: tables are dropped first.
-- =====================================================================

drop table if exists public.orders cascade;
drop table if exists public.product_variants cascade;
drop table if exists public.products cascade;

-- =====================================================================
-- products
-- =====================================================================
create table public.products (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  name         text not null,
  tagline      text not null,
  description  text not null,
  category     text not null check (category in ('headphones', 'earbuds', 'speakers')),
  base_price   integer not null check (base_price >= 0), -- cents
  features     jsonb not null default '[]'::jsonb,       -- [{icon,title,body}]
  specs        jsonb not null default '{}'::jsonb,       -- {"battery":"50 h", ...}
  in_box       jsonb not null default '[]'::jsonb,       -- ["Headphones", "USB-C cable", ...]
  created_at   timestamptz not null default now()
);

create index products_category_idx on public.products(category);
create index products_slug_idx on public.products(slug);

-- =====================================================================
-- product_variants
-- =====================================================================
create table public.product_variants (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid not null references public.products(id) on delete cascade,
  color_name  text not null,
  color_hex   text not null,
  image_urls  jsonb not null default '[]'::jsonb,        -- ordered; [0] is hero
  sku         text not null unique,
  stock       integer not null default 0 check (stock >= 0)
);

create index variants_product_idx on public.product_variants(product_id);

-- =====================================================================
-- orders
-- =====================================================================
create table public.orders (
  id                uuid primary key default gen_random_uuid(),
  customer_name     text not null,
  customer_email    text not null,
  customer_phone    text not null,
  shipping_address  jsonb not null,
  items             jsonb not null,                       -- [{product_id, variant_id, product_name, variant_color, qty, unit_price}]
  subtotal          integer not null check (subtotal >= 0),
  shipping          integer not null default 0 check (shipping >= 0),
  total             integer not null check (total >= 0),
  status            text not null default 'pending'
                    check (status in ('pending','confirmed','shipped','delivered','cancelled')),
  payment_method    text not null default 'cod' check (payment_method = 'cod'),
  notes             text,
  created_at        timestamptz not null default now()
);

create index orders_created_idx on public.orders(created_at desc);
create index orders_status_idx on public.orders(status);

-- =====================================================================
-- Row-Level Security
--   • products + variants: public read (catalogue is open)
--   • orders: no anonymous access. The app inserts orders via
--     the service-role key on the server side.
-- =====================================================================
alter table public.products         enable row level security;
alter table public.product_variants enable row level security;
alter table public.orders           enable row level security;

create policy "products are publicly readable"
  on public.products for select using (true);

create policy "variants are publicly readable"
  on public.product_variants for select using (true);

-- No policies on orders ⇒ anon + authenticated cannot read or write.
-- Server uses service_role which bypasses RLS.
