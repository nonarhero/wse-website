'use client'

import { motion } from 'framer-motion'

export default function Online() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-wse-blue mb-8">
            Online Courses
          </h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-lg text-gray-700 mb-6">
              เรียนภาษาอังกฤษออนไลน์จากที่บ้านของคุณเอง 
              ด้วยหลักสูตรดิจิทัลที่สมบูรณ์แบบและการสนับสนุนจากครูออนไลน์
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-wse-blue mb-3">💻 เรียนที่ไหนก็ได้</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• เรียนจากที่บ้านหรือที่ทำงาน</li>
                  <li>• เข้าถึงได้ 24/7</li>
                  <li>• ใช้คอมพิวเตอร์ แท็บเล็ต หรือมือถือ</li>
                  <li>• ไม่ต้องเดินทาง</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-wse-blue mb-3">👨‍🏫 ครูออนไลน์</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• ชั้นเรียนสดออนไลน์กับครูเจ้าของภาษา</li>
                  <li>• ชั้นเรียนกลุ่มเล็ก 4 คน</li>
                  <li>• ครูส่วนตัว (Personal Coach)</li>
                  <li>• การสนับสนุนตลอดเวลา</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-wse-blue mb-3">📚 เนื้อหาครบถ้วน</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• หลักสูตรดิจิทัลครบ 20 ระดับ</li>
                  <li>• บทเรียนแบบโต้ตอบ</li>
                  <li>• แบบฝึกหัดและแบบทดสอบ</li>
                  <li>• ติดตามความก้าวหน้า</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-wse-blue mb-3">⏰ ยืดหยุ่น</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• เลือกเวลาเรียนตามสะดวก</li>
                  <li>• เรียนตามจังหวะของตัวเอง</li>
                  <li>• กลับไปทบทวนได้เสมอ</li>
                  <li>• ไม่พลาดบทเรียน</li>
                </ul>
              </div>
            </div>

            <a
              href="/#register"
              className="bg-wse-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-wse-blue-light transition inline-block"
            >
              ทดลองเรียนฟรี
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
