'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { BrandFormData, brandSchema } from '@/lib/types/validationTypes'


export async function createBrand(data: BrandFormData) {
  const validatedFields = brandSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  try {
    const brand = await prisma.brand.create({
      data: validatedFields.data,
    })
    revalidatePath('/brands')
    return { success: true, brand }
  } catch (error) {
    return { error: 'Failed to create brand' }
  }
}

export async function updateBrand(id: string, data: BrandFormData) {
  const validatedFields = brandSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  try {
    const brand = await prisma.brand.update({
      where: { id },
      data: validatedFields.data,
    })
    revalidatePath('/brands')
    return { success: true, brand }
  } catch (error) {
    return { error: 'Failed to update brand' }
  }
}

export async function deleteBrand(id: string) {
  try {
    await prisma.brand.delete({
      where: { id },
    })
    revalidatePath('/brands')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to delete brand' }
  }
}

export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany()
    return { success: true, brands }
  } catch (error) {
    return { error: 'Failed to fetch brands' }
  }
}