'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LeadForm from '@/components/LeadForm'
import Link from 'next/link'
import axios from 'axios'
import { format } from 'date-fns'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-wse-blue to-wse-blue-dark text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              เรียนภาษาอังกฤษกับความมั่นใจ
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              ใช้วิธี Multimethod® ที่ได้รับการพิสูจน์แล้ว เข้าร่วมกับนักเรียนนับล้านทั่วโลกที่ประสบความสำเร็จในการสื่อสารภาษาอังกฤษ
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#register"
                className="bg-white text-wse-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-center"
              >
                ทดลองเรียนฟรี
              </a>
              <Link
                href="/about/our-method"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-wse-blue transition text-center"
              >
                ดูหลักสูตร
              </Link>
            </div>
            <div className="flex gap-6 mt-8 text-sm">
              <div>
                <div className="text-2xl font-bold">4.8/5</div>
                <div className="text-gray-300">คะแนนรีวิว</div>
              </div>
              <div>
                <div className="text-2xl font-bold">3M+</div>
                <div className="text-gray-300">นักเรียน</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-wse-blue mb-4">
              ทำไมต้องเลือก Wall Street English?
            </h2>
            <p className="text-lg text-gray-600">
              วิธีการเรียนรู้ที่เป็นเอกลักษณ์ของเรารวมเทคโนโลยีเข้ากับความใส่ใจส่วนบุคคล
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'วิธี Multimethod® ที่พิสูจน์แล้ว',
                description: 'วิธีการเรียนรู้แบบบูรณาการของเรารวมบทเรียนดิจิทัลเข้ากับการสอนแบบตัวต่อตัว',
                icon: '📚',
              },
              {
                title: 'ครูเจ้าของภาษา',
                description: 'เรียนรู้จากครูเจ้าของภาษาที่มีใบรับรองที่เข้าใจการเดินทางเรียนรู้ของคุณ',
                icon: '👨‍🏫',
              },
              {
                title: 'ตารางเรียนยืดหยุ่น',
                description: 'เรียนตามจังหวะของคุณด้วยการเข้าถึงวัสดุออนไลน์ตลอด 24/7 และเวลาชั้นเรียนที่ยืดหยุ่น',
                icon: '⏰',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-md text-center"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-wse-blue mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Courses Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-wse-blue mb-4">
              หลักสูตรของเรา
            </h2>
            <p className="text-lg text-gray-600">
              เลือกหลักสูตรที่สมบูรณ์แบบสำหรับเป้าหมายการเรียนรู้ภาษาอังกฤษของคุณ
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'ภาษาอังกฤษทั่วไป',
                description: 'สร้างรากฐานภาษาอังกฤษของคุณด้วยหลักสูตรทั่วไปที่ครอบคลุม',
                levels: '20 ระดับ',
              },
              {
                title: 'ภาษาอังกฤษเพื่อธุรกิจ',
                description: 'พัฒนาอาชีพของคุณด้วยทักษะภาษาอังกฤษเพื่อการทำงาน',
                levels: '12 ระดับ',
              },
              {
                title: 'เตรียมสอบ IELTS',
                description: 'เตรียมสอบ IELTS ของคุณด้วยคำแนะนำจากผู้เชี่ยวชาญ',
                levels: '8 ระดับ',
              },
            ].map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-50 p-8 rounded-lg shadow-md"
              >
                <div className="h-48 bg-wse-blue-light rounded-lg mb-4 flex items-center justify-center text-white text-4xl">
                  📖
                </div>
                <h3 className="text-xl font-semibold text-wse-blue mb-3">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="text-wse-blue font-semibold mb-4">{course.levels}</div>
                <Link
                  href="/about/our-method"
                  className="text-wse-blue hover:text-wse-blue-light font-semibold"
                >
                  เรียนรู้เพิ่มเติม →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-wse-blue mb-4">
              สิ่งที่นักเรียนของเราพูด
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'มาริญา โรดริเกซ',
                role: 'นักศึกษามหาวิทยาลัย',
                text: 'ตารางเรียนที่ยืดหยุ่นช่วยให้ฉันเรียนภาษาอังกฤษขณะทำงานเต็มเวลา ตอนนี้ฉันมั่นใจในการประชุมระหว่างประเทศ!',
              },
              {
                name: 'อาเหม็ด ฮัสซัน',
                role: 'นักศึกษามหาวิทยาลัย',
                text: 'ครูเจ้าของภาษาช่วยให้ฉันปรับปรุงการออกเสียงอย่างมาก ฉันผ่านการสอบ IELTS ด้วยคะแนนสูง!',
              },
              {
                name: 'หลี่ เหว่ย',
                role: 'วิศวกร',
                text: 'วิธีการเรียนรู้แบบบูรณาการช่วยให้ฉันมีส่วนร่วม ฉันสามารถฝึกออนไลน์แล้วนำสิ่งที่เรียนรู้มาใช้ในชั้นเรียน!',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-wse-blue-light rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-wse-blue">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
                <div className="mt-4 text-yellow-500">★★★★★</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <LatestArticlesSection />

      {/* Lead Form Section */}
      <section id="register" className="py-20 bg-wse-blue text-white">
        <div className="container mx-auto px-4">
          <LeadForm />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-wse-blue-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">
              พร้อมเริ่มต้นการเดินทางภาษาอังกฤษของคุณแล้วหรือยัง?
            </h2>
            <p className="text-lg mb-8 text-gray-300">
              เข้าร่วมกับนักเรียนหลายพันคนที่เปลี่ยนชีวิตด้วยภาษาอังกฤษ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#register"
                className="bg-white text-wse-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                ทดลองเรียนฟรี
              </a>
              <Link
                href="/about/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-wse-blue transition"
              >
                ติดต่อเรา
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// Latest Articles Section Component
function LatestArticlesSection() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get('/api/articles?status=PUBLISHED')
        setArticles((res.data || []).slice(0, 6))
      } catch (error) {
        console.error('Failed to fetch articles:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  if (loading) return null

  if (articles.length === 0) return null

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-wse-blue mb-4">
            บทความล่าสุด
          </h2>
          <p className="text-lg text-gray-600">
            อ่านบทความเทคนิคและเคล็ดลับการเรียนภาษาอังกฤษจากผู้เชี่ยวชาญ
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/blog/${article.slug}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer h-full">
                  {article.featuredImage && (
                    <div className="aspect-video w-full bg-gray-200 overflow-hidden">
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {article.category && (
                      <span className="inline-block px-3 py-1 bg-wse-blue text-white text-sm rounded-full mb-3">
                        {article.category.name}
                      </span>
                    )}
                    <h3 className="text-xl font-semibold text-wse-blue mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{article.author?.name || 'WSE Team'}</span>
                      <span>
                        {format(
                          new Date(article.publishedAt || article.createdAt),
                          'dd MMM yyyy'
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-8"
        >
          <Link
            href="/blog"
            className="inline-block bg-wse-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-wse-blue-light transition"
          >
            ดูบทความทั้งหมด →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
