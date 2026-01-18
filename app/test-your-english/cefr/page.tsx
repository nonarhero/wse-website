'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import Link from 'next/link'

type TestStage = 'intro' | 'otp' | 'test' | 'result' | 'leadForm'

interface CEFRTest {
  id: string
  title: string
  description: string | null
  questions: Array<{
    question: string
    options: string[]
    correctAnswer: string
  }>
  isActive: boolean
}

interface Location {
  id: string
  name: string
}

interface Course {
  id: string
  title: string
  description: string | null
  type: string
  isActive: boolean
}

const CENTERS = [
  { value: 'Silom', label: 'สีลม อาคารยูไนเต็ดเซ็นเตอร์ (Silom United Center Office Building)' },
  { value: 'Central World', label: 'เซ็นทรัลเวิลด์ (Central World)' },
  { value: 'WestGate', label: 'เซ็นทรัล พลาซา เวสต์เกต (Central Plaza Westgate)' },
  { value: 'Pinklao', label: 'เซ็นทรัล พลาซา ปิ่นเกล้า (Central Pinklao)' },
  { value: 'Rama2', label: 'เซ็นทรัล พลาซา พระราม 2 (Central Rama 2)' },
  { value: 'Rangsit', label: 'ฟิวเจอร์พาร์ค รังสิต (Future Park Rangsit)' },
  { value: 'Fashion Island', label: 'แฟชั่นไอส์แลนด์ (Fashion Island)' },
  { value: 'Mega Bangna', label: 'เมกาบางนา (Mega Bangna)' },
  { value: 'Seacon', label: 'ซีคอนสแควร์ ศรีนครินทร์ (Seacon Square Srinakarin)' },
  { value: 'SiRacha', label: 'เซ็นทรัล ศรีราชา (Central Si Racha)' },
  { value: 'Rayong', label: 'ระยอง แพชชั่น ช้อปปิ้ง เดสติเนชั่น (Rayong Passione Shopping Destination)' },
  { value: 'KhonKaen', label: 'เซ็นทรัล พลาซา ขอนแก่น (Central Khonkaen)' },
  { value: 'UdonThani', label: 'เซ็นทรัล พลาซา อุดรธานี (Central Plaza Udonthani)' },
]

const OCCUPATIONS = [
  { value: 'High School Student', label: 'นักเรียนมัธยมศึกษา' },
  { value: 'University Student', label: 'นักศึกษามหาวิทยาลัย' },
  { value: 'Employee', label: 'พนักงานเอกชน' },
  { value: 'Self-employed', label: 'นายจ้าง' },
  { value: 'Freelancer', label: 'ฟรีแลนซ์' },
  { value: 'Unemployed', label: 'ว่างงาน' },
  { value: 'Parent/Guardian', label: 'เป็นผู้ปกครอง' },
  { value: 'Retired', label: 'เกษียณอายุ' },
  { value: 'Other', label: 'อื่นๆ' },
]

const BEST_TIME_OPTIONS = [
  { value: '9 AM -12 PM', label: '9 AM -12 PM' },
  { value: '12 PM -3 PM', label: '12 PM -3 PM' },
  { value: '3 PM -6 PM', label: '3 PM -6 PM' },
  { value: '6 PM -9 PM', label: '6 PM -9 PM' },
]

