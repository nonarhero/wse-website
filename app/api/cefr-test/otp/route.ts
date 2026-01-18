import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendOTP } from '@/lib/thaibulksms'

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json()

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 })
    }

    // Check if OTP is enabled
    const otpEnabled = await prisma.setting.findUnique({
      where: { key: 'otp_enabled' },
    })

    if (otpEnabled?.value !== 'true') {
      return NextResponse.json({ error: 'OTP is disabled' }, { status: 400 })
    }

    // Generate and send OTP
    const result = await sendOTP(phone, 'รหัส OTP สำหรับทดสอบภาษาอังกฤษของคุณคือ:')

    if (result.status === 'error') {
      return NextResponse.json({ error: result.message }, { status: 500 })
    }

    // Store OTP in database (you might want to use Redis for production)
    const otpCode = result.data?.otpCode

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      otpCode, // In production, don't return this
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 })
  }
}
