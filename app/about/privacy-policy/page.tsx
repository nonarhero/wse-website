'use client'

import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-wse-blue mb-8">
            นโยบายความเป็นส่วนตัว
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-wse-blue mb-4">
                บทนำ
              </h2>
              <p className="text-gray-700 mb-4">
                Wall Street English Thailand ให้ความสำคัญกับความเป็นส่วนตัวของคุณ 
                นโยบายนี้อธิบายถึงวิธีการที่เรารวบรวม ใช้ และปกป้องข้อมูลส่วนบุคคลของคุณ
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold text-wse-blue mb-4">
                ข้อมูลที่เรารวบรวม
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>ข้อมูลส่วนตัว เช่น ชื่อ นามสกุล อีเมล เบอร์โทรศัพท์</li>
                <li>ข้อมูลการเรียน เช่น ระดับภาษาอังกฤษ ความก้าวหน้าในการเรียน</li>
                <li>ข้อมูลการใช้งานเว็บไซต์ เช่น IP address, Cookies</li>
                <li>ข้อมูลการชำระเงิน (เมื่อมีการสมัครเรียน)</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-semibold text-wse-blue mb-4">
                การใช้ข้อมูล
              </h2>
              <p className="text-gray-700 mb-4">
                เราใช้ข้อมูลของคุณเพื่อ:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>ให้บริการและการสอนภาษาอังกฤษ</li>
                <li>ติดต่อและให้ข้อมูลเกี่ยวกับหลักสูตร</li>
                <li>ปรับปรุงบริการและเว็บไซต์</li>
                <li>ส่งโปรโมชันและข่าวสาร (เมื่อคุณยินยอม)</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-2xl font-semibold text-wse-blue mb-4">
                การปกป้องข้อมูล
              </h2>
              <p className="text-gray-700 mb-4">
                เรามีมาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของคุณ 
                จากการเข้าถึงโดยไม่ได้รับอนุญาต การเปิดเผย การเปลี่ยนแปลง หรือการทำลาย
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="bg-gray-50 p-8 rounded-lg"
            >
              <h2 className="text-2xl font-semibold text-wse-blue mb-4">
                ติดต่อเรา
              </h2>
              <p className="text-gray-700 mb-4">
                หากคุณมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว กรุณาติดต่อ:
              </p>
              <p className="text-gray-700">
                Email: privacy@wallstreetenglish.co.th<br />
                Call Center: 1211
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
