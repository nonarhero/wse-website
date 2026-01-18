'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface TrackingTag {
  id: string
  name: string
  type: string
  code: string
  isActive: boolean
  position: string // 'head' | 'body'
  createdAt: string
  updatedAt: string
}

const TAG_TYPES = [
  { value: 'google_tag_manager', label: 'Google Tag Manager (GTM)' },
  { value: 'google_analytics', label: 'Google Analytics (GA4)' },
  { value: 'google_search_console', label: 'Google Search Console' },
  { value: 'facebook_pixel', label: 'Facebook Pixel' },
  { value: 'tiktok_pixel', label: 'TikTok Pixel' },
  { value: 'custom', label: 'Custom Script' },
]

const POSITIONS = [
  { value: 'head', label: '<head> - สำหรับ meta tags และ tracking scripts' },
  { value: 'body', label: '<body> - สำหรับ noscript และ body scripts' },
]

function TagForm({ tag, onClose, onSuccess }: { tag: TrackingTag | null; onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    name: tag?.name || '',
    type: tag?.type || 'custom',
    code: tag?.code || '',
    isActive: tag?.isActive ?? true,
    position: tag?.position || 'head',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (tag) {
        await axios.put(`/api/tracking-tags/${tag.id}`, formData)
        toast.success('อัพเดท Tracking Tag สำเร็จ')
      } else {
        await axios.post('/api/tracking-tags', formData)
        toast.success('สร้าง Tracking Tag สำเร็จ')
      }
      onSuccess()
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'เกิดข้อผิดพลาด')
    }
  }

  // Pre-fill code templates based on type
  const handleTypeChange = (type: string) => {
    setFormData({ ...formData, type })
    
    if (!tag && !formData.code) {
      let template = ''
      switch (type) {
        case 'google_tag_manager':
          template = '<!-- Google Tag Manager -->\n<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\'gtm.start\':\nnew Date().getTime(),event:\'gtm.js\'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';j.async=true;j.src=\n\'https://www.googletagmanager.com/gtm.js?id=\'+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,\'script\',\'dataLayer\',\'GTM-XXXXXXX\');</script>\n<!-- End Google Tag Manager -->'
          break
        case 'google_analytics':
          template = '<!-- Google Analytics -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag(\'js\', new Date());\n  gtag(\'config\', \'G-XXXXXXXXXX\');\n</script>'
          break
        case 'facebook_pixel':
          template = '<!-- Facebook Pixel Code -->\n<script>\n!function(f,b,e,v,n,t,s)\n{if(f.fbq)return;n=f.fbq=function(){n.callMethod?\nn.callMethod.apply(n,arguments):n.queue.push(arguments)};\nif(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version=\'2.0\';\nn.queue=[];t=b.createElement(e);t.async=!0;\nt.src=v;s=b.getElementsByTagName(e)[0];\ns.parentNode.insertBefore(t,s)}(window, document,\'script\',\n\'https://connect.facebook.net/en_US/fbevents.js\');\nfbq(\'init\', \'YOUR_PIXEL_ID\');\nfbq(\'track\', \'PageView\');\n</script>\n<noscript><img height="1" width="1" style="display:none"\nsrc="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"\n/></noscript>'
          break
        case 'tiktok_pixel':
          template = '<!-- TikTok Pixel Code -->\n<script>\n!function (w, d, t) {\n  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};\n\n  ttq.load(\'YOUR_PIXEL_ID\');\n  ttq.page();\n}(window, document, \'ttq\');\n</script>'
          break
        default:
          template = '<!-- Custom Script -->\n<script>\n  // Your custom tracking code here\n</script>'
      }
      setFormData({ ...formData, type, code: template })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-wse-blue mb-4">
          {tag ? 'แก้ไข Tracking Tag' : 'เพิ่ม Tracking Tag ใหม่'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ชื่อ Tag <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="เช่น Google Tag Manager, Facebook Pixel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ประเภท Tag <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
            >
              {TAG_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ตำแหน่งที่จะแสดง <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
            >
              {POSITIONS.map((pos) => (
                <option key={pos.value} value={pos.value}>
                  {pos.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Code (Script/HTML) <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              required
              rows={12}
              placeholder="วาง tracking code หรือ script ที่นี่..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-wse-blue focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 Tips: วาง code จาก Google Tag Manager, Facebook Pixel, TikTok Pixel หรือ custom script
            </p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">เปิดใช้งาน (แสดงในหน้าเว็บ)</label>
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

export default function TrackingPage() {
  const [tags, setTags] = useState<TrackingTag[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTag, setEditingTag] = useState<TrackingTag | null>(null)

  useEffect(() => {
    fetchTags()
  }, [])

  const fetchTags = async () => {
    try {
      const res = await axios.get('/api/tracking-tags')
      setTags(res.data)
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลได้')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบ Tracking Tag นี้?')) return

    try {
      await axios.delete(`/api/tracking-tags/${id}`)
      toast.success('ลบ Tracking Tag สำเร็จ')
      fetchTags()
    } catch (error) {
      toast.error('ไม่สามารถลบได้')
    }
  }

  const handleToggleActive = async (tag: TrackingTag) => {
    try {
      await axios.put(`/api/tracking-tags/${tag.id}`, {
        ...tag,
        isActive: !tag.isActive,
      })
      toast.success('อัพเดทสถานะสำเร็จ')
      fetchTags()
    } catch (error) {
      toast.error('ไม่สามารถอัพเดทได้')
    }
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
          <h1 className="text-3xl font-bold text-wse-blue mb-2">Tracking Tags Management</h1>
          <p className="text-gray-600">จัดการ Tracking Scripts (Google Analytics, Facebook Pixel, TikTok, Custom)</p>
        </div>
        <button
          onClick={() => {
            setEditingTag(null)
            setShowForm(true)
          }}
          className="bg-wse-blue text-white px-6 py-2 rounded-lg hover:bg-wse-blue-light transition"
        >
          + เพิ่ม Tracking Tag
        </button>
      </div>

      {/* Info Box */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">📌 วิธีใช้งาน:</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Tracking Tags จะแสดงในหน้าเว็บทุกหน้าโดยอัตโนมัติ</li>
          <li>เลือกตำแหน่ง <code className="bg-blue-100 px-1 rounded">head</code> หรือ <code className="bg-blue-100 px-1 rounded">body</code> ตามที่ tracking service กำหนด</li>
          <li>ปิด/เปิดใช้งานได้โดยไม่ต้องลบ Tag</li>
          <li>รองรับ: Google Tag Manager, Google Analytics, Facebook Pixel, TikTok Pixel, Custom Scripts</li>
        </ul>
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
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อ Tag</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ประเภท</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ตำแหน่ง</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่สร้าง</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จัดการ</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tags.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  ยังไม่มี Tracking Tags
                  <br />
                  <span className="text-sm">คลิก "+ เพิ่ม Tracking Tag" เพื่อเริ่มต้น</span>
                </td>
              </tr>
            ) : (
              tags.map((tag) => (
                <tr key={tag.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{tag.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {TAG_TYPES.find((t) => t.value === tag.type)?.label || tag.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      &lt;{tag.position}&gt;
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActive(tag)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        tag.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {tag.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(tag.createdAt).toLocaleDateString('th-TH')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setEditingTag(tag)
                        setShowForm(true)
                      }}
                      className="text-wse-blue hover:text-wse-blue-light mr-4"
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => handleDelete(tag.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      ลบ
                    </button>
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
