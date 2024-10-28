import { NextResponse,NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const search = searchParams.get('search') || ''
  const pageSize = 10

  try {
    const [sizes, total] = await Promise.all([
      prisma.size.findMany({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.size.count({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      }),
    ])

    return NextResponse.json({ sizes, total })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sizes' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name } = body
    const size = await prisma.size.create({
      data: { name },
    })
    return NextResponse.json(size, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create size' }, { status: 500 })
  }
}