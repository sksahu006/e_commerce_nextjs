'use server';
import { prisma } from '@/lib/prisma';

interface ProductFilter {
  colors?: string[];
  categories?: string[];
  sizes?:string[];
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string; 
}

export async function fetchAllProducts(filters: ProductFilter = {}) {
  const { colors, categories,sizes, featured, minPrice, maxPrice, searchQuery } = filters;
  console.log(minPrice,maxPrice)

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
                        in: colors,
                      },
                    },
                  },
                },
              }
            : {},
            //filter by size
            sizes?.length
            ? {
                variants: {
                  some: {
                    size: {
                      name: {
                        in: sizes,
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
                        in: categories,
                      },
                    },
                  },
                },
              }
            : {},

          // Filter by featured products
          featured !== undefined ? { featured } : {},

          // Filter by price range
          minPrice || maxPrice
            ? {
                OR: [
                  Number(minPrice) ? { basePrice: { gte: minPrice } } : {},
                  Number(maxPrice)? { basePrice: { lte: maxPrice } } : {},
                ],
              }
            : {},

          // Filter by search query
          searchQuery
            ? {
                OR: [
                  { name: { contains: searchQuery, mode: 'insensitive' } }, // Search in product name
                  { description: { contains: searchQuery, mode: 'insensitive' } }, // Search in product description
                  {
                    categories: {
                      some: {
                        category: {
                          name: {
                            contains: searchQuery, // Search in category name
                            mode: 'insensitive',
                          },
                        },
                      },
                    },
                  },
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

    return products;
  } catch (error) {
    console.error('Error fetching filtered products:', error);
    throw new Error('Failed to fetch filtered products');
  }
}
