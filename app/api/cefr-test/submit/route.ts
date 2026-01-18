import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendSMS } from '@/lib/thaibulksms'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      testId,
      answers,
      leadId,
      otpCode,
      phone,
      // Lead data (if creating new lead from test result)
      leadData,
    } = body

    // Verify OTP if provided
    if (otpCode) {
      // In production, verify OTP from database/Redis
      // For now, we'll skip verification
    }

    // Calculate score and level
    const test = await prisma.cEFRTest.findUnique({
      where: { id: testId },
    })

    if (!test) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 })
    }

    // Simple scoring (you should implement proper scoring logic)
    const questions = test.questions as any[]
    let score = 0
    const totalQuestions = questions.length

    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++
      }
    })

    // Determine CEFR level based on score
    const percentage = (score / totalQuestions) * 100
    let level = 'A1'
    if (percentage >= 90) level = 'C2'
    else if (percentage >= 80) level = 'C1'
    else if (percentage >= 70) level = 'B2'
    else if (percentage >= 60) level = 'B1'
    else if (percentage >= 40) level = 'A2'

    // Create lead if leadData is provided and no leadId
    let finalLeadId = leadId || null

    if (leadData && !leadId) {
      const {
        firstName,
        lastName,
        email,
        phone: leadPhone,
        branchId,
        occupation,
        url,
        utmMedium,
        utmTerm,
        utmContent,
        utmCampaign,
        pdpa,
      } = leadData

      // Create lead from test result
      const newLead = await prisma.lead.create({
        data: {
          firstName,
          lastName,
          email,
          phone: leadPhone || phone || '',
          branchId,
          occupation,
          url,
          utmMedium,
          utmTerm,
          utmContent,
          utmCampaign,
          pdpa,
          status: 'NEW',
        },
        include: {
          branch: true,
        },
      })

      finalLeadId = newLead.id

      // Send notification to admins
      const admins = await prisma.user.findMany({
        where: {
          role: { in: ['SUPER_ADMIN', 'ADMIN'] },
        },
      })

      await Promise.all(
        admins.map((admin) =>
          prisma.notification.create({
            data: {
              type: 'LEAD_NEW',
              title: 'Lead ใหม่จาก CEFR Test',
              message: `${firstName} ${lastName} ทำแบบทดสอบ CEFR ได้ระดับ ${level}`,
              userId: admin.id,
              linkUrl: `/admin/leads/${newLead.id}`,
            },
          })
        )
      )

      // Send SMS notification if configured
      const smsEnabled = await prisma.setting.findUnique({
        where: { key: 'sms_notification_enabled' },
      })

      if (smsEnabled?.value === 'true') {
        const adminPhone = await prisma.setting.findUnique({
          where: { key: 'admin_phone' },
        })

        if (adminPhone?.value) {
          await sendSMS(
            adminPhone.value,
            `Lead ใหม่จาก CEFR Test: ${firstName} ${lastName} - ${leadPhone || phone} (Level: ${level})`
          )
        }
      }
    }

    // Save result
    const result = await prisma.cEFRTestResult.create({
      data: {
        testId,
        leadId: finalLeadId,
        score,
        level,
        answers,
        otpCode: otpCode || null,
        otpVerified: !!otpCode,
      },
    })

    return NextResponse.json({
      success: true,
      result: {
        id: result.id,
        score,
        level,
        totalQuestions,
        percentage,
        leadId: finalLeadId,
      },
    })
  } catch (error: any) {
    console.error('Submit CEFR Test Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to submit test',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    )
  }
}
