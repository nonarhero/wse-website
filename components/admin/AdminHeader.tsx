'use client'

import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

export default function AdminHeader() {
  const { data: session } = useSession()
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-30 lg:ml-64">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900">
            ☰
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900">🌙</button>
          <button className="text-gray-600 hover:text-gray-900">⛶</button>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="relative text-gray-600 hover:text-gray-900"
            >
              🔔
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
          <button className="text-gray-600 hover:text-gray-900">⚙️</button>
          
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-wse-blue rounded-full flex items-center justify-center text-white">
                {session?.user?.name?.charAt(0) || 'A'}
              </div>
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b">
                  <p className="font-semibold">{session?.user?.name}</p>
                  <p className="text-sm text-gray-600">{session?.user?.email}</p>
                  <p className="text-xs text-gray-500">{session?.user?.role}</p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/admin/login' })}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  ออกจากระบบ
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
