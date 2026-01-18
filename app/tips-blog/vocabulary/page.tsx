'use client'

import { motion } from 'framer-motion'

export default function Vocabulary() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-wse-blue mb-8">Vocabulary</h1>
          <p className="text-lg text-gray-700 mb-6">เรียนรู้คำศัพท์ภาษาอังกฤษที่ใช้บ่อยในชีวิตประจำวันและการทำงาน</p>
          <div className="bg-gray-50 p-8 rounded-lg">
            <p className="text-gray-700">บทความคำศัพท์จะปรากฏที่นี่</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
