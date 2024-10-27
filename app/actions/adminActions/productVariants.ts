'use server'

import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const productVariantSchema = z.object({
  productId: z.string(),
  sizeId: z.string(),
  colorId: z.string(),
  stockQuantity: z.number().int().positive(),
  additionalPrice: z.number().nonnegative(),
})

export async function createProductVariant(data: z.infer<typeof productVariantSchema>) {
  try {
    const validatedData = productVariantSchema.parse(data)
    const variant = await prisma.productVariant.create({
      data: validatedData,
    })
    return { success: true, variant }
  } catch (error) {
    console.error('Failed to create product variant:', error)
    return { success: false, error: 'Failed to create product variant' }
  }
}

export async function updateProductVariant(id: string, data: z.infer<typeof productVariantSchema>) {
  try {
    const validatedData = productVariantSchema.parse(data)
    const variant = await prisma.productVariant.update({
      where: { id },
      data: validatedData,
    })
    return { success: true, variant }
  } catch (error) {
    console.error('Failed to update product variant:', error)
    return { success: false, error: 'Failed to update product variant' }
  }
}

export async function deleteProductVariant(id: string) {
  try {
    await prisma.productVariant.delete({
      where: { id },
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to delete product variant:', error)
    return { success: false, error: 'Failed to delete product variant' }
  }
}

export async function getProductVariant(id: string) {
  try {
    const variant = await prisma.productVariant.findUnique({
      where: { id },
      include: {
        product: { select: { name: true } },
        color: { select: { name: true } },
        size: { select: { name: true } },
      },
    })
    return { success: true, variant }
  } catch (error) {
    console.error('Failed to fetch product variant:', error)
    return { success: false, error: 'Failed to fetch product variant' }
  }
}