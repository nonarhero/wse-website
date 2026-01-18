'use client'

import { motion } from 'framer-motion'

export default function TOEICTOEFL() {
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
            TOEIC / TOEFL Information
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-semibold text-wse-blue mb-4">TOEIC</h2>
              <p className="text-gray-700 mb-4">
                TOEIC (Test of English for International Communication) 
                เป็นการทดสอบภาษาอังกฤษที่ใช้สำหรับการทำงาน
              </p>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• คะแนนเต็ม 990 คะแนน</li>
                <li>• แบ่งเป็น Listening และ Reading</li>
                <li>• ใช้เวลาทดสอบ 2 ชั่วโมง</li>
                <li>• เหมาะสำหรับสมัครงาน</li>
              </ul>
              <a
                href="/learn-english/ielts-preparation"
                className="text-wse-blue hover:text-wse-blue-light font-semibold"
              >
                เรียนรู้เพิ่มเติม →
              </a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-semibold text-wse-blue mb-4">TOEFL</h2>
              <p className="text-gray-700 mb-4">
                TOEFL (Test of English as a Foreign Language) 
                เป็นการทดสอบภาษาอังกฤษที่ใช้สำหรับการเรียนต่อ
              </p>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• คะแนนเต็ม 120 คะแนน (iBT)</li>
                <li>• แบ่งเป็น 4 ทักษะ: ฟัง อ่าน เขียน พูด</li>
                <li>• ใช้เวลาทดสอบ 3-4 ชั่วโมง</li>
                <li>• เหมาะสำหรับเรียนต่อต่างประเทศ</li>
              </ul>
              <a
                href="/learn-english/ielts-preparation"
                className="text-wse-blue hover:text-wse-blue-light font-semibold"
              >
                เรียนรู้เพิ่มเติม →
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
