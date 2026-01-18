'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Franchise() {
  const sections = [
    { title: 'Franchise Overview', path: '/franchise/overview', icon: '📋' },
    { title: 'Franchise Partner Success', path: '/franchise/success', icon: '✅' },
    { title: 'Benefits', path: '/franchise/benefits', icon: '🎁' },
    { title: 'Application Process', path: '/franchise/application', icon: '📝' },
    { title: 'Contact Form', path: '/franchise/contact', icon: '📧' },
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
          <h1 className="text-4xl md:text-5xl font-bold text-wse-blue mb-4">Franchise</h1>
          <p className="text-lg text-gray-600">เปิดโอกาสธุรกิจแฟรนไชส์กับ Wall Street English</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <Link key={index} href={section.path}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer h-full"
              >
                <div className="text-5xl mb-4">{section.icon}</div>
                <h2 className="text-2xl font-semibold text-wse-blue">{section.title}</h2>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
