'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Promotions() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-wse-blue mb-4">โปรโมชัน</h1>
          <p className="text-lg text-gray-600">โปรโมชันและข้อเสนอพิเศษสำหรับคุณ</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/promotions/credit-card">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer"
            >
              <div className="text-5xl mb-4">💳</div>
              <h2 className="text-2xl font-semibold text-wse-blue mb-3">Credit Card Offers</h2>
              <p className="text-gray-700">ข้อเสนอพิเศษสำหรับผู้ใช้บัตรเครดิต</p>
            </motion.div>
          </Link>
          
          <Link href="/promotions/seasonal">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer"
            >
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl font-semibold text-wse-blue mb-3">Seasonal Specials</h2>
              <p className="text-gray-700">โปรโมชันตามเทศกาลและโอกาสพิเศษ</p>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  )
}
