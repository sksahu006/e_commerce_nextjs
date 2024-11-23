'use server';
import { prisma } from '@/lib/prisma';

interface ProductFilter {
    colors?: string[];
    categories?: string[];
    featured?: boolean;
    minPrice?: number;
    maxPrice?: number;
}

export async function fetchAllProducts(filters: ProductFilter = {}) {


    const { colors, categories, featured, minPrice, maxPrice } = filters;

    try {
        const products = await prisma.product.findMany({
            where: {
                AND: [
                    // Filter by colors
                    colors?.length
                        ? {
                            variants: {
                                some: {
                                    color: {
                                        name: {
                                            in: colors, // Filters by colors in the array
                                        },
                                    },
                                },
                            },
                        }
                        : {},

                    // Filter by categories
                    categories?.length
                        ? {
                            categories: {
                                some: {
                                    category: {
                                        name: {
                                            in: categories, // Filters by categories in the array
                                        },
                                    },
                                },
                            },
                        }
                        : {},
                    // Filter by price range
                    minPrice || maxPrice
                        ? {
                            OR: [
                                minPrice ? { basePrice: { gte: minPrice } } : {},
                                maxPrice ? { basePrice: { lte: maxPrice } } : {},
                            ],
                        }
                        : {},
                ],
            },
            include: {
                brand: true,
                categories: {
                    include: {
                        category: true,
                    },
                },
                variants: {
                    include: {
                        size: true,
                        color: true,
                    },
                },
                reviews: true,
            },
        });
        console.log(products)
        return products;
    } catch (error) {
        console.error('Error fetching filtered products:', error);
        throw new Error('Failed to fetch filtered products');
    }
}
