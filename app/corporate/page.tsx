'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CorporateSolutions() {
  const solutions = [
    {
      title: 'Corporate Training',
      path: '/corporate/training',
      description: 'การฝึกอบรมภาษาอังกฤษสำหรับองค์กร',
      icon: '🏢',
    },
    {
      title: 'Online Corporate Courses',
      path: '/corporate/online',
      description: 'หลักสูตรออนไลน์สำหรับพนักงาน',
      icon: '💻',
    },
    {
      title: 'Custom Programs',
      path: '/corporate/custom',
      description: 'โปรแกรมตามความต้องการเฉพาะขององค์กร',
      icon: '🎯',
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
          <h1 className="text-4xl md:text-5xl font-bold text-wse-blue mb-4">Corporate Solutions</h1>
          <p className="text-lg text-gray-600">โซลูชันภาษาอังกฤษสำหรับองค์กรของคุณ</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <Link key={index} href={solution.path}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer h-full"
              >
                <div className="text-5xl mb-4">{solution.icon}</div>
                <h2 className="text-2xl font-semibold text-wse-blue mb-3">{solution.title}</h2>
                <p className="text-gray-700">{solution.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
