'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wse-blue to-wse-blue-dark py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md w-full"
      >
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl font-bold text-white mb-4">ไม่พบหน้าที่คุณค้นหา</h2>
          <p className="text-gray-200 mb-8">
            ขออภัย หน้าที่คุณต้องการอาจถูกลบหรือย้ายไปที่อื่นแล้ว
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-white text-wse-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-center"
          >
            กลับหน้าแรก
          </Link>
          <Link
            href="/blog"
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-wse-blue transition text-center"
          >
            ดูบทความ
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
