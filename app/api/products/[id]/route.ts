import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/server'

type RouteParams = {
  params: Promise<{ id: string }>
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const admin = await requireAdmin()
  if (!admin.ok) {
    return NextResponse.json({ error: admin.message }, { status: admin.status })
  }

  const { id } = await params
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
    .update(payload)
    .eq('id', id)
    .select('*')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ data })
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const admin = await requireAdmin()
  if (!admin.ok) {
    return NextResponse.json({ error: admin.message }, { status: admin.status })
  }

  const { id } = await params

  const { error } = await admin.supabase.from('products').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}