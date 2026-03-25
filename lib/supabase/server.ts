import { createClient } from '@supabase/supabase-js'
import { verifySession } from '@/app/admin/actions'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY

export function createServerSupabase() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  })
}

export async function requireAdmin() {
  const isAuth = await verifySession()

  if (!isAuth) {
    return { ok: false as const, status: 401, message: 'Invalid session cookie.' }
  }

  // Admin routes MUST use the Service Role Key since we removed front-end 
  // Supabase Auth and RLS will otherwise block the 'anon' user from editing/deleting.
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  })

  return { ok: true as const, supabase }
}
