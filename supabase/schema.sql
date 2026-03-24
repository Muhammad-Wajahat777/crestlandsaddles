create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  purpose text not null,
  size text not null,
  material text not null,
  image_url text not null,
  category text not null,
  price numeric(10,2) not null check (price >= 0),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now(),
  unique (cart_id, product_id)
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete restrict,
  status text not null default 'pending' check (status in ('pending', 'paid', 'cancelled', 'fulfilled')),
  total_amount numeric(10,2) not null check (total_amount >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null check (unit_price >= 0)
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists carts_set_updated_at on public.carts;
create trigger carts_set_updated_at
before update on public.carts
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;

  insert into public.carts (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.create_order_from_cart(p_user_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_cart_id uuid;
  v_order_id uuid;
  v_total numeric(10,2);
begin
  if auth.uid() is null or auth.uid() <> p_user_id then
    raise exception 'Unauthorized checkout request';
  end if;

  select id into v_cart_id
  from public.carts
  where user_id = p_user_id
  limit 1;

  if v_cart_id is null then
    raise exception 'Cart not found';
  end if;

  if not exists (select 1 from public.cart_items where cart_id = v_cart_id) then
    raise exception 'Cart is empty';
  end if;

  if exists (
    select 1
    from public.cart_items ci
    join public.products p on p.id = ci.product_id
    where ci.cart_id = v_cart_id
      and (not p.is_active or p.stock_quantity < ci.quantity)
  ) then
    raise exception 'Some items are out of stock or inactive';
  end if;

  select coalesce(sum(ci.quantity * p.price), 0)
    into v_total
  from public.cart_items ci
  join public.products p on p.id = ci.product_id
  where ci.cart_id = v_cart_id;

  insert into public.orders (user_id, total_amount, status)
  values (p_user_id, v_total, 'pending')
  returning id into v_order_id;

  insert into public.order_items (order_id, product_id, quantity, unit_price)
  select v_order_id, ci.product_id, ci.quantity, p.price
  from public.cart_items ci
  join public.products p on p.id = ci.product_id
  where ci.cart_id = v_cart_id;

  update public.products p
  set stock_quantity = p.stock_quantity - ci.quantity
  from public.cart_items ci
  where ci.cart_id = v_cart_id
    and p.id = ci.product_id;

  delete from public.cart_items where cart_id = v_cart_id;

  return v_order_id;
end;
$$;

create index if not exists products_name_trgm_idx on public.products using gin (name gin_trgm_ops);
create index if not exists products_desc_trgm_idx on public.products using gin (description gin_trgm_ops);
create index if not exists products_purpose_trgm_idx on public.products using gin (purpose gin_trgm_ops);
create index if not exists products_category_idx on public.products (category);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
for select using (auth.uid() = id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
for update using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists products_public_read on public.products;
create policy products_public_read on public.products
for select using (is_active = true);

drop policy if exists products_admin_manage on public.products;
create policy products_admin_manage on public.products
for all using (
  exists (
    select 1 from public.profiles pr
    where pr.id = auth.uid() and pr.is_admin = true
  )
)
with check (
  exists (
    select 1 from public.profiles pr
    where pr.id = auth.uid() and pr.is_admin = true
  )
);

drop policy if exists carts_owner_all on public.carts;
create policy carts_owner_all on public.carts
for all using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists cart_items_owner_all on public.cart_items;
create policy cart_items_owner_all on public.cart_items
for all using (
  exists (
    select 1 from public.carts c
    where c.id = cart_id and c.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.carts c
    where c.id = cart_id and c.user_id = auth.uid()
  )
);

drop policy if exists orders_owner_read on public.orders;
create policy orders_owner_read on public.orders
for select using (auth.uid() = user_id);

drop policy if exists order_items_owner_read on public.order_items;
create policy order_items_owner_read on public.order_items
for select using (
  exists (
    select 1 from public.orders o
    where o.id = order_id and o.user_id = auth.uid()
  )
);

insert into public.products (name, description, purpose, size, material, image_url, category, price, stock_quantity, is_active)
values
  ('The Trail Master', 'Built for long days on open trails. Deep seat, padded fenders, and a sturdy horn.', 'Long trail rides and all-day comfort', '16in', 'Full-grain leather', '/saddle.jpg', 'Western', 1200, 10, true),
  ('The Dressage Elite', 'Close contact design with supple leather for flawless arena performance.', 'Dressage precision and arena balance', '17in', 'Italian leather', '/saddle-bg.png', 'English', 1800, 8, true),
  ('The Arena Pro', 'Forward-cut flaps and a secure seat designed for jumping confidence.', 'Show jumping performance', '17.5in', 'Premium calfskin', '/jumping-saddle.png', 'Jumping', 1600, 12, true),
  ('The Ranch Hand', 'Heavy-duty and built to work as hard as you do.', 'Daily ranch and working rides', '16in', 'Oil-tanned leather', '/ranch-hand.jpg', 'Ranch', 950, 15, true)
on conflict do nothing;
