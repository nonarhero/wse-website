'use client'

import { motion } from 'framer-motion'

export default function IELTSPractice() {
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
            IELTS Practice Test
          </h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-lg text-gray-700 mb-6">
              ฝึกทำข้อสอบ IELTS แบบจำลองเพื่อประเมินความพร้อมของคุณ 
              ก่อนทำการสอบจริง
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-wse-blue mb-3">📝 แบบทดสอบจำลอง</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• การฟัง (Listening) - 30 นาที</li>
                  <li>• การอ่าน (Reading) - 60 นาที</li>
                  <li>• การเขียน (Writing) - 60 นาที</li>
                  <li>• การพูด (Speaking) - 11-14 นาที</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-wse-blue mb-3">📊 รับผลการประเมิน</h3>
                <p className="text-gray-700 mb-3">
                  หลังจากทำการทดสอบ คุณจะได้รับ:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>• คะแนนรวมและคะแนนแต่ละทักษะ</li>
                  <li>• คำแนะนำในการพัฒนาตนเอง</li>
                  <li>• แผนการเรียนที่เหมาะสม</li>
                </ul>
              </div>
            </div>

            <div className="bg-wse-blue text-white p-8 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-4">ต้องการทำแบบทดสอบ IELTS Practice?</h3>
              <p className="mb-6 text-gray-200">ติดต่อเราวันนี้เพื่อจองการทดสอบ</p>
              <a
                href="/about/contact"
                className="bg-white text-wse-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
              >
                ติดต่อเรา
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
