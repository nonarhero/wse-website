'use client'

import { motion } from 'framer-motion'

export default function WhoWeAre() {
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
            เราเป็นใคร
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-semibold text-wse-blue mb-4">
                เกี่ยวกับ Wall Street English
              </h2>
              <p className="text-gray-700 mb-4">
                Wall Street English เป็นสถาบันสอนภาษาอังกฤษระดับโลกที่มีประสบการณ์มากว่า 50 ปี 
                ก่อตั้งขึ้นในปี 1972 และมีศูนย์การเรียนรู้มากกว่า 400 แห่งใน 28 ประเทศทั่วโลก
              </p>
              <p className="text-gray-700 mb-4">
                เรามีความภาคภูมิใจที่ได้ช่วยนักเรียนหลายล้านคนพัฒนาทักษะภาษาอังกฤษและบรรลุเป้าหมาย
                ไม่ว่าจะเป็นการทำงาน เรียนต่อ หรือการเดินทาง
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-semibold text-wse-blue mb-4">
                พันธกิจของเรา
              </h2>
              <p className="text-gray-700 mb-4">
                พันธกิจของเราคือการช่วยให้ทุกคนสามารถสื่อสารภาษาอังกฤษได้อย่างมั่นใจ 
                ผ่านวิธีการสอนที่พิสูจน์แล้วและให้ความสำคัญกับแต่ละบุคคล
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>ให้การเรียนภาษาอังกฤษที่มีคุณภาพสูงสุด</li>
                <li>สร้างสภาพแวดล้อมการเรียนรู้ที่สนับสนุนและเป็นมิตร</li>
                <li>ใช้เทคโนโลยีล่าสุดเพื่อเพิ่มประสิทธิภาพการเรียนรู้</li>
                <li>มุ่งมั่นในการช่วยให้นักเรียนบรรลุเป้าหมาย</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gray-50 p-8 rounded-lg"
            >
              <h2 className="text-2xl font-semibold text-wse-blue mb-4">
                เป้าหมายของเรา
              </h2>
              <p className="text-gray-700 mb-4">
                เรามุ่งมั่นที่จะเป็นสถาบันสอนภาษาอังกฤษชั้นนำในประเทศไทย 
                โดยให้บริการที่มีคุณภาพและช่วยให้นักเรียนทุกคนประสบความสำเร็จในการเรียนรู้ภาษาอังกฤษ
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
