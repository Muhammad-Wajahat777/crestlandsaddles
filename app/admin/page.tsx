'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginAction } from './actions'

export default function AdminLoginPage() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const result = await loginAction(id, password)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      router.push('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F1EA] px-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-[#E4D4C1]">
        <h1 className="text-3xl font-light text-[#1F1610] mb-6 text-center">Admin <span className="font-serif italic text-[#C8935A]">Access</span></h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}
          
          <div>
            <label className="block text-sm font-medium text-[#6F5A45] mb-1">Admin ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-[#D4C1AB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C8935A] text-[#1F1610]"
              required
              autoComplete="username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#6F5A45] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-[#D4C1AB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C8935A] text-[#1F1610]"
              required
              autoComplete="current-password"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1A120C] text-white py-3 rounded-lg hover:bg-[#2A1D14] transition-colors font-medium mt-6 disabled:opacity-70"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
