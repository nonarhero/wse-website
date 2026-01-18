'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

interface Lead {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  status: string
  branch: {
    name: string
  }
  createdAt: string
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('')

  useEffect(() => {
    fetchLeads()
  }, [filter])

  const fetchLeads = async () => {
    try {
      const params = filter ? { status: filter } : {}
      const res = await axios.get('/api/leads', { params })
      setLeads(res.data.leads || res.data)
    } catch (error) {
      toast.error('Failed to fetch leads')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(`/api/leads/${id}`, { status })
      toast.success('อัพเดทสถานะสำเร็จ')
      fetchLeads()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="pt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-wse-blue">Lead Management</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('')}
            className={`px-4 py-2 rounded-lg ${filter === '' ? 'bg-wse-blue text-white' : 'bg-gray-200'}`}
          >
            ทั้งหมด
          </button>
          <button
            onClick={() => setFilter('NEW')}
            className={`px-4 py-2 rounded-lg ${filter === 'NEW' ? 'bg-wse-blue text-white' : 'bg-gray-200'}`}
          >
            ใหม่
          </button>
          <button
            onClick={() => setFilter('CONTACTED')}
            className={`px-4 py-2 rounded-lg ${filter === 'CONTACTED' ? 'bg-wse-blue text-white' : 'bg-gray-200'}`}
          >
            ติดต่อแล้ว
          </button>
          <button
            onClick={() => setFilter('CONVERTED')}
            className={`px-4 py-2 rounded-lg ${filter === 'CONVERTED' ? 'bg-wse-blue text-white' : 'bg-gray-200'}`}
          >
            Converted
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อ-นามสกุล</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">อีเมล</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">เบอร์โทร</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สาขา</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จัดการ</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-6 py-4 whitespace-nowrap">{lead.firstName} {lead.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.branch?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className={`px-2 py-1 rounded text-sm ${
                      lead.status === 'NEW' ? 'bg-yellow-100 text-yellow-800' :
                      lead.status === 'CONTACTED' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'CONVERTED' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    <option value="NEW">ใหม่</option>
                    <option value="CONTACTED">ติดต่อแล้ว</option>
                    <option value="CONVERTED">Converted</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(lead.createdAt), 'dd/MM/yyyy HH:mm')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900">ดูรายละเอียด</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
