'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import ImageUpload from '@/components/admin/ImageUpload'

interface Category {
  id: string
  name: string
  slug: string
}

interface Tag {
  id: string
  name: string
  slug: string
}

export default function ArticleEditor() {
  const params = useParams()
  const router = useRouter()
  const articleId = params.id as string
  const isNew = articleId === 'new'

  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    status: 'DRAFT',
    categoryId: '',
    tagIds: [] as string[],
  })

  useEffect(() => {
    fetchCategories()
    fetchTags()
    if (!isNew) {
      fetchArticle()
    }
  }, [articleId, isNew])

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories')
      setCategories(res.data)
    } catch (error) {
      console.error('Failed to fetch categories')
    }
  }

  const fetchTags = async () => {
    try {
      const res = await axios.get('/api/tags')
      setTags(res.data)
    } catch (error) {
      console.error('Failed to fetch tags')
    }
  }

  const fetchArticle = async () => {
    try {
      const res = await axios.get(`/api/articles/${articleId}`)
      const article = res.data
      setFormData({
        title: article.title,
        slug: article.slug,
        content: article.content,
        excerpt: article.excerpt || '',
        featuredImage: article.featuredImage || '',
        status: article.status,
        categoryId: article.categoryId || '',
        tagIds: article.tags?.map((tag: Tag) => tag.id) || [],
      })
    } catch (error) {
      toast.error('Failed to fetch article')
    }
  }

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: isNew ? generateSlug(title) : formData.slug,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = {
        ...formData,
        tags: formData.tagIds,
      }

      if (isNew) {
        await axios.post('/api/articles', data)
        toast.success('สร้างบทความสำเร็จ')
      } else {
        await axios.put(`/api/articles/${articleId}`, data)
        toast.success('อัพเดทบทความสำเร็จ')
      }
      router.push('/admin/articles')
    } catch (error) {
      toast.error('Failed to save article')
    }
  }

  return (
    <div className="pt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-wse-blue">
          {isNew ? 'เขียนบทความใหม่' : 'แก้ไขบทความ'}
        </h1>
        <button
          onClick={() => router.push('/admin/articles')}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          ย้อนกลับ
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">หัวข้อ *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">บทสรุป</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">เนื้อหา *</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows={20}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono"
            placeholder="เขียนเนื้อหาบทความที่นี่ (HTML/Markdown supported)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">รูปภาพหลัก</label>
          <ImageUpload
            currentImage={formData.featuredImage}
            onUploadComplete={(url) => setFormData({ ...formData, featuredImage: url })}
          />
          <input
            type="url"
            value={formData.featuredImage}
            onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
            placeholder="หรือใส่ URL รูปภาพโดยตรง"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">หมวดหมู่</label>
          <select
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">ไม่ระบุ</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <label key={tag.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.tagIds.includes(tag.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({ ...formData, tagIds: [...formData.tagIds, tag.id] })
                    } else {
                      setFormData({ ...formData, tagIds: formData.tagIds.filter(id => id !== tag.id) })
                    }
                  }}
                  className="mr-2"
                />
                {tag.name}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">สถานะ</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="DRAFT">ฉบับร่าง</option>
            <option value="PUBLISHED">เผยแพร่</option>
            <option value="ARCHIVED">เก็บถาวร</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin/articles')}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-wse-blue text-white rounded-lg hover:bg-wse-blue-light"
          >
            {isNew ? 'สร้าง' : 'บันทึก'}
          </button>
        </div>
      </form>
    </div>
  )
}
