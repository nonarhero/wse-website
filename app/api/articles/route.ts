import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const categoryId = searchParams.get('categoryId')

    const where: any = {}
    if (status) {
      where.status = status
    }
    if (categoryId) {
      where.categoryId = categoryId
    }

    const articles = await prisma.article.findMany({
      where,
      include: {
        author: { select: { name: true, email: true } },
        category: true,
        tags: true,
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(articles)
  } catch (error: any) {
    console.error('Articles API Error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch articles',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { tags, tagIds, ...articleData } = body

    // Handle both tags and tagIds formats
    const tagConnections = tags || tagIds || []

    const article = await prisma.article.create({
      data: {
        ...articleData,
        authorId: session.user.id,
        tags: tagConnections.length > 0 ? {
          connect: tagConnections.map((tagId: string) => ({ id: tagId })),
        } : undefined,
      },
      include: {
        author: { select: { name: true } },
        category: true,
        tags: true,
      },
    })
    return NextResponse.json(article)
  } catch (error: any) {
    console.error('Articles API POST Error:', error)
    return NextResponse.json({ 
      error: 'Failed to create article',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 })
  }
}
