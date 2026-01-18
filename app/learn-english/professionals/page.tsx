'use client'

import { motion } from 'framer-motion'

export default function Professionals() {
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
            English for Professionals
          </h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-lg text-gray-700 mb-6">
              พัฒนาทักษะภาษาอังกฤษสำหรับการทำงานและการธุรกิจ 
              เรียนรู้การสื่อสารอย่างมืออาชีพในสถานการณ์การทำงานจริง
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-wse-blue mb-3">💼 ธุรกิจและการทำงาน</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• การนำเสนอและการประชุม</li>
                  <li>• การเขียนอีเมลทางธุรกิจ</li>
                  <li>• การเจรจาต่อรอง</li>
                  <li>• การโทรศัพท์ทางธุรกิจ</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-wse-blue mb-3">🌐 ภาษาอังกฤษระดับมืออาชีพ</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• คำศัพท์และสำนวนธุรกิจ</li>
                  <li>• ไวยากรณ์ที่ใช้ในที่ทำงาน</li>
                  <li>• การสื่อสารข้ามวัฒนธรรม</li>
                  <li>• Networking และ Small Talk</li>
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
