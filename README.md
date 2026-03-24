# Crestland Saddlery

This project is a production-oriented Next.js storefront with Supabase as backend.

## Included Features

- Admin-managed products (add/edit/delete)
- Real stock and inventory tracking
- User accounts, saved carts, and order history
- Checkout records with atomic stock deduction
- Search/filter over larger product catalogs

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure Supabase credentials directly in code:

- Open `lib/supabase/client.ts`
- Replace `SUPABASE_URL` and `SUPABASE_ANON_KEY` with your project values

3. Create database objects in Supabase:

- Open SQL Editor in Supabase
- Run the SQL in `supabase/schema.sql`

4. Start development server:

```bash
npm run dev
```

5. Open http://localhost:3000

## Important Routes

- `/products`: live catalog from database with search and filtering
- `/cart`: saved carts and stock-aware checkout
- `/account`: sign in/sign up and order history
- `/admin/products`: admin product management

## Admin Access

After you create an account:

1. Open `profiles` table in Supabase.
2. Set `is_admin = true` for that user.
3. Sign in and use `/admin/products`.

## Notes

- Guests can build a local cart.
- Signed-in users get persistent carts and order history.
- RLS policies are included in `supabase/schema.sql`.