export default function CEFRTest() {
  const [stage, setStage] = useState<TestStage>('intro')
  const [otpEnabled, setOtpEnabled] = useState(false)
  const [test, setTest] = useState<CEFRTest | null>(null)
  const [phone, setPhone] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [answers, setAnswers] = useState<string[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [result, setResult] = useState<any>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(false)

  // Lead form data
  const [leadForm, setLeadForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    center: '',
    occupation: '',
    bestTime: '9 AM -12 PM',
    pdpa1: false, // I allow the company to collect information...
    pdpa2: false, // I have read and agree...
  })

  useEffect(() => {
    checkOtpSettings()
    fetchActiveTest()
    fetchCourses()
    fetchLocations()
    
    // Get UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('utm_medium')) {
      setLeadForm((prev) => ({
        ...prev,
        // Store UTM params - we'll use them when submitting
      }))
    }
  }, [])

  const checkOtpSettings = async () => {
    try {
      const res = await axios.get('/api/settings')
      setOtpEnabled(res.data.otp_enabled === 'true')
    } catch (error) {
      console.error('Failed to check OTP settings')
    }
  }

  const fetchActiveTest = async () => {
    try {
      const res = await axios.get('/api/cefr-tests')
      const activeTest = res.data.find((t: CEFRTest) => t.isActive)
      if (activeTest) {
        setTest(activeTest)
      }
    } catch (error) {
      toast.error('ไม่สามารถโหลดแบบทดสอบได้')
    }
  }

  const fetchCourses = async () => {
    try {
      const res = await axios.get('/api/courses')
      setCourses(res.data.filter((c: Course) => c.isActive))
    } catch (error) {
      console.error('Failed to fetch courses')
    }
  }

  const fetchLocations = async () => {
    try {
      const res = await axios.get('/api/locations')
      setLocations(res.data)
    } catch (error) {
      console.error('Failed to fetch locations')
    }
  }

  const handleSendOTP = async () => {
    if (!phone || phone.length !== 10) {
      toast.error('กรุณากรอกเบอร์โทรศัพท์ 10 หลัก')
      return
    }

    try {
      setLoading(true)
      const res = await axios.post('/api/cefr-test/otp', { phone })
      setOtpSent(true)
      toast.success('ส่ง OTP เรียบร้อยแล้ว')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'ไม่สามารถส่ง OTP ได้')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = () => {
    if (!otpCode) {
      toast.error('กรุณากรอกรหัส OTP')
      return
    }

    // In production, verify OTP properly
    // For now, just proceed to test
    setStage('test')
  }

  const handleStartTest = () => {
    if (otpEnabled) {
      setStage('otp')
    } else {
      setStage('test')
    }
  }

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)

    // Auto move to next question after 1 second
    setTimeout(() => {
      if (currentQuestion < (test?.questions.length || 0) - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        handleSubmitTest(newAnswers)
      }
    }, 1000)
  }

  const handleSubmitTest = async (finalAnswers?: string[]) => {
    const testAnswers = finalAnswers || answers
    if (testAnswers.length !== test?.questions.length) {
      toast.error('กรุณาตอบคำถามให้ครบทุกข้อ')
      return
    }

    try {
      setLoading(true)
      
      // If we already have a result, just show it
      if (result) {
        setStage('result')
        return
      }

      // Submit test result (without lead first)
      const res = await axios.post('/api/cefr-test/submit', {
        testId: test?.id,
        answers: testAnswers,
        otpCode: otpEnabled ? otpCode : null,
        phone: otpEnabled ? phone : null,
      })

      setResult(res.data.result)
      setStage('result')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'ไม่สามารถส่งคำตอบได้')
    } finally {
      setLoading(false)
    }
  }

  const handleLeadSubmit = async () => {
    // Validate
    if (!leadForm.firstName || !leadForm.lastName || !leadForm.email || !leadForm.phone || !leadForm.center) {
      toast.error('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }

    if (!leadForm.pdpa1 || !leadForm.pdpa2) {
      toast.error('กรุณายอมรับเงื่อนไข PDPA ทั้งสองข้อ')
      return
    }

    if (leadForm.phone.length !== 10) {
      toast.error('กรุณากรอกเบอร์โทรศัพท์ 10 หลัก')
      return
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(leadForm.email)) {
      toast.error('รูปแบบอีเมลไม่ถูกต้อง')
      return
    }

    try {
      setLoading(true)

      // Get URL params for UTM
      const urlParams = new URLSearchParams(window.location.search)
      const utmMedium = urlParams.get('utm_medium') || ''
      const utmTerm = urlParams.get('utm_term') || ''
      const utmContent = urlParams.get('utm_content') || ''
      const utmCampaign = urlParams.get('utm_campaign') || ''

      // Find branch ID from center value
      const centerOption = CENTERS.find((c) => c.value === leadForm.center)
      
      // Try to find location by center value or name match
      let location = locations.find((loc) => {
        const locName = loc.name.toLowerCase()
        const centerLabel = centerOption?.label.toLowerCase() || ''
        const centerValue = leadForm.center.toLowerCase()
        
        return (
          locName.includes(centerValue) ||
          locName.includes(centerLabel) ||
          centerLabel.includes(locName.split(' ')[0])
        )
      })

      // If still not found, try to get first active location as fallback
      if (!location) {
        location = locations.find((loc) => loc.id) || locations[0]
        if (!location) {
          toast.error('ไม่พบสาขาที่เลือก กรุณาติดต่อผู้ดูแลระบบ')
          return
        }
      }

      // Determine PDPA value
      const pdpaValue = leadForm.pdpa1 && leadForm.pdpa2 ? 'Y' : leadForm.pdpa1 ? 'ValidCall' : ''

      // If result already exists, just create lead separately
      // Otherwise, create both test result and lead together
      if (result?.id && !result?.leadId) {
        // Create lead separately
        await axios.post('/api/leads', {
          firstName: leadForm.firstName,
          lastName: leadForm.lastName,
          email: leadForm.email,
          phone: leadForm.phone,
          branchId: location.id,
          occupation: leadForm.occupation || null,
          url: window.location.href,
          utmMedium: utmMedium || null,
          utmTerm: utmTerm || null,
          utmContent: utmContent || null,
          utmCampaign: utmCampaign || null,
          pdpa: pdpaValue,
        })
        // Note: Test result and lead will be linked by phone/email in reports
      } else {
        // Submit test result with lead data (creates both)
        const res = await axios.post('/api/cefr-test/submit', {
          testId: test?.id,
          answers: answers.length > 0 ? answers : [],
          leadData: {
            firstName: leadForm.firstName,
            lastName: leadForm.lastName,
            email: leadForm.email,
            phone: leadForm.phone,
            branchId: location.id,
            occupation: leadForm.occupation || null,
            url: window.location.href,
            utmMedium: utmMedium || null,
            utmTerm: utmTerm || null,
            utmContent: utmContent || null,
            utmCampaign: utmCampaign || null,
            pdpa: pdpaValue,
          },
          otpCode: otpEnabled ? otpCode : null,
          phone: leadForm.phone,
        })
        
        if (res.data.result) {
          setResult(res.data.result)
        }
      }

      toast.success('ส่งข้อมูลเรียบร้อยแล้ว! เราจะติดต่อกลับไปเร็วๆ นี้')
      setStage('result')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'ไม่สามารถส่งข้อมูลได้')
    } finally {
      setLoading(false)
    }
  }

  // Get recommended courses based on CEFR level
  const getRecommendedCourses = (level: string) => {
    if (!courses.length) return []

    // Map CEFR levels to course types
    const levelMap: Record<string, string[]> = {
      A1: ['GENERAL_ENGLISH', 'YOUTH'],
      A2: ['GENERAL_ENGLISH', 'YOUTH'],
      B1: ['GENERAL_ENGLISH', 'BUSINESS'],
      B2: ['GENERAL_ENGLISH', 'BUSINESS', 'IELTS'],
      C1: ['IELTS', 'BUSINESS'],
      C2: ['IELTS', 'BUSINESS'],
    }

    const recommendedTypes = levelMap[level] || ['GENERAL_ENGLISH']
    return courses.filter((c) => recommendedTypes.includes(c.type)).slice(0, 3)
  }

  if (!test && stage !== 'intro') {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">ไม่พบแบบทดสอบ</h1>
          <p className="text-gray-600">กรุณาติดต่อผู้ดูแลระบบ</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Intro Stage */}
          {stage === 'intro' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-wse-blue mb-4">CEFR Level Test</h1>
              <p className="text-xl text-gray-700 mb-6">
                ทดสอบนี้จะช่วยประเมินระดับภาษาอังกฤษของคุณตามมาตรฐาน CEFR
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-wse-blue mb-3">ระดับ CEFR:</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• A1-A2: ระดับเริ่มต้น</li>
                  <li>• B1-B2: ระดับกลาง</li>
                  <li>• C1-C2: ระดับสูง</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-blue-800">
                  <strong>หมายเหตุ:</strong> การทดสอบใช้เวลาประมาณ 30 นาที
                  {otpEnabled && ' และต้องยืนยันหมายเลขโทรศัพท์ด้วย OTP ก่อนทำแบบทดสอบ'}
                </p>
              </div>

              <button
                onClick={handleStartTest}
                className="bg-wse-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-wse-blue-light transition"
              >
                เริ่มทดสอบ
              </button>
            </motion.div>
          )}

          {/* OTP Stage */}
          {stage === 'otp' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-semibold text-wse-blue mb-4">ยืนยันหมายเลขโทรศัพท์</h2>
              <p className="text-gray-700 mb-6">
                กรุณากรอกหมายเลขโทรศัพท์เพื่อรับรหัส OTP สำหรับยืนยันตัวตน
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="0891234567"
                    maxLength={10}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">กรุณากรอกเบอร์โทรศัพท์ 10 หลัก</p>
                </div>

                {otpSent && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      รหัส OTP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="กรอกรหัส OTP"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
                    />
                  </div>
                )}

                <div className="flex gap-4">
                  {!otpSent ? (
                    <button
                      onClick={handleSendOTP}
                      disabled={loading || phone.length !== 10}
                      className="bg-wse-blue text-white px-6 py-2 rounded-lg hover:bg-wse-blue-light transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'กำลังส่ง...' : 'ส่ง OTP'}
                    </button>
                  ) : (
                    <button
                      onClick={handleVerifyOTP}
                      disabled={loading || !otpCode}
                      className="bg-wse-blue text-white px-6 py-2 rounded-lg hover:bg-wse-blue-light transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'กำลังตรวจสอบ...' : 'ยืนยันและเริ่มทดสอบ'}
                    </button>
                  )}
                  <button
                    onClick={() => setStage('intro')}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Test Stage */}
          {stage === 'test' && test && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-wse-blue">
                    คำถามที่ {currentQuestion + 1} จาก {test.questions.length}
                  </h2>
                  <div className="text-sm text-gray-600">
                    ความคืบหน้า: {Math.round(((currentQuestion + 1) / test.questions.length) * 100)}%
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-wse-blue h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / test.questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  {test.questions[currentQuestion].question}
                </h3>
                <div className="space-y-3">
                  {test.questions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(option)}
                      className={`w-full text-left px-4 py-3 border-2 rounded-lg transition ${
                        answers[currentQuestion] === option
                          ? 'border-wse-blue bg-wse-blue text-white'
                          : 'border-gray-300 hover:border-wse-blue hover:bg-blue-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← ก่อนหน้า
                </button>
                {currentQuestion === test.questions.length - 1 && (
                  <button
                    onClick={() => handleSubmitTest()}
                    disabled={!answers[currentQuestion]}
                    className="bg-wse-blue text-white px-6 py-2 rounded-lg hover:bg-wse-blue-light transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ส่งคำตอบ
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Result Stage */}
          {stage === 'result' && result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-wse-blue mb-4">ผลการทดสอบ</h2>
                <div className="text-6xl font-bold text-wse-blue mb-2">{result.level}</div>
                <p className="text-gray-600 mb-4">
                  คุณได้ {result.score} จาก {result.totalQuestions} คะแนน ({Math.round((result.score / result.totalQuestions) * 100)}%)
                </p>
                <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg inline-block">
                  <p className="font-semibold">
                    {result.level === 'C1' || result.level === 'C2'
                      ? 'ยอดเยี่ยม! ระดับสูงมาก'
                      : result.level === 'B1' || result.level === 'B2'
                      ? 'ดีมาก! ระดับกลาง'
                      : 'ดีแล้ว! ยังมีพื้นที่พัฒนาอีกเยอะ'}
                  </p>
                </div>
              </div>

              {/* Recommended Courses */}
              {courses.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-wse-blue mb-4">คอร์สเรียนที่แนะนำสำหรับคุณ</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {getRecommendedCourses(result.level).map((course) => (
                      <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
                        <h4 className="font-semibold text-wse-blue mb-2">{course.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t pt-6">
                <button
                  onClick={() => setStage('leadForm')}
                  className="w-full bg-wse-blue text-white py-3 rounded-lg font-semibold hover:bg-wse-blue-light transition"
                >
                  กรอกข้อมูลเพื่อรับคำแนะนำเพิ่มเติม
                </button>
              </div>
            </motion.div>
          )}

          {/* Lead Form Stage */}
          {stage === 'leadForm' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-semibold text-wse-blue mb-6">กรอกข้อมูลเพื่อรับคำแนะนำ</h2>

              <form onSubmit={(e) => { e.preventDefault(); handleLeadSubmit(); }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ชื่อจริง <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={leadForm.firstName}
                      onChange={(e) => setLeadForm({ ...leadForm, firstName: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      นามสกุล <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={leadForm.lastName}
                      onChange={(e) => setLeadForm({ ...leadForm, lastName: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    อีเมล <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                    placeholder="0891234567"
                    maxLength={10}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    สาขา <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={leadForm.center}
                    onChange={(e) => setLeadForm({ ...leadForm, center: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
                  >
                    <option value="">กรุณาเลือกสาขา</option>
                    {CENTERS.map((center) => (
                      <option key={center.value} value={center.value}>
                        {center.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">อาชีพ</label>
                  <select
                    value={leadForm.occupation}
                    onChange={(e) => setLeadForm({ ...leadForm, occupation: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
                  >
                    <option value="">กรุณาเลือกอาชีพ</option>
                    {OCCUPATIONS.map((occ) => (
                      <option key={occ.value} value={occ.value}>
                        {occ.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">เวลาที่สะดวกรับโทร</label>
                  <select
                    value={leadForm.bestTime}
                    onChange={(e) => setLeadForm({ ...leadForm, bestTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
                  >
                    {BEST_TIME_OPTIONS.map((time) => (
                      <option key={time.value} value={time.value}>
                        {time.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="pdpa1"
                      checked={leadForm.pdpa1}
                      onChange={(e) => setLeadForm({ ...leadForm, pdpa1: e.target.checked })}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="pdpa1" className="text-sm text-gray-700">
                      I allow the company to collect information and to contact me back for more details. <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="pdpa2"
                      checked={leadForm.pdpa2}
                      onChange={(e) => setLeadForm({ ...leadForm, pdpa2: e.target.checked })}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="pdpa2" className="text-sm text-gray-700">
                      I have read and agree to the Terms and Conditions & Privacy Policy. <span className="text-red-500">*</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-wse-blue text-white py-3 rounded-lg font-semibold hover:bg-wse-blue-light transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'กำลังส่ง...' : 'ส่งข้อมูล'}
                </button>
              </form>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
