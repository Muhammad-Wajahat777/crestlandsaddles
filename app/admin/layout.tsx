'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { verifySession } from './actions'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checkingAdmin, setCheckingAdmin] = useState(true)

  useEffect(() => {
    const checkAdminAccess = async () => {
      const isAuth = await verifySession()

      if (!isAuth) {
        setCheckingAdmin(false)
        if (pathname !== '/admin') {
          router.replace('/admin')
        }
        return
      }

      // If authorized but trying to view the login page
      if (pathname === '/admin') {
        router.replace('/admin/dashboard')
        return
      }

      setCheckingAdmin(false)
    }

    void checkAdminAccess()
  }, [pathname, router])

  if (checkingAdmin) {
    return (
      <div className="min-h-screen bg-[#F7F1EA] text-[#1F1610] pt-32 px-6">
        <p className="max-w-4xl mx-auto text-center font-medium">Checking admin access...</p>
      </div>
    )
  }

  return <>{children}</>
}