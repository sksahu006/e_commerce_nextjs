import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const search = searchParams.get('search') || ''

  const skip = (page - 1) * limit

  const [categories, total] = await Promise.all([
    prisma.category.findMany({
      where: {
        name: { contains: search, mode: 'insensitive' },
      },
      skip,
      take: limit,
    }),
    prisma.category.count({
      where: {
        name: { contains: search, mode: 'insensitive' },
      },
    }),
  ])

  return NextResponse.json({
    categories,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  })
}