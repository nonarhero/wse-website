'use client'

import { motion } from 'framer-motion'

const jobOpenings = [
  {
    title: 'English Teacher (Native Speaker)',
    department: 'Teaching',
    location: 'ทุกสาขา',
    type: 'Full-time',
    description: 'เรากำลังมองหาครูเจ้าของภาษาที่มีประสบการณ์ในการสอนภาษาอังกฤษให้กับนักเรียนระดับผู้ใหญ่',
  },
  {
    title: 'Student Advisor',
    department: 'Sales & Customer Service',
    location: 'กรุงเทพมหานคร',
    type: 'Full-time',
    description: 'ให้คำแนะนำและแนะนำหลักสูตรที่เหมาะสมสำหรับนักเรียนใหม่ พร้อมดูแลนักเรียนให้ประสบความสำเร็จ',
  },
  {
    title: 'Academic Coordinator',
    department: 'Academic',
    location: 'สำนักงานใหญ่',
    type: 'Full-time',
    description: 'ประสานงานและดูแลหลักสูตรการศึกษา ติดตามผลการเรียนของนักเรียน และพัฒนาหลักสูตร',
  },
  {
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'สำนักงานใหญ่',
    type: 'Full-time',
    description: 'พัฒนาแผนการตลาด สร้างคอนเทนต์ และดูแลช่องทางออนไลน์ของสถาบัน',
  },
  {
    title: 'IT Support',
    department: 'IT',
    location: 'สำนักงานใหญ่',
    type: 'Full-time',
    description: 'ดูแลและแก้ไขปัญหาทางเทคนิคของระบบคอมพิวเตอร์และเครือข่ายในสถาบัน',
  },
]

export default function Careers() {
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
            สมัครงาน
          </h1>
          <p className="text-lg text-gray-600">
            เข้าร่วมกับทีมของ Wall Street English และช่วยเปลี่ยนแปลงชีวิตของนักเรียน
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-50 p-8 rounded-lg mb-12"
        >
          <h2 className="text-2xl font-semibold text-wse-blue mb-4">
            ทำไมต้องทำงานกับเรา?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-wse-blue mb-2">วัฒนธรรมองค์กรที่ดี</h3>
              <p className="text-gray-700 text-sm">สภาพแวดล้อมการทำงานที่สนับสนุนและเป็นมิตร</p>
            </div>
            <div>
              <h3 className="font-semibold text-wse-blue mb-2">โอกาสในการพัฒนา</h3>
              <p className="text-gray-700 text-sm">โปรแกรมฝึกอบรมและการพัฒนาอาชีพอย่างต่อเนื่อง</p>
            </div>
            <div>
              <h3 className="font-semibold text-wse-blue mb-2">ผลตอบแทนที่เหมาะสม</h3>
              <p className="text-gray-700 text-sm">เงินเดือนและสวัสดิการที่แข่งขันได้</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-wse-blue mb-6">
            ตำแหน่งที่เปิดรับสมัคร
          </h2>
          
          {jobOpenings.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-wse-blue mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span className="bg-gray-100 px-3 py-1 rounded">
                      {job.department}
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded">
                      {job.location}
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded">
                      {job.type}
                    </span>
                  </div>
                </div>
                <a
                  href={`mailto:careers@wallstreetenglish.co.th?subject=Application: ${job.title}`}
                  className="mt-4 md:mt-0 bg-wse-blue text-white px-6 py-2 rounded-lg hover:bg-wse-blue-light transition inline-block text-center"
                >
                  สมัครเลย
                </a>
              </div>
              <p className="text-gray-700">{job.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 bg-wse-blue text-white p-8 rounded-lg text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">
            ไม่พบตำแหน่งที่เหมาะสม?
          </h2>
          <p className="mb-6 text-gray-200">
            ส่งเรซูเม่ของคุณมาให้เรา เราจะติดต่อกลับไปเมื่อมีตำแหน่งที่เหมาะสม
          </p>
          <a
            href="mailto:careers@wallstreetenglish.co.th"
            className="bg-white text-wse-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            ส่งเรซูเม่
          </a>
        </motion.div>
      </div>
    </div>
  )
}
