import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const brands = await prisma.brand.findMany()
    return NextResponse.json(brands)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch brands' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, logo, description } = body
    const brand = await prisma.brand.create({
      data: { name, logo, description },
    })
    return NextResponse.json(brand, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create brand' }, { status: 500 })
  }
}