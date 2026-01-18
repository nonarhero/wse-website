'use client'

import { motion } from 'framer-motion'

export default function OurMethod() {
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
            วิธีการสอนของเรา
          </h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-semibold text-wse-blue mb-6">
              Multimethod® - วิธีที่พิสูจน์แล้ว
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              วิธีการ Multimethod® ของเราถูกพัฒนาขึ้นโดยเฉพาะเพื่อการเรียนรู้ภาษาอังกฤษ 
              ซึ่งผสมผสานหลักการเรียนรู้หลายรูปแบบเพื่อให้คุณประสบความสำเร็จ
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-wse-blue mb-3">
                  🔄 วงจรการเรียนรู้
                </h3>
                <p className="text-gray-700">
                  เรียนรู้ผ่านการฟัง ซ้ำ ทดสอบ และพูด - วงจรที่พิสูจน์แล้วว่ามีประสิทธิภาพ
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-wse-blue mb-3">
                  💻 การเรียนรู้ดิจิทัล
                </h3>
                <p className="text-gray-700">
                  เรียนออนไลน์เมื่อไหร่ก็ได้ 24/7 ด้วยบทเรียนแบบโต้ตอบที่สนุกสนาน
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-wse-blue mb-3">
                  👥 ชั้นเรียนแบบกลุ่มเล็ก
                </h3>
                <p className="text-gray-700">
                  ฝึกพูดในชั้นเรียนกลุ่มเล็ก 4 คน เพื่อให้คุณได้ฝึกพูดมากขึ้น
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-wse-blue mb-3">
                  🎯 การสอนเฉพาะบุคคล
                </h3>
                <p className="text-gray-700">
                  ครูและโค้ชส่วนตัวจะช่วยปรับแผนการเรียนรู้ให้เหมาะกับคุณโดยเฉพาะ
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-semibold text-wse-blue mb-6">
              CEFR - กรอบอ้างอิงยุโรป
            </h2>
            <p className="text-gray-700 mb-6">
              หลักสูตรของเราใช้ CEFR (Common European Framework of Reference for Languages) 
              ซึ่งเป็นมาตรฐานสากลสำหรับการประเมินความสามารถทางภาษา
            </p>
            
            <div className="space-y-4">
              {[
                { level: 'A1-A2', name: 'ระดับเริ่มต้น', desc: 'สามารถสื่อสารในสถานการณ์พื้นฐาน' },
                { level: 'B1-B2', name: 'ระดับกลาง', desc: 'สามารถสื่อสารในสถานการณ์ทั่วไปและทำงาน' },
                { level: 'C1-C2', name: 'ระดับสูง', desc: 'สามารถสื่อสารได้อย่างคล่องแคล่วและเป็นมืออาชีพ' },
              ].map((item, index) => (
                <div key={index} className="bg-wse-blue text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{item.level}</h3>
                    <span className="text-sm bg-white text-wse-blue px-3 py-1 rounded">
                      {item.name}
                    </span>
                  </div>
                  <p className="text-gray-200">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
