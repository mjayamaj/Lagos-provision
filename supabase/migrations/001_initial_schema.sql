-- ==============================================================================
-- Lagos Provision — Supabase Database Migration
-- Version: 1.0 (Pay on Delivery)
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (linked to Supabase auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  avatar_url text,
  phone text,
  created_at timestamptz default now()
);

-- 2. Categories Table
create table if not exists public.categories (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  slug text unique not null,
  icon text not null,
  image_url text,
  sort_order int default 0,
  is_active bool default true
);

-- 3. Products Table
create table if not exists public.products (
  id text primary key default gen_random_uuid()::text,
  category_id text references public.categories(id) on delete set null,
  name text not null,
  slug text unique not null,
  description text,
  descriptor text,
  size_label text,
  price_kobo int not null,
  image_url text,
  brand text,
  unit text,
  is_featured bool default false,
  is_best_seller bool default false,
  is_perishable bool default false,
  price_is_placeholder bool default true,
  tags text[] default array[]::text[],
  sort_order int default 0,
  stock_qty int default 0,
  is_active bool default true,
  created_at timestamptz default now()
);

-- 4. Carts Table
create table if not exists public.carts (
  id text primary key default gen_random_uuid()::text,
  user_id uuid references auth.users(id) on delete cascade,
  session_id text,
  updated_at timestamptz default now()
);

-- 5. Cart Items Table
create table if not exists public.cart_items (
  id text primary key default gen_random_uuid()::text,
  cart_id text references public.carts(id) on delete cascade not null,
  product_id text references public.products(id) on delete cascade not null,
  quantity int not null check (quantity > 0),
  unique(cart_id, product_id)
);

-- 6. Addresses Table
create table if not exists public.addresses (
  id text primary key default gen_random_uuid()::text,
  user_id uuid references auth.users(id) on delete cascade,
  full_name text not null,
  phone_e164 text not null,
  street text not null,
  lga text not null,
  neighbourhood text not null,
  landmark text,
  is_default bool default false
);

-- 7. Orders Table (Pay on Delivery only)
create table if not exists public.orders (
  id text primary key default gen_random_uuid()::text,
  order_number text unique not null,
  user_id uuid references auth.users(id) on delete set null,
  guest_email text,
  customer_name text not null,
  customer_phone text not null,
  customer_email text not null,
  shipping_street text not null,
  shipping_lga text not null,
  shipping_neighbourhood text not null,
  shipping_landmark text,
  delivery_instructions text,
  subtotal_kobo int not null,
  delivery_fee_kobo int not null default 200000,
  total_kobo int not null,
  payment_method text not null default 'cod' check (payment_method = 'cod'),
  status text not null default 'confirmed' check (status in ('confirmed', 'processing', 'out_for_delivery', 'delivered', 'cancelled')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 8. Order Items Table
create table if not exists public.order_items (
  id text primary key default gen_random_uuid()::text,
  order_id text references public.orders(id) on delete cascade not null,
  product_id text references public.products(id) on delete set null,
  name_snapshot text not null,
  size_snapshot text,
  unit_price_kobo int not null,
  quantity int not null,
  line_total_kobo int not null
);

-- 9. Payments Table (Tracking cash/POS/transfer at the door)
create table if not exists public.payments (
  id text primary key default gen_random_uuid()::text,
  order_id text references public.orders(id) on delete cascade unique not null,
  amount_due_kobo int not null,
  amount_collected_kobo int,
  collection_method text check (collection_method in ('cash', 'pos', 'transfer')),
  status text not null default 'pending' check (status in ('pending', 'collected', 'not_collected')),
  collected_at timestamptz,
  created_at timestamptz default now()
);

-- 10. Delivery Zones Table
create table if not exists public.delivery_zones (
  id text primary key default gen_random_uuid()::text,
  lga text unique not null,
  fee_kobo int default 200000,
  is_active bool default true
);

-- 11. Email Logs Table
create table if not exists public.email_logs (
  id text primary key default gen_random_uuid()::text,
  order_id text references public.orders(id) on delete set null,
  to_email text not null,
  template text not null,
  status text not null check (status in ('sent', 'failed', 'queued')),
  mailgun_message_id text,
  error text,
  attempts int default 0,
  created_at timestamptz default now()
);

-- Indexes for performance
create index if not exists idx_products_category_id on public.products(category_id);
create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_products_active_featured on public.products(is_active, is_featured);
create index if not exists idx_orders_order_number on public.orders(order_number);
create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_payments_order_id on public.payments(order_id);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.delivery_zones enable row level security;
alter table public.email_logs enable row level security;

-- Public read policies (re-runnable)
drop policy if exists "Public read categories" on public.categories;
create policy "Public read categories" on public.categories for select using (is_active = true);

drop policy if exists "Public read products" on public.products;
create policy "Public read products" on public.products for select using (is_active = true);

drop policy if exists "Public read delivery zones" on public.delivery_zones;
create policy "Public read delivery zones" on public.delivery_zones for select using (is_active = true);

-- User policies (re-runnable)
drop policy if exists "Users manage own profile" on public.profiles;
create policy "Users manage own profile" on public.profiles
  for all using (auth.uid() = id);

drop policy if exists "Users manage own addresses" on public.addresses;
create policy "Users manage own addresses" on public.addresses
  for all using (auth.uid() = user_id);

drop policy if exists "Users read own orders" on public.orders;
create policy "Users read own orders" on public.orders
  for select using (auth.uid() = user_id);

drop policy if exists "Users read own order items" on public.order_items;
create policy "Users read own order items" on public.order_items
  for select using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );
