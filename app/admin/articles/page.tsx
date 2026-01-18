'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  slug: string
  status: string
  author: { name: string }
  category?: { name: string }
  tags: { name: string }[]
  createdAt: string
  publishedAt?: string
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('')

  useEffect(() => {
    fetchArticles()
  }, [filter])

  const fetchArticles = async () => {
    try {
      const params = filter ? { status: filter } : {}
      const res = await axios.get('/api/articles', { params })
      setArticles(res.data)
    } catch (error) {
      toast.error('Failed to fetch articles')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบบทความนี้?')) return

    try {
      await axios.delete(`/api/articles/${id}`)
      toast.success('ลบบทความสำเร็จ')
      fetchArticles()
    } catch (error) {
      toast.error('Failed to delete article')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="pt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-wse-blue">Article Management</h1>
        <Link
          href="/admin/articles/new"
          className="bg-wse-blue text-white px-6 py-2 rounded-lg hover:bg-wse-blue-light"
        >
          + เขียนบทความใหม่
        </Link>
      </div>

      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setFilter('')}
          className={`px-4 py-2 rounded-lg ${filter === '' ? 'bg-wse-blue text-white' : 'bg-gray-200'}`}
        >
          ทั้งหมด
        </button>
        <button
          onClick={() => setFilter('DRAFT')}
          className={`px-4 py-2 rounded-lg ${filter === 'DRAFT' ? 'bg-wse-blue text-white' : 'bg-gray-200'}`}
        >
          บฉบับร่าง
        </button>
        <button
          onClick={() => setFilter('PUBLISHED')}
          className={`px-4 py-2 rounded-lg ${filter === 'PUBLISHED' ? 'bg-wse-blue text-white' : 'bg-gray-200'}`}
        >
          เผยแพร่แล้ว
        </button>
        <button
          onClick={() => setFilter('ARCHIVED')}
          className={`px-4 py-2 rounded-lg ${filter === 'ARCHIVED' ? 'bg-wse-blue text-white' : 'bg-gray-200'}`}
        >
          เก็บถาวร
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">หัวข้อ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">หมวดหมู่</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ผู้เขียน</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จัดการ</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <tr key={article.id}>
                <td className="px-6 py-4">
                  <Link href={`/admin/articles/${article.id}`} className="text-blue-600 hover:text-blue-900">
                    {article.title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{article.category?.name || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{article.author.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-sm ${
                    article.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                    article.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {article.status === 'PUBLISHED' ? 'เผยแพร่แล้ว' : article.status === 'DRAFT' ? 'ฉบับร่าง' : 'เก็บถาวร'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(article.createdAt), 'dd/MM/yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <Link
                    href={`/admin/articles/${article.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    แก้ไข
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
