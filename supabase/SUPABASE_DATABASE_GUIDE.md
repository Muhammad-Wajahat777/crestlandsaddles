# Supabase Database Design Guide (Crestland Saddlery)

This document explains the required Supabase tables, relationships, and Row Level Security (RLS) policies for your project.

It is based on your current SQL in `supabase/schema.sql` and the app behavior:

- Customers browse products.
- Customers add products to cart and place orders.
- Admin users manage products.
- Product updates are reflected on the saddles page automatically.

## 1) High-Level Architecture

You are using three Supabase capabilities together:

1. `auth.users` (managed by Supabase Auth): stores user identities.
2. `public` schema tables: app data (profiles, products, carts, orders, etc.).
3. RLS policies: enforce who can read/write each table at query time.

The key security model is:

- Public users can only read active products.
- Logged-in users can only access their own cart and orders.
- Admin users (via `profiles.is_admin = true`) can create/update/delete products.

## 2) Required Tables and Why They Exist

### 2.1 `public.profiles`

Purpose:

- Extends `auth.users` with app-specific fields.
- Holds admin flag used by product-management policies.

Important columns:

- `id uuid primary key references auth.users(id) on delete cascade`
- `full_name text`
- `is_admin boolean not null default false`
- `created_at timestamptz not null default now()`

Why this table is critical:

- You should never store custom business roles directly in `auth.users`.
- `is_admin` is used by RLS policies to protect admin-only actions.

### 2.2 `public.products`

Purpose:

- Master product catalog shown on the saddles/products page.

Important columns:

- `id uuid primary key default gen_random_uuid()`
- `name, description, purpose, size, material, image_url, category`
- `price numeric(10,2) check (price >= 0)`
- `stock_quantity integer check (stock_quantity >= 0)`
- `is_active boolean default true`
- `created_at`, `updated_at`

Why this table is critical:

- This is the source of truth for product listing.
- Admin page inserts/updates here; products page reads from here.

### 2.3 `public.carts`

Purpose:

- One cart per user.

Important columns:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null unique references auth.users(id) on delete cascade`
- `created_at`, `updated_at`

Why this table is critical:

- Enforces one active cart per user (`unique user_id`).

### 2.4 `public.cart_items`

Purpose:

- Stores products added to a cart.

Important columns:

- `id uuid primary key default gen_random_uuid()`
- `cart_id uuid not null references public.carts(id) on delete cascade`
- `product_id uuid not null references public.products(id) on delete restrict`
- `quantity integer not null check (quantity > 0)`
- `unique (cart_id, product_id)`

Why this table is critical:

- Represents many items per cart.
- Prevents duplicate row for the same product in one cart.

### 2.5 `public.orders`

Purpose:

- Header table for completed checkout attempts.

Important columns:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references auth.users(id) on delete restrict`
- `status text check (status in ('pending', 'paid', 'cancelled', 'fulfilled'))`
- `total_amount numeric(10,2) check (total_amount >= 0)`
- `created_at`

Why this table is critical:

- Stores lifecycle status and total for each order.

### 2.6 `public.order_items`

Purpose:

- Line items for an order snapshot.

Important columns:

- `id uuid primary key default gen_random_uuid()`
- `order_id uuid not null references public.orders(id) on delete cascade`
- `product_id uuid not null references public.products(id) on delete restrict`
- `quantity integer not null check (quantity > 0)`
- `unit_price numeric(10,2) not null check (unit_price >= 0)`

Why this table is critical:

- Keeps historical order values even if product price changes later.

## 3) Relationship Map

Use this conceptual ER relationship map:

```text
auth.users (1) ------ (1) public.profiles
auth.users (1) ------ (1) public.carts
public.carts (1) ---- (N) public.cart_items
public.products (1) - (N) public.cart_items
auth.users (1) ------ (N) public.orders
public.orders (1) --- (N) public.order_items
public.products (1) - (N) public.order_items
```

Practical flow:

1. User signs up in `auth.users`.
2. Trigger creates `profiles` row and `carts` row.
3. User adds products to `cart_items`.
4. Checkout RPC creates `orders` and `order_items`, updates stock, clears cart.

## 4) Required Database Functions and Triggers

### 4.1 `set_updated_at()` trigger function

Used by:

- `products_set_updated_at` trigger on `public.products`
- `carts_set_updated_at` trigger on `public.carts`

Result:

- Automatically updates `updated_at` on every update.

### 4.2 `handle_new_user()` trigger function

Attached trigger:

- `on_auth_user_created` on `auth.users` (AFTER INSERT)

Result:

- Auto-creates `public.profiles` and `public.carts` rows for new users.

### 4.3 `create_order_from_cart(p_user_id uuid)` RPC

Purpose:

- Secure checkout operation in one transaction-like server-side unit.

Checks performed:

- Caller must match `auth.uid()`.
- Cart exists and is not empty.
- Items are active and in stock.

Actions performed:

- Creates `orders` row.
- Copies `cart_items` into `order_items` with `unit_price` snapshot.
- Deducts stock in `products`.
- Clears `cart_items`.

## 5) Required RLS Setup

RLS must be enabled on all public tables:

- `profiles`
- `products`
- `carts`
- `cart_items`
- `orders`
- `order_items`

### 5.1 `profiles` policies

1. `profiles_select_own`:
- `FOR SELECT USING (auth.uid() = id)`

2. `profiles_update_own`:
- `FOR UPDATE USING (auth.uid() = id)`
- `WITH CHECK (auth.uid() = id)`

Security outcome:

- Users can only read/update their own profile row.

### 5.2 `products` policies

1. `products_public_read`:
- `FOR SELECT USING (is_active = true)`

2. `products_admin_manage`:
- `FOR ALL USING (exists admin profile)`
- `WITH CHECK (exists admin profile)`

Where "exists admin profile" means:

```sql
exists (
	select 1 from public.profiles pr
	where pr.id = auth.uid() and pr.is_admin = true
)
```

Security outcome:

- Everyone can read active products.
- Admins can insert/update/delete products and read inactive products too.

### 5.3 `carts` policies

1. `carts_owner_all`:
- `FOR ALL USING (auth.uid() = user_id)`
- `WITH CHECK (auth.uid() = user_id)`

Security outcome:

- User can only manage their own cart.

### 5.4 `cart_items` policies

1. `cart_items_owner_all`:
- `FOR ALL USING (cart belongs to auth.uid())`
- `WITH CHECK (cart belongs to auth.uid())`

Security outcome:

- User can only read/write items in their own cart.

### 5.5 `orders` policies

1. `orders_owner_read`:
- `FOR SELECT USING (auth.uid() = user_id)`

Security outcome:

- Users can read only their own orders.

### 5.6 `order_items` policies

1. `order_items_owner_read`:
- `FOR SELECT USING (order belongs to auth.uid())`

Security outcome:

- Users can read line items only for their own orders.

## 6) Indexes You Need

The current schema includes search/performance indexes:

- `products_name_trgm_idx` (GIN trigram)
- `products_desc_trgm_idx` (GIN trigram)
- `products_purpose_trgm_idx` (GIN trigram)
- `products_category_idx`

These support:

- Fast text search (`ilike` / trigram) on products.
- Efficient category filtering.

## 7) Admin Login and Product Management Requirements

To make admin page truly admin-only, you need all three layers:

1. Frontend route guard:
- Block `/admin/*` pages for non-admin users.

2. Admin login flow:
- Sign in via Supabase Auth.
- Immediately verify `profiles.is_admin = true`.

3. RLS enforcement:
- Even if someone bypasses UI, non-admin writes to `products` must fail.

If these are in place, only admin users can create/edit/delete products.

## 8) How Product Entries Reach the Saddles Page

Data path:

1. Admin creates product row in `public.products`.
2. Saddles page queries `public.products` where `is_active = true`.
3. Newly inserted active products appear automatically.

Key condition:

- `is_active` should be `true` for products you want customers to see.

## 9) How To Mark an Account As Admin

After the user signs up, run in Supabase SQL Editor:

```sql
update public.profiles
set is_admin = true
where id = 'USER_UUID_HERE';
```

To find the UUID:

1. Open Authentication > Users in Supabase.
2. Copy the user id.

## 10) Deployment/Validation Checklist

1. Run full `supabase/schema.sql` once in SQL Editor.
2. Confirm RLS is enabled on all six public tables.
3. Confirm all listed policies exist.
4. Create a normal test user and confirm:
- Can read active products.
- Cannot insert into `products`.
5. Mark a test admin (`profiles.is_admin = true`) and confirm:
- Can insert/update/delete `products`.
- Can access admin product page.
6. Add one product in admin page and confirm it appears on saddles page.

## 11) Optional Hardening (Recommended)

1. Add product input constraints:
- Non-empty `name`, valid image URL format, max lengths.

2. Add audit columns:
- `created_by`, `updated_by` on `products`.

3. Add admin policy split:
- Separate read/write admin policies for easier auditing.

4. Add order status transition function:
- Controlled updates (`pending` -> `paid` -> `fulfilled`, etc.).

## 12) Minimal SQL Policy Summary

If you only need the policy essentials, this is the minimum:

- Own profile read/update only.
- Public read active products.
- Admin full manage products.
- Own cart and cart items only.
- Own order and order items read only.

This minimum is exactly what your current schema is implementing.
