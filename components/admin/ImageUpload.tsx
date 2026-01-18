'use client'

import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface ImageUploadProps {
  onUploadComplete: (url: string) => void
  currentImage?: string
}

export default function ImageUpload({ onUploadComplete, currentImage }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('กรุณาเลือกไฟล์รูปภาพ')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('ไฟล์ต้องมีขนาดไม่เกิน 5MB')
      return
    }

    setUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const imageUrl = res.data.url
      setPreview(imageUrl)
      onUploadComplete(imageUrl)
      toast.success('อัพโหลดรูปภาพสำเร็จ')
    } catch (error) {
      toast.error('อัพโหลดรูปภาพล้มเหลว')
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {preview && (
        <div className="border rounded-lg p-4">
          <img
            src={preview}
            alt="Preview"
            className="max-w-full h-48 object-contain mx-auto"
          />
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {preview ? 'เปลี่ยนรูปภาพ' : 'อัพโหลดรูปภาพ'}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-wse-blue file:text-white
            hover:file:bg-wse-blue-light
            file:cursor-pointer
            disabled:opacity-50"
        />
        {uploading && (
          <p className="mt-2 text-sm text-gray-500">กำลังอัพโหลด...</p>
        )}
      </div>

      <p className="text-xs text-gray-500">
        รองรับไฟล์: JPG, PNG, GIF (ขนาดไม่เกิน 5MB)
      </p>
    </div>
  )
}
