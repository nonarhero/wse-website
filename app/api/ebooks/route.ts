import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const ebooks = await prisma.ebook.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(ebooks)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch ebooks' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const ebook = await prisma.ebook.create({
      data: body,
    })
    return NextResponse.json(ebook)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create ebook' }, { status: 500 })
  }
}
