'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { format } from 'date-fns'

interface Article {
  id: string
  title: string
  slug: string
  excerpt?: string
  featuredImage?: string
  category?: { name: string; slug: string }
  tags: { name: string; slug: string }[]
  author: { name: string }
  publishedAt?: string
  createdAt: string
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const res = await axios.get('/api/articles?status=PUBLISHED')
      setArticles(res.data || [])
    } catch (error: any) {
      console.error('Failed to fetch articles:', error.response?.data || error.message)
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wse-blue"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-wse-blue mb-4">
            บทความและเทคนิคภาษาอังกฤษ
          </h1>
          <p className="text-lg text-gray-600">
            อ่านบทความเทคนิคและเคล็ดลับการเรียนภาษาอังกฤษ
          </p>
        </motion.div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">ยังไม่มีบทความ</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/blog/${article.slug}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer h-full">
                    {article.featuredImage && (
                      <div className="aspect-video w-full bg-gray-200 overflow-hidden">
                        <img
                          src={article.featuredImage}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      {article.category && (
                        <span className="inline-block px-3 py-1 bg-wse-blue text-white text-sm rounded-full mb-3">
                          {article.category.name}
                        </span>
                      )}
                      <h2 className="text-xl font-semibold text-wse-blue mb-2 line-clamp-2">
                        {article.title}
                      </h2>
                      {article.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                      )}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{article.author.name}</span>
                        <span>
                          {format(
                            new Date(article.publishedAt || article.createdAt),
                            'dd MMM yyyy'
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
