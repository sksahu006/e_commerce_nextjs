import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const search = searchParams.get('search') || ''
  const pageSize = 10

  try {
    const [colors, total] = await Promise.all([
      prisma.color.findMany({
        where: {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              hexCode: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.color.count({
        where: {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              hexCode: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },
      }),
    ])

    return NextResponse.json({ colors, total })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch colors' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, hexCode } = body
    const color = await prisma.color.create({
      data: { name, hexCode },
    })
    return NextResponse.json(color, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create color' }, { status: 500 })
  }
}