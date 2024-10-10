import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const colors = await prisma.color.findMany()
    return NextResponse.json(colors)
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