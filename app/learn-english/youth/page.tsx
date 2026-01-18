'use client'

import { motion } from 'framer-motion'

export default function Youth() {
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
            Youth / School Programs
          </h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-lg text-gray-700 mb-6">
              หลักสูตรภาษาอังกฤษที่ออกแบบมาสำหรับเยาวชนอายุ 12-17 ปี 
              พร้อมวิธีการสอนที่สนุกสนานและเหมาะสมกับวัย
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-wse-blue mb-3">🎒 สำหรับวัยรุ่น</h3>
                <p className="text-gray-700 mb-3">
                  หลักสูตรที่ออกแบบมาสำหรับนักเรียนมัธยม พร้อมเนื้อหาที่น่าสนใจและทันสมัย
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>• วัย 12-14 ปี: หลักสูตรพื้นฐาน</li>
                  <li>• วัย 15-17 ปี: หลักสูตรเตรียมสอบ</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-wse-blue mb-3">🏫 โปรแกรมสำหรับโรงเรียน</h3>
                <p className="text-gray-700">
                  เราสามารถจัดหลักสูตรเฉพาะให้กับโรงเรียนของคุณ 
                  เพื่อช่วยพัฒนาทักษะภาษาอังกฤษของนักเรียนทั้งโรงเรียน
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-wse-blue mb-3">✨ กิจกรรมที่สนุกสนาน</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• กิจกรรมกลุ่มและการเล่นเกม</li>
                  <li>• โปรเจคและการนำเสนอ</li>
                  <li>• การแข่งขันและกิจกรรมพิเศษ</li>
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
