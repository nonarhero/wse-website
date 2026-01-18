'use client'

import { motion } from 'framer-motion'

export default function StudentLogin() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h1 className="text-3xl font-bold text-wse-blue mb-6 text-center">Student Login</h1>
            <form className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username หรือ Email
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-wse-blue text-white py-3 rounded-lg font-semibold hover:bg-wse-blue-light transition"
              >
                เข้าสู่ระบบ
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
