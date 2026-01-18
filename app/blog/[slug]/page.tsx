'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  featuredImage?: string
  category?: { name: string; slug: string }
  tags: { name: string; slug: string }[]
  author: { name: string }
  publishedAt?: string
  createdAt: string
}

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticle()
  }, [slug])

  const fetchArticle = async () => {
    try {
      const res = await axios.get(`/api/articles/by-slug/${slug}`)
      setArticle(res.data)
    } catch (error: any) {
      if (error.response?.status === 404) {
        setArticle(null)
      } else {
        console.error('Failed to fetch article:', error.response?.data || error.message)
        setArticle(null)
      }
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

  if (!article) {
    return (
      <div className="min-h-screen py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">ไม่พบบทความ</h1>
        <Link href="/blog" className="text-wse-blue hover:text-wse-blue-light">
          กลับไปหน้าบทความ
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <article className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/blog" className="text-wse-blue hover:text-wse-blue-light mb-6 inline-block">
            ← กลับไปหน้าบทความ
          </Link>

          {article.featuredImage && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-auto"
              />
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            {article.category && (
              <Link
                href={`/blog/category/${article.category.slug}`}
                className="inline-block px-4 py-2 bg-wse-blue text-white rounded-full text-sm mb-4"
              >
                {article.category.name}
              </Link>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-wse-blue mb-6">
              {article.title}
            </h1>

            <div className="flex items-center text-gray-600 mb-8 pb-8 border-b">
              <div>
                <p className="font-semibold">{article.author.name}</p>
                <p className="text-sm">
                  {format(
                    new Date(article.publishedAt || article.createdAt),
                    'dd MMMM yyyy'
                  )}
                </p>
              </div>
            </div>

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }}
            />

            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t">
                <p className="text-sm font-semibold text-gray-700 mb-3">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag.slug || tag.name}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </article>
    </div>
  )
}
