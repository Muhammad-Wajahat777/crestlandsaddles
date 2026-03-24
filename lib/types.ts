export type Product = {
  id: string
  name: string
  description: string
  purpose: string
  size: string
  material: string
  image_url: string
  category: string
  price: number
  stock_quantity: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export type CartItem = {
  id: string
  quantity: number
  product: Product
}

export type OrderSummary = {
  id: string
  status: 'pending' | 'paid' | 'cancelled' | 'fulfilled'
  total_amount: number
  created_at: string
}
