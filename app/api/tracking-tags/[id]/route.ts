import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tag = await prisma.trackingTag.findUnique({
      where: { id: params.id },
    })
    if (!tag) {
      return NextResponse.json({ error: 'Tracking tag not found' }, { status: 404 })
    }
    return NextResponse.json(tag)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tracking tag' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const tag = await prisma.trackingTag.update({
      where: { id: params.id },
      data: body,
    })
    return NextResponse.json(tag)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update tracking tag' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.trackingTag.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ message: 'Tracking tag deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete tracking tag' }, { status: 500 })
  }
}
