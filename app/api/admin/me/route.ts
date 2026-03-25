import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/server'

export async function GET() {
  const admin = await requireAdmin()
  if (!admin.ok) {
    return NextResponse.json({ error: admin.message }, { status: admin.status })
  }

  return NextResponse.json({
    data: {
      id: 'admin',
      email: 'admin@crestlandsaddles.com',
      is_admin: true,
    },
  })
}