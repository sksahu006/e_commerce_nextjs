import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const sizes = await prisma.size.findMany()
    return NextResponse.json(sizes)
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