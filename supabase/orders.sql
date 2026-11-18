-- Hunain Watch: simple customer orders table
-- Run this once in Supabase Dashboard > SQL Editor for project uixslyrpcennltyyjele.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  customer_name text not null,
  customer_email text not null,
  phone text not null,
  delivery_address text not null,
  city text not null,
  postal_code text not null,
  country text not null,
  order_items jsonb not null,
  total_amount numeric(12, 2) not null check (total_amount >= 0),
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

drop policy if exists "Customers can view their own orders" on public.orders;
create policy "Customers can view their own orders"
  on public.orders for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Customers can create their own orders" on public.orders;
create policy "Customers can create their own orders"
  on public.orders for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

grant usage on schema public to authenticated;
grant select, insert on public.orders to authenticated;
