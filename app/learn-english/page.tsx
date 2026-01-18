'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function LearnEnglish() {
  const courses = [
    {
      title: 'Full-Access Courses',
      path: '/learn-english/full-access',
      description: 'หลักสูตรแบบเต็มรูปแบบพร้อมเข้าถึงทุกสิ่ง',
      icon: '🎓',
    },
    {
      title: 'IELTS Preparation',
      path: '/learn-english/ielts-preparation',
      description: 'เตรียมสอบ IELTS ด้วยหลักสูตรที่ครบถ้วน',
      icon: '📝',
    },
    {
      title: 'English for Professionals',
      path: '/learn-english/professionals',
      description: 'ภาษาอังกฤษสำหรับธุรกิจและการทำงาน',
      icon: '💼',
    },
    {
      title: 'Youth / School Programs',
      path: '/learn-english/youth',
      description: 'หลักสูตรสำหรับเยาวชนและโรงเรียน',
      icon: '🎒',
    },
    {
      title: 'Online Courses',
      path: '/learn-english/online',
      description: 'เรียนออนไลน์ที่บ้านของคุณเอง',
      icon: '💻',
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
            เรียนภาษาอังกฤษ
          </h1>
          <p className="text-lg text-gray-600">
            เลือกหลักสูตรที่เหมาะสมกับเป้าหมายของคุณ
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={course.path}>
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer h-full">
                  <div className="text-5xl mb-4">{course.icon}</div>
                  <h2 className="text-2xl font-semibold text-wse-blue mb-3">
                    {course.title}
                  </h2>
                  <p className="text-gray-700 mb-4">{course.description}</p>
                  <span className="text-wse-blue hover:text-wse-blue-light font-semibold">
                    เรียนรู้เพิ่มเติม →
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
