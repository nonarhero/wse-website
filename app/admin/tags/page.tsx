'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface Tag {
  id: string
  name: string
  slug: string
}

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTag, setEditingTag] = useState<Tag | null>(null)

  useEffect(() => {
    fetchTags()
  }, [])

  const fetchTags = async () => {
    try {
      const res = await axios.get('/api/tags')
      setTags(res.data)
    } catch (error) {
      toast.error('Failed to fetch tags')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="pt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-wse-blue">Tag Management</h1>
        <button
          onClick={() => {
            setEditingTag(null)
            setShowForm(true)
          }}
          className="bg-wse-blue text-white px-6 py-2 rounded-lg hover:bg-wse-blue-light"
        >
          + เพิ่ม Tag
        </button>
      </div>

      {showForm && (
        <TagForm
          tag={editingTag}
          onClose={() => {
            setShowForm(false)
            setEditingTag(null)
          }}
          onSuccess={() => {
            fetchTags()
            setShowForm(false)
            setEditingTag(null)
          }}
        />
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อ Tag</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จัดการ</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tags.map((tag) => (
              <tr key={tag.id}>
                <td className="px-6 py-4 whitespace-nowrap">{tag.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tag.slug}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      setEditingTag(tag)
                      setShowForm(true)
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    แก้ไข
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

function TagForm({ tag, onClose, onSuccess }: { tag: Tag | null; onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    name: tag?.name || '',
    slug: tag?.slug || '',
  })

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (tag) {
        await axios.put(`/api/tags/${tag.id}`, formData)
        toast.success('อัพเดท Tag สำเร็จ')
      } else {
        await axios.post('/api/tags', { ...formData, slug: formData.slug || generateSlug(formData.name) })
        toast.success('สร้าง Tag สำเร็จ')
      }
      onSuccess()
    } catch (error) {
      toast.error('Failed to save tag')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-wse-blue mb-4">
          {tag ? 'แก้ไข Tag' : 'เพิ่ม Tag ใหม่'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ Tag</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              ยกเลิก
            </button>
            <button type="submit" className="px-6 py-2 bg-wse-blue text-white rounded-lg hover:bg-wse-blue-light">
              บันทึก
            </button>
          </div>
        </form>
      </div>
      </div>
  )
}
