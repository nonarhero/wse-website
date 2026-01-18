'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'

interface User {
  id: string
  email: string
  name: string
  role: 'SUPER_ADMIN' | 'ADMIN' | 'WRITER' | 'REVIEWER'
  createdAt: string
  updatedAt: string
  _count?: {
    articles: number
  }
}

const ROLES = [
  { value: 'SUPER_ADMIN', label: 'Super Admin - สิทธิ์เต็มทุกอย่าง', color: 'red' },
  { value: 'ADMIN', label: 'Admin - จัดการเนื้อหาและระบบ', color: 'blue' },
  { value: 'WRITER', label: 'Writer - เขียนและแก้ไขบทความ', color: 'green' },
  { value: 'REVIEWER', label: 'Reviewer - ตรวจสอบและอนุมัติบทความ', color: 'yellow' },
]

function UserForm({ user, onClose, onSuccess }: { user: User | null; onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    email: user?.email || '',
    name: user?.name || '',
    password: '',
    role: user?.role || 'WRITER',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (user) {
        // Update user
        const updateData: any = {
          email: formData.email,
          name: formData.name,
          role: formData.role,
        }
        if (formData.password) {
          updateData.password = formData.password
        }
        await axios.put(`/api/users/${user.id}`, updateData)
        toast.success('อัพเดทผู้ใช้สำเร็จ')
      } else {
        // Create user
        if (!formData.password) {
          toast.error('กรุณากรอกรหัสผ่าน')
          return
        }
        await axios.post('/api/users', formData)
        toast.success('สร้างผู้ใช้สำเร็จ')
      }
      onSuccess()
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'เกิดข้อผิดพลาด')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-wse-blue mb-4">
          {user ? 'แก้ไขผู้ใช้' : 'เพิ่มผู้ใช้ใหม่'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              อีเมล <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ชื่อ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              รหัสผ่าน {!user && <span className="text-red-500">*</span>}
              {user && <span className="text-gray-500 text-xs">(เว้นว่างไว้ถ้าไม่ต้องการเปลี่ยน)</span>}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required={!user}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              บทบาท (Role) <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
            >
              {ROLES.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
              <p className="font-semibold mb-2">รายละเอียดบทบาท:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Super Admin:</strong> จัดการทุกอย่าง รวมถึงสร้าง/ลบผู้ใช้ จัดการ Settings</li>
                <li><strong>Admin:</strong> จัดการเนื้อหา คอร์ส สาขา Leads แบนเนอร์</li>
                <li><strong>Writer:</strong> เขียน แก้ไข บทความของตัวเอง (ไม่สามารถเผยแพร่ได้)</li>
                <li><strong>Reviewer:</strong> ตรวจสอบและอนุมัติบทความที่เขียนโดย Writer</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-wse-blue text-white rounded-lg hover:bg-wse-blue-light transition"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function UsersPage() {
  const { data: session } = useSession()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  useEffect(() => {
    if (session?.user?.role === 'SUPER_ADMIN') {
      fetchUsers()
    }
  }, [session])

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/users')
      setUsers(res.data)
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลได้')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้?')) return

    try {
      await axios.delete(`/api/users/${id}`)
      toast.success('ลบผู้ใช้สำเร็จ')
      fetchUsers()
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'ไม่สามารถลบได้')
    }
  }

  if (!session || session.user.role !== 'SUPER_ADMIN') {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">ไม่มีสิทธิ์เข้าถึง</h1>
          <p className="text-gray-600">เฉพาะ Super Admin เท่านั้นที่สามารถเข้าถึงหน้านี้ได้</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wse-blue"></div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-wse-blue mb-2">Users & Roles Management</h1>
          <p className="text-gray-600">จัดการผู้ใช้และสิทธิ์การเข้าถึงระบบ</p>
        </div>
        <button
          onClick={() => {
            setEditingUser(null)
            setShowForm(true)
          }}
          className="bg-wse-blue text-white px-6 py-2 rounded-lg hover:bg-wse-blue-light transition"
        >
          + เพิ่มผู้ใช้
        </button>
      </div>

      {showForm && (
        <UserForm
          user={editingUser}
          onClose={() => {
            setShowForm(false)
            setEditingUser(null)
          }}
          onSuccess={() => {
            fetchUsers()
            setShowForm(false)
            setEditingUser(null)
          }}
        />
      )}

      {/* Role Permissions Info */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">📋 ระบบ Permission แบบ WordPress:</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          {ROLES.map((role) => (
            <div key={role.value} className="bg-white p-3 rounded border">
              <div className={`font-semibold mb-1 text-${role.color}-600`}>
                {role.value}
              </div>
              <div className="text-gray-600 text-xs">{role.label.split(' - ')[1]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">อีเมล</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">บทบาท</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">บทความ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่สร้าง</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จัดการ</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  ยังไม่มีข้อมูลผู้ใช้
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    {session.user.id === user.id && (
                      <span className="text-xs text-blue-600">(คุณ)</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'SUPER_ADMIN'
                          ? 'bg-red-100 text-red-800'
                          : user.role === 'ADMIN'
                          ? 'bg-blue-100 text-blue-800'
                          : user.role === 'WRITER'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user._count?.articles || 0}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString('th-TH')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setEditingUser(user)
                        setShowForm(true)
                      }}
                      className="text-wse-blue hover:text-wse-blue-light mr-4"
                    >
                      แก้ไข
                    </button>
                    {session.user.id !== user.id && (
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        ลบ
                      </button>
                    )}
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
