'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: '📊' },
  {
    name: 'Content Management',
    icon: '📝',
    children: [
      { name: 'บทความ', href: '/admin/articles' },
      { name: 'หมวดหมู่', href: '/admin/categories' },
      { name: 'Tags', href: '/admin/tags' },
    ],
  },
  { name: 'Course Management', href: '/admin/courses', icon: '🎓' },
  { name: 'Location Management', href: '/admin/locations', icon: '📍' },
  { name: 'Leads', href: '/admin/leads', icon: '👥' },
  { name: 'CEFR Test System', href: '/admin/cefr-tests', icon: '📋' },
  {
    name: 'Reports',
    icon: '📈',
    children: [
      { name: 'บทความ', href: '/admin/reports/articles' },
      { name: 'Leads', href: '/admin/reports/leads' },
      { name: 'E-Books', href: '/admin/reports/ebooks' },
    ],
  },
  { name: 'Banners', href: '/admin/banners', icon: '🖼️' },
  { name: 'E-Books', href: '/admin/ebooks', icon: '📚' },
  { name: 'Tracking Tags', href: '/admin/tracking', icon: '🔗' },
  { name: 'System Settings', href: '/admin/settings', icon: '⚙️' },
  { name: 'Users & Roles', href: '/admin/users', icon: '👤' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<string[]>([])
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) =>
      prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name]
    )
  }

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileOpen])

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-wse-blue text-white p-2 rounded-lg shadow-lg"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-wse-blue-dark text-white shadow-lg z-40 transform transition-transform duration-300 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6">
          <Link href="/admin" className="text-2xl font-bold text-white">
            WSE Admin
          </Link>
        </div>
        
        <nav className="px-4 overflow-y-auto h-[calc(100vh-80px)]">
          {menuItems.map((item) => (
            <div key={item.name}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-1 hover:bg-wse-blue transition ${
                      openMenus.includes(item.name) ? 'bg-wse-blue' : ''
                    }`}
                  >
                    <span className="flex items-center">
                      <span className="mr-2">{item.icon}</span>
                      <span className="text-sm">{item.name}</span>
                    </span>
                    <span className="text-xs">{openMenus.includes(item.name) ? '▼' : '▶'}</span>
                  </button>
                  {openMenus.includes(item.name) && (
                    <div className="ml-4 mt-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2 rounded-lg mb-1 hover:bg-wse-blue transition text-sm ${
                            pathname === child.href ? 'bg-wse-blue' : ''
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg mb-1 hover:bg-wse-blue transition text-sm ${
                    pathname === item.href ? 'bg-wse-blue' : ''
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
