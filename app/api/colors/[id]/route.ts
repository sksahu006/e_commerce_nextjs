import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, hexCode } = body
    const color = await prisma.color.update({
      where: { id: params.id },
      data: { name, hexCode },
    })
    return NextResponse.json(color)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update color' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.color.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete color' }, { status: 500 })
  }
}