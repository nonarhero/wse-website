import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { sendSMS } from '@/lib/thaibulksms'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const where: any = {}
    if (status) {
      where.status = status
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: {
          branch: true,
          createdBy: { select: { name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.lead.count({ where }),
    ])

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      branchId,
      occupation,
      url,
      utmMedium,
      utmTerm,
      utmContent,
      utmCampaign,
      pdpa,
    } = body

    // Create lead
    const lead = await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
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
            title: 'Lead ใหม่',
            message: `${firstName} ${lastName} ลงทะเบียนทดลองเรียนฟรี`,
            userId: admin.id,
            linkUrl: `/admin/leads/${lead.id}`,
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
          `Lead ใหม่: ${firstName} ${lastName} - ${phone}`
        )
      }
    }

    return NextResponse.json(lead)
  } catch (error: any) {
    console.error('Create Lead API Error:', error)
    return NextResponse.json({ 
      error: 'Failed to create lead',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 })
  }
}
