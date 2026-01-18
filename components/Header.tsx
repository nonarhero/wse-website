'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isLearnEnglishOpen, setIsLearnEnglishOpen] = useState(false)
  const [isTestOpen, setIsTestOpen] = useState(false)
  const [isTipsOpen, setIsTipsOpen] = useState(false)
  const [isCorporateOpen, setIsCorporateOpen] = useState(false)
  const [isFranchiseOpen, setIsFranchiseOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsAboutOpen(false)
    setIsLearnEnglishOpen(false)
    setIsTestOpen(false)
    setIsTipsOpen(false)
    setIsCorporateOpen(false)
    setIsFranchiseOpen(false)
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-wse-blue">
            WSE
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="text-wse-blue hover:text-wse-blue-light transition">
              หน้าแรก
            </Link>
            <Link href="/blog" className="text-wse-blue hover:text-wse-blue-light transition">
              บทความ
            </Link>
            
            <div 
              className="relative"
              onMouseEnter={() => setIsLearnEnglishOpen(true)}
              onMouseLeave={() => setIsLearnEnglishOpen(false)}
            >
              <button className="text-wse-blue hover:text-wse-blue-light transition flex items-center">
                เรียนภาษาอังกฤษ
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {isLearnEnglishOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2"
                  >
                    <Link href="/learn-english/full-access" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">Full-Access Courses</Link>
                    <Link href="/learn-english/ielts-preparation" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">IELTS Preparation</Link>
                    <Link href="/learn-english/professionals" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">English for Professionals</Link>
                    <Link href="/learn-english/youth" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">Youth / School Programs</Link>
                    <Link href="/learn-english/online" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">Online Courses</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div 
              className="relative"
              onMouseEnter={() => setIsTestOpen(true)}
              onMouseLeave={() => setIsTestOpen(false)}
            >
              <button className="text-wse-blue hover:text-wse-blue-light transition flex items-center">
                ทดสอบภาษาอังกฤษ
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {isTestOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2"
                  >
                    <Link href="/test-your-english/cefr" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">CEFR Level Test</Link>
                    <Link href="/test-your-english/ielts-practice" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">IELTS Practice</Link>
                    <Link href="/test-your-english/toeic-toefl" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">TOEIC/TOEFL Info</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div 
              className="relative"
              onMouseEnter={() => setIsTipsOpen(true)}
              onMouseLeave={() => setIsTipsOpen(false)}
            >
              <button className="text-wse-blue hover:text-wse-blue-light transition flex items-center">
                Tips & Blog
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {isTipsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2"
                  >
                    <Link href="/tips-blog/vocabulary" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">Vocabulary</Link>
                    <Link href="/tips-blog/speaking" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">Speaking Tips</Link>
                    <Link href="/tips-blog/grammar" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">Grammar Hacks</Link>
                    <Link href="/tips-blog/ebooks" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">E-Books</Link>
                    <Link href="/tips-blog/exam-guides" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">Exam Guides</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/promotions" className="text-wse-blue hover:text-wse-blue-light transition">
              โปรโมชัน
            </Link>

            <div 
              className="relative"
              onMouseEnter={() => setIsCorporateOpen(true)}
              onMouseLeave={() => setIsCorporateOpen(false)}
            >
              <button className="text-wse-blue hover:text-wse-blue-light transition flex items-center">
                Corporate
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {isCorporateOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2"
                  >
                    <Link href="/corporate/training" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">Corporate Training</Link>
                    <Link href="/corporate/online" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">Online Corporate Courses</Link>
                    <Link href="/corporate/custom" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">Custom Programs</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div 
              className="relative"
              onMouseEnter={() => setIsFranchiseOpen(true)}
              onMouseLeave={() => setIsFranchiseOpen(false)}
            >
              <button className="text-wse-blue hover:text-wse-blue-light transition flex items-center">
                Franchise
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {isFranchiseOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2"
                  >
                    <Link href="/franchise/overview" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">Franchise Overview</Link>
                    <Link href="/franchise/success" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">Franchise Partner Success</Link>
                    <Link href="/franchise/benefits" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">Benefits</Link>
                    <Link href="/franchise/application" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">Application Process</Link>
                    <Link href="/franchise/contact" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">Contact Form</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div 
              className="relative"
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <button className="text-wse-blue hover:text-wse-blue-light transition flex items-center">
                เกี่ยวกับเรา
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {isAboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2"
                  >
                    <Link href="/about/who-we-are" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">เราเป็นใคร</Link>
                    <Link href="/about/our-method" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">วิธีการสอนของเรา</Link>
                    <Link href="/about/locations" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">สาขาของเรา</Link>
                    <Link href="/about/why-choose-us" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">ทำไมต้องเลือกเรา</Link>
                    <Link href="/about/careers" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">สมัครงาน</Link>
                    <Link href="/about/privacy-policy" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">Privacy Policy</Link>
                    <Link href="/about/contact" className="block px-4 py-2 text-wse-blue hover:bg-gray-100">ติดต่อเรา</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              href="#register" 
              className="bg-wse-blue text-white px-6 py-2 rounded-lg hover:bg-wse-blue-light transition"
            >
              ทดลองเรียนฟรี
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-wse-blue hover:text-wse-blue-light transition p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pb-4 border-t border-gray-200"
            >
              <div className="flex flex-col space-y-4 pt-4">
                <Link href="/" className="text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>
                  หน้าแรก
                </Link>
                <Link href="/blog" className="text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>
                  บทความ
                </Link>

                {/* Learn English Mobile Menu */}
                <div>
                  <button
                    onClick={() => setIsLearnEnglishOpen(!isLearnEnglishOpen)}
                    className="w-full flex items-center justify-between text-wse-blue hover:text-wse-blue-light transition"
                  >
                    เรียนภาษาอังกฤษ
                    <svg className={`w-4 h-4 transform transition-transform ${isLearnEnglishOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isLearnEnglishOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      <Link href="/learn-english/full-access" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>Full-Access Courses</Link>
                      <Link href="/learn-english/ielts-preparation" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>IELTS Preparation</Link>
                      <Link href="/learn-english/professionals" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>English for Professionals</Link>
                      <Link href="/learn-english/youth" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>Youth / School Programs</Link>
                      <Link href="/learn-english/online" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>Online Courses</Link>
                    </div>
                  )}
                </div>

                {/* Test Mobile Menu */}
                <div>
                  <button
                    onClick={() => setIsTestOpen(!isTestOpen)}
                    className="w-full flex items-center justify-between text-wse-blue hover:text-wse-blue-light transition"
                  >
                    ทดสอบภาษาอังกฤษ
                    <svg className={`w-4 h-4 transform transition-transform ${isTestOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isTestOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      <Link href="/test-your-english/cefr" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>CEFR Level Test</Link>
                      <Link href="/test-your-english/ielts-practice" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>IELTS Practice</Link>
                      <Link href="/test-your-english/toeic-toefl" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>TOEIC/TOEFL Info</Link>
                    </div>
                  )}
                </div>

                {/* Tips & Blog Mobile Menu */}
                <div>
                  <button
                    onClick={() => setIsTipsOpen(!isTipsOpen)}
                    className="w-full flex items-center justify-between text-wse-blue hover:text-wse-blue-light transition"
                  >
                    Tips & Blog
                    <svg className={`w-4 h-4 transform transition-transform ${isTipsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isTipsOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      <Link href="/tips-blog/vocabulary" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>Vocabulary</Link>
                      <Link href="/tips-blog/speaking" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>Speaking Tips</Link>
                      <Link href="/tips-blog/grammar" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>Grammar Hacks</Link>
                      <Link href="/tips-blog/ebooks" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>E-Books</Link>
                      <Link href="/tips-blog/exam-guides" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>Exam Guides</Link>
                    </div>
                  )}
                </div>

                <Link href="/promotions" className="text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>
                  โปรโมชัน
                </Link>

                {/* Corporate Mobile Menu */}
                <div>
                  <button
                    onClick={() => setIsCorporateOpen(!isCorporateOpen)}
                    className="w-full flex items-center justify-between text-wse-blue hover:text-wse-blue-light transition"
                  >
                    Corporate
                    <svg className={`w-4 h-4 transform transition-transform ${isCorporateOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isCorporateOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      <Link href="/corporate/training" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>Corporate Training</Link>
                      <Link href="/corporate/online" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>Online Corporate Courses</Link>
                      <Link href="/corporate/custom" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>Custom Programs</Link>
                    </div>
                  )}
                </div>

                {/* Franchise Mobile Menu */}
                <div>
                  <button
                    onClick={() => setIsFranchiseOpen(!isFranchiseOpen)}
                    className="w-full flex items-center justify-between text-wse-blue hover:text-wse-blue-light transition"
                  >
                    Franchise
                    <svg className={`w-4 h-4 transform transition-transform ${isFranchiseOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isFranchiseOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      <Link href="/franchise/overview" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>Franchise Overview</Link>
                      <Link href="/franchise/success" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>Franchise Partner Success</Link>
                      <Link href="/franchise/benefits" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>Benefits</Link>
                      <Link href="/franchise/application" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>Application Process</Link>
                      <Link href="/franchise/contact" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>Contact Form</Link>
                    </div>
                  )}
                </div>

                {/* About Us Mobile Menu */}
                <div>
                  <button
                    onClick={() => setIsAboutOpen(!isAboutOpen)}
                    className="w-full flex items-center justify-between text-wse-blue hover:text-wse-blue-light transition"
                  >
                    เกี่ยวกับเรา
                    <svg className={`w-4 h-4 transform transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isAboutOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      <Link href="/about/who-we-are" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>เราเป็นใคร</Link>
                      <Link href="/about/our-method" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>วิธีการสอนของเรา</Link>
                      <Link href="/about/locations" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>สาขาของเรา</Link>
                      <Link href="/about/why-choose-us" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>ทำไมต้องเลือกเรา</Link>
                      <Link href="/about/careers" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>สมัครงาน</Link>
                      <Link href="/about/privacy-policy" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>Privacy Policy</Link>
                      <Link href="/about/contact" className="block text-wse-blue hover:text-wse-blue-light transition" onClick={closeMobileMenu}>ติดต่อเรา</Link>
                    </div>
                  )}
                </div>

                <Link 
                  href="#register" 
                  className="bg-wse-blue text-white px-6 py-2 rounded-lg hover:bg-wse-blue-light transition text-center mt-4"
                  onClick={closeMobileMenu}
                >
                  ทดลองเรียนฟรี
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
