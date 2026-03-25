'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Package, PlusCircle } from 'lucide-react'
import { logoutAction } from '../actions'

export default function AdminDashboardPage() {
  const router = useRouter()

  const handleSignOut = async () => {
    await logoutAction()
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-[#F7F1EA] text-[#1F1610]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-light tracking-tight">Admin <span className="font-serif italic text-[#C8935A]">Dashboard</span></h1>
          <button
            onClick={handleSignOut}
            className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 bg-[#1A120C] text-white hover:bg-[#2A1D14]"
          >
            Sign Out
          </button>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E4D4C1] mb-8">
          <h2 className="text-xl font-medium mb-4">Welcome back.</h2>
          <p className="text-[#6F5A45] mb-8">
            You are securely authenticated as an <span className="font-semibold text-[#1F1610]">Admin</span>. 
            Utilize this dashboard to manage your store&apos;s content.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              href="/admin/products" 
              className="flex items-center gap-4 p-6 border border-[#E4D4C1] rounded-xl hover:border-[#C8935A] hover:bg-[#FDFBF9] transition-all group"
            >
              <div className="w-12 h-12 bg-[#F7F1EA] rounded-full flex items-center justify-center group-hover:bg-[#E4D4C1] transition-colors">
                <Package className="w-6 h-6 text-[#1F1610]" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Manage Products</h3>
                <p className="text-sm text-[#6F5A45]">View, edit, or remove saddles</p>
              </div>
            </Link>
            
            <Link 
              href="/admin/add-product" 
              className="flex items-center gap-4 p-6 border border-[#E4D4C1] rounded-xl hover:border-[#C8935A] hover:bg-[#FDFBF9] transition-all group"
            >
              <div className="w-12 h-12 bg-[#F7F1EA] rounded-full flex items-center justify-center group-hover:bg-[#E4D4C1] transition-colors">
                <PlusCircle className="w-6 h-6 text-[#1F1610]" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Add New Product</h3>
                <p className="text-sm text-[#6F5A45]">Create a new saddle listing</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
