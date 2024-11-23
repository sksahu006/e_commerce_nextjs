'use server'

import { prisma } from '@/lib/prisma'
import { categorySchema, catrgoryFormData } from '@/lib/types/validationTypes'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'



export async function createCategory(data: catrgoryFormData) {
  const validatedData = categorySchema.parse(data)

  const category = await prisma.category.create({
    data: validatedData,
  })

  revalidatePath('/admin/categories')
  return category
}

export async function updateCategory(id: string, data: z.infer<typeof categorySchema>) {
  const validatedData = categorySchema.parse(data)

  const category = await prisma.category.update({
    where: { id },
    data: validatedData,
  })

  revalidatePath('/admin/categories')
  return category
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({ where: { id } })
  revalidatePath('/admin/categories')
}
export async function getAllCategory() {

  try {
    const categories = await prisma.category.findMany()
    return { success: true, categories };
  } catch (error) {
    return { error: "Failed to fetch categories" };
  }
}
