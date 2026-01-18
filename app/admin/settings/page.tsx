'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    site_title: '',
    site_description: '',
    site_logo: '',
    otp_enabled: 'false',
    smtp_host: '',
    smtp_port: '',
    smtp_user: '',
    smtp_password: '',
    sms_notification_enabled: 'false',
    admin_phone: '',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await axios.get('/api/settings')
      setSettings((prev) => ({ ...prev, ...res.data }))
    } catch (error) {
      toast.error('Failed to fetch settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('/api/settings', settings)
      toast.success('บันทึกการตั้งค่าสำเร็จ')
    } catch (error) {
      toast.error('Failed to save settings')
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="pt-16">
      <h1 className="text-3xl font-bold text-wse-blue mb-6">System Settings</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-wse-blue mb-4">ข้อมูลเว็บไซต์</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อเว็บไซต์</label>
              <input
                type="text"
                value={settings.site_title}
                onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">คำอธิบาย</label>
              <textarea
                value={settings.site_description}
                onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL โลโก้</label>
              <input
                type="url"
                value={settings.site_logo}
                onChange={(e) => setSettings({ ...settings, site_logo: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-wse-blue mb-4">ระบบ OTP สำหรับ CEFR Test</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="otp_enabled"
                checked={settings.otp_enabled === 'true'}
                onChange={(e) => setSettings({ ...settings, otp_enabled: e.target.checked ? 'true' : 'false' })}
                className="mr-2 w-5 h-5"
              />
              <label htmlFor="otp_enabled" className="text-sm font-semibold text-gray-700 cursor-pointer">
                เปิดใช้งาน OTP สำหรับยืนยันตัวตนก่อนทำแบบทดสอบ CEFR
              </label>
            </div>
            <p className="text-xs text-gray-600 ml-7">
              เมื่อเปิดใช้งาน ผู้ใช้จะต้องยืนยันหมายเลขโทรศัพท์ด้วย OTP ก่อนทำแบบทดสอบภาษาอังกฤษ
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-wse-blue mb-4">SMTP Email</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Host</label>
              <input
                type="text"
                value={settings.smtp_host}
                onChange={(e) => setSettings({ ...settings, smtp_host: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
              <input
                type="number"
                value={settings.smtp_port}
                onChange={(e) => setSettings({ ...settings, smtp_port: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User</label>
              <input
                type="text"
                value={settings.smtp_user}
                onChange={(e) => setSettings({ ...settings, smtp_user: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={settings.smtp_password}
                onChange={(e) => setSettings({ ...settings, smtp_password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-wse-blue mb-4">การแจ้งเตือน SMS</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.sms_notification_enabled === 'true'}
                onChange={(e) => setSettings({ ...settings, sms_notification_enabled: e.target.checked ? 'true' : 'false' })}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700">เปิดใช้งาน SMS Notification</label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรแอดมิน</label>
              <input
                type="tel"
                value={settings.admin_phone}
                onChange={(e) => setSettings({ ...settings, admin_phone: e.target.value })}
                placeholder="0812345678"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="px-6 py-2 bg-wse-blue text-white rounded-lg hover:bg-wse-blue-light">
            บันทึกการตั้งค่า
          </button>
        </div>
      </form>
    </div>
  )
}
