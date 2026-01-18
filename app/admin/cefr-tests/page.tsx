'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

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
  createdAt: string
  updatedAt: string
}

interface Question {
  question: string
  options: string[]
  correctAnswer: string
}

export default function CEFRTestsPage() {
  const [tests, setTests] = useState<CEFRTest[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTest, setEditingTest] = useState<CEFRTest | null>(null)

  useEffect(() => {
    fetchTests()
  }, [])

  const fetchTests = async () => {
    try {
      const res = await axios.get('/api/cefr-tests')
      setTests(res.data)
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลได้')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบการทดสอบนี้?')) return

    try {
      await axios.delete(`/api/cefr-tests/${id}`)
      toast.success('ลบการทดสอบสำเร็จ')
      fetchTests()
    } catch (error) {
      toast.error('ไม่สามารถลบได้')
    }
  }

  const handleToggleActive = async (test: CEFRTest) => {
    try {
      await axios.put(`/api/cefr-tests/${test.id}`, {
        ...test,
        isActive: !test.isActive,
      })
      toast.success('อัพเดทสถานะสำเร็จ')
      fetchTests()
    } catch (error) {
      toast.error('ไม่สามารถอัพเดทได้')
    }
  }

  if (loading) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wse-blue"></div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-wse-blue mb-2">CEFR Test System</h1>
          <p className="text-gray-600">จัดการการทดสอบภาษาอังกฤษ CEFR</p>
        </div>
        <button
          onClick={() => {
            setEditingTest(null)
            setShowForm(true)
          }}
          className="bg-wse-blue text-white px-6 py-2 rounded-lg hover:bg-wse-blue-light transition"
        >
          + เพิ่มการทดสอบ
        </button>
      </div>

      {showForm && (
        <CEFRTestForm
          test={editingTest}
          onClose={() => {
            setShowForm(false)
            setEditingTest(null)
          }}
          onSuccess={() => {
            fetchTests()
            setShowForm(false)
            setEditingTest(null)
          }}
        />
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อการทดสอบ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">คำอธิบาย</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จำนวนคำถาม</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่สร้าง</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จัดการ</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tests.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  ยังไม่มีข้อมูลการทดสอบ
                </td>
              </tr>
            ) : (
              tests.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{test.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-md truncate">
                      {test.description || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {Array.isArray(test.questions) ? test.questions.length : 0} คำถาม
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActive(test)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        test.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {test.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(test.createdAt).toLocaleDateString('th-TH')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setEditingTest(test)
                        setShowForm(true)
                      }}
                      className="text-wse-blue hover:text-wse-blue-light mr-4"
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => handleDelete(test.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CEFRTestForm({
  test,
  onClose,
  onSuccess,
}: {
  test: CEFRTest | null
  onClose: () => void
  onSuccess: () => void
}) {
  const [formData, setFormData] = useState({
    title: test?.title || '',
    description: test?.description || '',
    isActive: test?.isActive ?? true,
  })

  const [questions, setQuestions] = useState<Question[]>(
    test?.questions && Array.isArray(test.questions) ? test.questions : []
  )

  const [jsonMode, setJsonMode] = useState(false)
  const [jsonText, setJsonText] = useState('')

  useEffect(() => {
    if (test?.questions) {
      setQuestions(Array.isArray(test.questions) ? test.questions : [])
      setJsonText(JSON.stringify(test.questions, null, 2))
    }
  }, [test])

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
      },
    ])
  }

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleQuestionChange = (index: number, field: keyof Question, value: any) => {
    const newQuestions = [...questions]
    if (field === 'options') {
      newQuestions[index].options = value
    } else {
      ;(newQuestions[index] as any)[field] = value
    }
    setQuestions(newQuestions)
  }

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[qIndex].options[oIndex] = value
    setQuestions(newQuestions)
  }

  const handleSetCorrectAnswer = (qIndex: number, answer: string) => {
    const newQuestions = [...questions]
    newQuestions[qIndex].correctAnswer = answer
    setQuestions(newQuestions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let finalQuestions: Question[] = questions

    // If JSON mode, parse JSON
    if (jsonMode) {
      try {
        finalQuestions = JSON.parse(jsonText)
        if (!Array.isArray(finalQuestions)) {
          toast.error('Questions ต้องเป็น Array')
          return
        }
      } catch (error) {
        toast.error('JSON format ไม่ถูกต้อง')
        return
      }
    }

    // Validate questions
    for (let i = 0; i < finalQuestions.length; i++) {
      const q = finalQuestions[i]
      if (!q.question || !q.options || q.options.length < 2 || !q.correctAnswer) {
        toast.error(`คำถามที่ ${i + 1} ยังไม่ครบถ้วน`)
        return
      }
      if (!q.options.includes(q.correctAnswer)) {
        toast.error(`คำถามที่ ${i + 1}: คำตอบที่ถูกต้องต้องอยู่ในตัวเลือก`)
        return
      }
    }

    if (finalQuestions.length === 0) {
      toast.error('กรุณาเพิ่มคำถามอย่างน้อย 1 ข้อ')
      return
    }

    try {
      const submitData = {
        ...formData,
        questions: finalQuestions,
      }

      if (test) {
        await axios.put(`/api/cefr-tests/${test.id}`, submitData)
        toast.success('อัปเดตการทดสอบสำเร็จ')
      } else {
        await axios.post('/api/cefr-tests', submitData)
        toast.success('สร้างการทดสอบสำเร็จ')
      }
      onSuccess()
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'ไม่สามารถบันทึกได้')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-wse-blue mb-4">
          {test ? 'แก้ไขการทดสอบ' : 'เพิ่มการทดสอบใหม่'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ชื่อการทดสอบ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
              placeholder="เช่น CEFR Level Test 2024"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">คำอธิบาย</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wse-blue focus:border-transparent"
              placeholder="อธิบายเกี่ยวกับการทดสอบนี้..."
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              เปิดใช้งาน
            </label>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-wse-blue">คำถาม ({questions.length} ข้อ)</h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setJsonMode(!jsonMode)
                    if (!jsonMode && questions.length > 0) {
                      setJsonText(JSON.stringify(questions, null, 2))
                    }
                  }}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {jsonMode ? 'โหมดฟอร์ม' : 'โหมด JSON'}
                </button>
                {!jsonMode && (
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="px-4 py-2 text-sm bg-wse-blue text-white rounded-lg hover:bg-wse-blue-light"
                  >
                    + เพิ่มคำถาม
                  </button>
                )}
              </div>
            </div>

            {jsonMode ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Questions (JSON Format)
                </label>
                <textarea
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  rows={15}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-wse-blue focus:border-transparent"
                  placeholder={`[\n  {\n    "question": "What is your name?",\n    "options": ["John", "Mary", "Tom", "Jane"],\n    "correctAnswer": "John"\n  }\n]`}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Format: Array of objects with `question`, `options` (array), and `correctAnswer` (string)
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {questions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>ยังไม่มีคำถาม</p>
                    <p className="text-sm mt-2">คลิก "+ เพิ่มคำถาม" เพื่อเพิ่มคำถาม</p>
                  </div>
                ) : (
                  questions.map((q, qIndex) => (
                    <div key={qIndex} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-gray-700">คำถามที่ {qIndex + 1}</h4>
                        {questions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveQuestion(qIndex)}
                            className="text-red-600 hover:text-red-900 text-sm"
                          >
                            ลบ
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            คำถาม <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={q.question}
                            onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-wse-blue focus:border-transparent"
                            placeholder="กรอกคำถาม..."
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-2">
                            ตัวเลือก <span className="text-red-500">*</span> (อย่างน้อย 2 ตัวเลือก)
                          </label>
                          {q.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center gap-2 mb-2">
                              <input
                                type="radio"
                                name={`correct-${qIndex}`}
                                checked={q.correctAnswer === option}
                                onChange={() => handleSetCorrectAnswer(qIndex, option)}
                                className="text-wse-blue"
                              />
                              <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                required
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-wse-blue focus:border-transparent"
                                placeholder={`ตัวเลือก ${oIndex + 1}`}
                              />
                              {q.options.length > 2 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newOptions = q.options.filter((_, i) => i !== oIndex)
                                    handleQuestionChange(qIndex, 'options', newOptions)
                                    if (q.correctAnswer === option) {
                                      handleSetCorrectAnswer(qIndex, '')
                                    }
                                  }}
                                  className="text-red-600 hover:text-red-900 text-sm px-2"
                                >
                                  ลบ
                                </button>
                              )}
                            </div>
                          ))}
                          {q.options.length < 6 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newOptions = [...q.options, '']
                                handleQuestionChange(qIndex, 'options', newOptions)
                              }}
                              className="mt-2 text-sm text-wse-blue hover:text-wse-blue-light"
                            >
                              + เพิ่มตัวเลือก
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-wse-blue text-white rounded-lg hover:bg-wse-blue-light"
            >
              บันทึก
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
