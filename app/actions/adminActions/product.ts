"use server";

import { prisma } from "@/lib/prisma";
import { ProductFormData, ProductSchema } from "@/lib/types/validationTypes";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function addProduct(data: ProductFormData) {
  try {
    const parsedData = ProductSchema.parse(data);

    const { categoryIds, ...productData } = parsedData;

    const product = await prisma.product.create({
      data: {
        ...productData,
        categories: {
          create: categoryIds.map((categoryId) => ({
            category: { connect: { id: categoryId } },
          })),
        },
      },
    });

    revalidatePath("/admin/product");
    return { success: true, product };
  } catch (error) {
    console.error("Error in addProduct:", error);
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function updateProduct(id: string, data: ProductFormData) {
  try {
    const parsedData = ProductSchema.parse(data);

    const { categoryIds, ...productData } = parsedData;

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...productData,
        categories: {
          deleteMany: {},
          create: categoryIds.map((categoryId) => ({
            category: { connect: { id: categoryId } },
          })),
        },
      },
    });

    revalidatePath("/admin/product");
    return { success: true, product };
  } catch (error) {
    console.error("Error in updateProduct:", error);
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getProduct(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      categories: { include: { category: true } },
      brand: true,
      variants: { include: { size: true, color: true } },
    },
  })
}

export async function fetchProducts(page = 1, limit = 10, search = '') {
  const skip = (page - 1) * limit

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      },
      include: {
        brand: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.count({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      },
    }),
  ])

  // Convert Decimal fields to number
  const formattedProducts = products.map(product => ({
    ...product,
    basePrice: Number(product.basePrice),  // Convert basePrice from Decimal to number
    discountPrice: product.discountPrice ? Number(product.discountPrice) : null,  // Convert if necessary
  }))

  return {
    products: formattedProducts,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
}
