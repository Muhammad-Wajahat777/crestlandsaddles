import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase, requireAdmin } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const category = (url.searchParams.get('category') ?? '').trim()
  const search = (url.searchParams.get('search') ?? '').trim()
  const includeInactive = url.searchParams.get('includeInactive') === 'true'

  let supabase = createServerSupabase()

  if (includeInactive) {
    const admin = await requireAdmin(request)
    if (!admin.ok) {
      return NextResponse.json({ error: admin.message }, { status: admin.status })
    }

    supabase = admin.supabase
  }

  let query = supabase.from('products').select('*').order('created_at', { ascending: false }).limit(100)

  if (!includeInactive) {
    query = query.eq('is_active', true)
  }

  if (category && category !== 'All') {
    query = query.eq('category', category)
  }

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,description.ilike.%${search}%,purpose.ilike.%${search}%,material.ilike.%${search}%,size.ilike.%${search}%`
    )
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data: data ?? [] })
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (!admin.ok) {
    return NextResponse.json({ error: admin.message }, { status: admin.status })
  }

  const body = await request.json()

  const payload = {
    name: String(body.name ?? '').trim(),
    description: String(body.description ?? '').trim(),
    purpose: String(body.purpose ?? '').trim(),
    size: String(body.size ?? '').trim(),
    material: String(body.material ?? '').trim(),
    image_url: String(body.image_url ?? '').trim(),
    category: String(body.category ?? '').trim(),
    price: Number(body.price),
    stock_quantity: Number(body.stock_quantity),
    is_active: Boolean(body.is_active),
  }

  const { data, error } = await admin.supabase
    .from('products')
    .insert(payload)
    .select('*')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ data }, { status: 201 })
}