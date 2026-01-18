'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SelfExplore() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-wse-blue mb-4">Self Explore</h1>
          <p className="text-lg text-gray-600">สำรวจและใช้งานฟีเจอร์ต่างๆ ของเรา</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/test-your-english">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer text-center"
            >
              <div className="text-5xl mb-4">📊</div>
              <h2 className="text-2xl font-semibold text-wse-blue mb-3">Test Your English</h2>
              <p className="text-gray-700">ทดสอบระดับภาษาอังกฤษของคุณ</p>
            </motion.div>
          </Link>

          <Link href="/#register">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer text-center"
            >
              <div className="text-5xl mb-4">✍️</div>
              <h2 className="text-2xl font-semibold text-wse-blue mb-3">Register Free Trial</h2>
              <p className="text-gray-700">ลงทะเบียนทดลองเรียนฟรี</p>
            </motion.div>
          </Link>

          <Link href="/about/locations">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer text-center"
            >
              <div className="text-5xl mb-4">📍</div>
              <h2 className="text-2xl font-semibold text-wse-blue mb-3">Center Locator</h2>
              <p className="text-gray-700">ค้นหาสาขาใกล้คุณ</p>
            </motion.div>
          </Link>

          <Link href="/student-login">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer text-center"
            >
              <div className="text-5xl mb-4">🔐</div>
              <h2 className="text-2xl font-semibold text-wse-blue mb-3">Student Login</h2>
              <p className="text-gray-700">เข้าสู่ระบบสำหรับนักเรียน</p>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  )
}
