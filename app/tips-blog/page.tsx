'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function TipsBlog() {
  const categories = [
    {
      title: 'Vocabulary',
      path: '/tips-blog/vocabulary',
      description: 'เรียนรู้คำศัพท์ภาษาอังกฤษที่ใช้บ่อย',
      icon: '📖',
    },
    {
      title: 'Speaking Tips',
      path: '/tips-blog/speaking',
      description: 'เทคนิคการพูดภาษาอังกฤษอย่างมั่นใจ',
      icon: '🗣️',
    },
    {
      title: 'Grammar Hacks',
      path: '/tips-blog/grammar',
      description: 'เคล็ดลับและเทคนิคไวยากรณ์ภาษาอังกฤษ',
      icon: '✍️',
    },
    {
      title: 'E-Books',
      path: '/tips-blog/ebooks',
      description: 'หนังสืออิเล็กทรอนิกส์ภาษาอังกฤษฟรี',
      icon: '📚',
    },
    {
      title: 'Exam Guides',
      path: '/tips-blog/exam-guides',
      description: 'คู่มือเตรียมสอบ IELTS, TOEIC, TOEFL',
      icon: '📝',
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
            Tips & Blog
          </h1>
          <p className="text-lg text-gray-600">
            เคล็ดลับและบทความเพื่อพัฒนาภาษาอังกฤษของคุณ
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={category.path}>
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer h-full">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h2 className="text-2xl font-semibold text-wse-blue mb-3">
                    {category.title}
                  </h2>
                  <p className="text-gray-700 mb-4">{category.description}</p>
                  <span className="text-wse-blue hover:text-wse-blue-light font-semibold">
                    ดูบทความ →
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
