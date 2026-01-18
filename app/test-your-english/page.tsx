'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function TestYourEnglish() {
  const tests = [
    {
      title: 'CEFR Level Test',
      path: '/test-your-english/cefr',
      description: 'ทดสอบระดับภาษาอังกฤษตามมาตรฐาน CEFR',
      icon: '📊',
    },
    {
      title: 'IELTS Practice',
      path: '/test-your-english/ielts-practice',
      description: 'ฝึกทำข้อสอบ IELTS แบบจำลอง',
      icon: '📝',
    },
    {
      title: 'TOEIC/TOEFL Info',
      path: '/test-your-english/toeic-toefl',
      description: 'ข้อมูลเกี่ยวกับการสอบ TOEIC และ TOEFL',
      icon: '📚',
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-wse-blue mb-4">
            ทดสอบภาษาอังกฤษของคุณ
          </h1>
          <p className="text-lg text-gray-600">
            ตรวจสอบระดับภาษาอังกฤษและความพร้อมของคุณ
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tests.map((test, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={test.path}>
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer h-full">
                  <div className="text-5xl mb-4">{test.icon}</div>
                  <h2 className="text-2xl font-semibold text-wse-blue mb-3">
                    {test.title}
                  </h2>
                  <p className="text-gray-700 mb-4">{test.description}</p>
                  <span className="text-wse-blue hover:text-wse-blue-light font-semibold">
                    เริ่มทดสอบ →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
