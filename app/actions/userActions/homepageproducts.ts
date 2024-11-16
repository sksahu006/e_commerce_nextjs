"use server"
import { fetchProducts } from '@/app/actions/adminActions/product';
import { prisma } from '@/lib/prisma';

export async function fetchHomePageData() {
  try {
    const [featuredProducts, newArrivals] = await Promise.all([
      prisma.product.findMany({
        where: { featured: true },
        include: {
          brand: { select: { id: true, name: true } },
          categories: { include: { category: true } },
          variants: {
            include: {
              size: { select: { id: true, name: true } },
              color: { select: { id: true, name: true, hexCode: true } },
            },
          },
          reviews: false, 
          wishlistItems: false, 
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          brand: { select: { id: true, name: true } },
          categories: { include: { category: true } },
          variants: {
            include: {
              size: { select: { id: true, name: true } },
              color: { select: { id: true, name: true, hexCode: true } },
            },
          },
          reviews: false,  
          wishlistItems: false, 
        },
        take: 5,
      }),
    ]);


    return { featuredProducts, newArrivals };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    throw new Error('Failed to fetch home page data');
  }
}
