"use server";

import { prisma } from "@/lib/prisma";

// Define the return type for better type safety
export async function productById(productId: string) {
    if (!productId) {
        throw new Error("Product ID is required");
    }

    try {
        const singleProduct = await prisma.product.findUnique({
            where: {
                id: productId,
            },
            include: {
                brand: true,
                variants: {
                    select: {
                        id: true,
                        size: {
                            select: {
                                name: true,
                            },
                        },
                        color: { select: { name: true, hexCode: true } },
                        stockQuantity:true
                    },
                },
                reviews: {
                    select: {
                        id: true,
                        rating: true,
                        comment: true,
                        user: {
                            select: {
                                username:true
                            },
                        },
                    },
                },
            },
        });

        if (!singleProduct) {
            throw new Error(`Product with ID ${productId} not found`);
        }
        console.log(singleProduct)

        return singleProduct;
    } catch (error: any) {
        console.error("Error fetching product by ID:", error.message);
        throw new Error("Failed to fetch product data. Please try again later.");
    }
}
