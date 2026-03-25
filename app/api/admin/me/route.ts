import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (!admin.ok) {
    return NextResponse.json({ error: admin.message }, { status: admin.status })
  }

  return NextResponse.json({
    data: {
      id: admin.user.id,
      email: admin.user.email,
      is_admin: true,
    },
  })
}