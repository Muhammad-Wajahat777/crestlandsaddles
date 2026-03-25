'use server'

import { cookies } from 'next/headers'

export async function loginAction(id: string, password: string) {
  const adminId = process.env.ADMIN_ID
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminId || !adminPassword) {
    return { error: 'Admin credentials are not configured on the server.' }
  }

  if (id === adminId && password === adminPassword) {
    const cookieStore = await cookies()
    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
    return { success: true }
  }

  return { error: 'Invalid ID or password.' }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
}

export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.get('admin_session')?.value === 'true'
}
