'use client'

import { motion } from 'framer-motion'

export default function IELTSPreparation() {
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
            IELTS Preparation
          </h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-lg text-gray-700 mb-6">
              เตรียมสอบ IELTS ด้วยหลักสูตรที่ครอบคลุมทุกทักษะ: ฟัง พูด อ่าน เขียน 
              พร้อมเทคนิคและกลยุทธ์การสอบจากครูที่มีประสบการณ์
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-wse-blue mb-3">📚 ครอบคลุมทุกทักษะ</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• การฟัง (Listening)</li>
                  <li>• การอ่าน (Reading)</li>
                  <li>• การเขียน (Writing)</li>
                  <li>• การพูด (Speaking)</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-wse-blue mb-3">🎯 เทคนิคการสอบ</h3>
                <p className="text-gray-700">
                  เรียนรู้เทคนิคและกลยุทธ์เฉพาะในการทำข้อสอบ IELTS 
                  รวมถึงการจัดการเวลาและการตอบคำถามอย่างมีประสิทธิภาพ
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-wse-blue mb-3">📊 ทดสอบความพร้อม</h3>
                <p className="text-gray-700">
                  ทำแบบทดสอบจำลอง (Mock Test) เพื่อประเมินความพร้อมและระบุจุดที่ต้องพัฒนาก่อนสอบจริง
                </p>
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
