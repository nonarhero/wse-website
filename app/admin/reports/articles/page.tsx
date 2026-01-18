'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface ArticleStats {
  total: number
  published: number
  draft: number
  archived: number
  totalViews: number
  articles: Array<{
    id: string
    title: string
    status: string
    viewCount: number
    author: {
      name: string
    }
    category: {
      name: string
    } | null
    createdAt: string
    publishedAt: string | null
  }>
}

export default function ArticlesReportPage() {
  const [stats, setStats] = useState<ArticleStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('all')

  useEffect(() => {
    fetchReport()
  }, [dateRange])

  const fetchReport = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/articles')
      const articles = res.data || []

      // Calculate stats
      const total = articles.length
      const published = articles.filter((a: any) => a.status === 'PUBLISHED').length
      const draft = articles.filter((a: any) => a.status === 'DRAFT').length
      const archived = articles.filter((a: any) => a.status === 'ARCHIVED').length
      const totalViews = articles.reduce((sum: number, a: any) => sum + (a.viewCount || 0), 0)

      // Filter by date range if needed
      let filteredArticles = articles
      if (dateRange !== 'all') {
        const now = new Date()
        const days = dateRange === '7' ? 7 : dateRange === '30' ? 30 : 365
        const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
        filteredArticles = articles.filter((a: any) => {
          const publishDate = a.publishedAt ? new Date(a.publishedAt) : new Date(a.createdAt)
          return publishDate >= cutoffDate
        })
      }

      setStats({
        total,
        published,
        draft,
        archived,
        totalViews,
        articles: filteredArticles,
      })
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลได้')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wse-blue"></div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="pt-16">
        <p className="text-gray-600">ไม่พบข้อมูล</p>
      </div>
    )
  }

  return (
    <div className="pt-16">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-wse-blue mb-2">รายงานบทความ</h1>
          <p className="text-gray-600">สรุปสถิติและผลการเผยแพร่บทความ</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
        >
          <option value="all">ทั้งหมด</option>
          <option value="7">7 วันที่ผ่านมา</option>
          <option value="30">30 วันที่ผ่านมา</option>
          <option value="365">1 ปีที่ผ่านมา</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="text-3xl font-bold mb-2">{stats.total}</div>
          <div className="text-blue-100">บทความทั้งหมด</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="text-3xl font-bold mb-2">{stats.published}</div>
          <div className="text-green-100">เผยแพร่แล้ว</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow-lg">
          <div className="text-3xl font-bold mb-2">{stats.draft}</div>
          <div className="text-yellow-100">แบบร่าง</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="text-3xl font-bold mb-2">{stats.totalViews.toLocaleString()}</div>
          <div className="text-purple-100">ยอดวิวรวม</div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อบทความ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ผู้เขียน</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">หมวดหมู่</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ยอดวิว</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่เผยแพร่</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stats.articles.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  ยังไม่มีข้อมูลบทความ
                </td>
              </tr>
            ) : (
              stats.articles
                .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
                .map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{article.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{article.author.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{article.category?.name || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          article.status === 'PUBLISHED'
                            ? 'bg-green-100 text-green-800'
                            : article.status === 'DRAFT'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {article.status === 'PUBLISHED' ? 'เผยแพร่' : article.status === 'DRAFT' ? 'แบบร่าง' : 'เก็บไว้'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{article.viewCount || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString('th-TH')
                        : '-'}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
