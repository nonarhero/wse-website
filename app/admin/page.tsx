'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'

export default function AdminDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState({
    totalLeads: 0,
    ebookContacts: 0,
    articlesPublished: 0,
  })

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const [leadsRes, articlesRes, ebooksRes] = await Promise.all([
          axios.get('/api/leads'),
          axios.get('/api/articles?status=published'),
          axios.get('/api/ebooks'),
        ])

        setStats({
          totalLeads: leadsRes.data.pagination?.total || 0,
          ebookContacts: ebooksRes.data?.length || 0,
          articlesPublished: articlesRes.data?.length || 0,
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="pt-16">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-wse-blue mb-2">Marketing Overview</h1>
        <p className="text-gray-600">ภาพรวมประสิทธิภาพเว็บไซต์และการตลาด</p>
      </div>

      <div className="flex justify-end mb-6 space-x-4">
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          📅 Last 30 Days
        </button>
        <button className="px-4 py-2 bg-wse-blue text-white rounded-lg hover:bg-wse-blue-light">
          📥 Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100 mb-2">TOTAL LEADS</p>
              <p className="text-4xl font-bold">{stats.totalLeads}</p>
              <p className="text-purple-100 text-sm mt-2">↗ +12% from last month</p>
            </div>
            <div className="text-6xl opacity-20">👥</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-orange-100 mb-2">E-BOOK CONTACTS</p>
              <p className="text-4xl font-bold">{stats.ebookContacts}</p>
              <p className="text-orange-100 text-sm mt-2">Conversion Rate High!</p>
            </div>
            <div className="text-6xl opacity-20">📚</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100 mb-2">ARTICLES PUBLISHED</p>
              <p className="text-4xl font-bold">{stats.articlesPublished}</p>
              <p className="text-green-100 text-sm mt-2">SEO Value Growing</p>
            </div>
            <div className="text-6xl opacity-20">📄</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-wse-blue mb-4">Leads Trend (Last 7 Days)</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            📊 Chart will be displayed here
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-wse-blue mb-4">Traffic Source</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            🌐 Chart will be displayed here
          </div>
        </div>
      </div>
    </div>
  )
}
