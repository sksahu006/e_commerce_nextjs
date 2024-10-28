import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const search = searchParams.get('search') || ''

  const skip = (page - 1) * limit

  try {
    const [variants, total] = await Promise.all([
      prisma.productVariant.findMany({
        where: {
          OR: [
            { product: { name: { contains: search, mode: 'insensitive' } } },
            { color: { name: { contains: search, mode: 'insensitive' } } },
            { size: { name: { contains: search, mode: 'insensitive' } } },
          ],
        },
        include: {
            product: { select: { name: true, id: true } }, 
          color: { select: { name: true, id: true } }, 
          size: { select: { name: true, id: true } },
        },
        skip,
        take: limit,
      }),
      prisma.productVariant.count({
        where: {
          OR: [
            { product: { name: { contains: search, mode: 'insensitive' } } },
            { color: { name: { contains: search, mode: 'insensitive' } } },
            { size: { name: { contains: search, mode: 'insensitive' } } },
          ],
        },
      }),
    ])

    return NextResponse.json({ variants, total })
  } catch (error) {
    console.error('Failed to fetch product variants:', error)
    return NextResponse.json({ error: 'Failed to fetch product variants' }, { status: 500 })
  }
}