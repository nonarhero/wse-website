import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const article = await prisma.article.findFirst({
      where: { 
        slug: params.slug,
        status: 'PUBLISHED',
      },
      include: {
        author: { select: { name: true, email: true } },
        category: true,
        tags: true,
      },
    })
    
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }
    
    // Increment view count
    await prisma.article.update({
      where: { id: article.id },
      data: { viewCount: { increment: 1 } },
    })
    
    return NextResponse.json(article)
  } catch (error: any) {
    console.error('Article by slug API Error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch article',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 })
  }
}
