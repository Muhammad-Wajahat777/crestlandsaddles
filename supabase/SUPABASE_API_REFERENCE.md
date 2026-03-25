# Supabase API Reference (Crestland Saddlery)

This is a practical API usage guide for your project based on Supabase JS.

## Base Setup

Use this client setup in your project:

```js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://jqlwauaunfofjcrhvkcc.supabase.co',
  'sb_publishable_u4rGGgZd8Hbtu-5RIJtDyw_bJpf9Jq6'
)
```

## Auth

```js
// Sign Up
await supabase.auth.signUp({
  email,
  password,
  options: { data: { full_name } },
})

// Sign In
await supabase.auth.signInWithPassword({ email, password })

// Sign Out
await supabase.auth.signOut()

// Current user/session
await supabase.auth.getUser()
await supabase.auth.getSession()

// Auth listener
supabase.auth.onAuthStateChange((event, session) => {})
```

## profiles table

```js
// Get own profile
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .single()

// Update own profile
const { data, error } = await supabase
  .from('profiles')
  .update({ full_name: 'John Doe' })
  .eq('id', userId)

// Check admin
const { data, error } = await supabase
  .from('profiles')
  .select('is_admin')
  .eq('id', userId)
  .single()
```

## products table

```js
// Get active products (public)
const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('is_active', true)

// Get one product
const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('id', productId)
  .single()

// Get category products
const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('category', 'western')
  .eq('is_active', true)

// Search products
const { data, error } = await supabase
  .from('products')
  .select('*')
  .ilike('name', `%${query}%`)

// Create product (admin only)
const { data, error } = await supabase
  .from('products')
  .insert({
    name,
    description,
    purpose,
    size,
    material,
    image_url,
    category,
    price,
    stock_quantity,
    is_active: true,
  })

// Update product (admin only)
const { data, error } = await supabase
  .from('products')
  .update({ price, stock_quantity })
  .eq('id', productId)

// Delete product (admin only)
const { data, error } = await supabase
  .from('products')
  .delete()
  .eq('id', productId)

// Soft delete (admin only)
const { data, error } = await supabase
  .from('products')
  .update({ is_active: false })
  .eq('id', productId)
```

## carts table

```js
// Get own cart
const { data, error } = await supabase
  .from('carts')
  .select('*')
  .eq('user_id', userId)
  .single()

// Get cart with items + product details
const { data, error } = await supabase
  .from('carts')
  .select(`
    id,
    cart_items (
      id,
      quantity,
      products (
        id, name, price, image_url, stock_quantity
      )
    )
  `)
  .eq('user_id', userId)
  .single()
```

## cart_items table

```js
// Add item
const { data, error } = await supabase
  .from('cart_items')
  .insert({ cart_id: cartId, product_id: productId, quantity: 1 })

// Update quantity
const { data, error } = await supabase
  .from('cart_items')
  .update({ quantity: 3 })
  .eq('id', cartItemId)

// Remove item
const { data, error } = await supabase
  .from('cart_items')
  .delete()
  .eq('id', cartItemId)

// Clear cart
const { data, error } = await supabase
  .from('cart_items')
  .delete()
  .eq('cart_id', cartId)

// Upsert item
const { data, error } = await supabase
  .from('cart_items')
  .upsert(
    { cart_id: cartId, product_id: productId, quantity },
    { onConflict: 'cart_id,product_id' }
  )
```

## orders table

```js
// Get own orders
const { data, error } = await supabase
  .from('orders')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })

// Get single order with items
const { data, error } = await supabase
  .from('orders')
  .select(`
    id, status, total_amount, created_at,
    order_items (
      id, quantity, unit_price,
      products ( id, name, image_url )
    )
  `)
  .eq('id', orderId)
  .single()
```

## order_items table

```js
// Get items for order
const { data, error } = await supabase
  .from('order_items')
  .select(`
    id, quantity, unit_price,
    products ( id, name, image_url, category )
  `)
  .eq('order_id', orderId)
```

## RPC: create_order_from_cart

```js
const { data: orderId, error } = await supabase
  .rpc('create_order_from_cart', { p_user_id: userId })

if (error) console.error(error.message)
else console.log('Order created:', orderId)
```

## Realtime Examples

```js
// Product updates
supabase
  .channel('products')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'products' },
    (payload) => {
      console.log('Product changed:', payload)
    }
  )
  .subscribe()

// Own order updates
supabase
  .channel('orders')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'orders',
      filter: `user_id=eq.${userId}`,
    },
    (payload) => {
      console.log('Order updated:', payload.new.status)
    }
  )
  .subscribe()
```

## Permission Matrix

| Table | SELECT | INSERT | UPDATE | DELETE |
|---|---|---|---|---|
| profiles | Own only | No (trigger) | Own only | No |
| products | Public active, admin all | Admin only | Admin only | Admin only |
| carts | Own only | No (trigger) | Own only | Own only |
| cart_items | Own only | Own only | Own only | Own only |
| orders | Own only | No (RPC only) | No | No |
| order_items | Own only | No (RPC only) | No | No |

## Notes

- Publishable key is safe for frontend use.
- Never put the service_role key in frontend code.
- All final protection must rely on RLS policies in Supabase.
