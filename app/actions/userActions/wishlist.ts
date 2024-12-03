"use server";

import { prisma } from "@/lib/prisma";

export const addToWishlist = async (userId: string, productId: string) => {
    try {

        if (!userId || !productId) {
            throw new Error("User ID and Product ID are required.");
        }

        let wishlist = await prisma.wishlist.findUnique({
            where: { userId },
        });


        if (!wishlist) {
            wishlist = await prisma.wishlist.create({
                data: { userId },
            });
        }

        const existingWishlistItem = await prisma.wishlistItem.findUnique({
            where: {
                wishlistId_productId: {
                    wishlistId: wishlist.id,
                    productId,
                },
            },
        });

        if (existingWishlistItem) {
            return {
                success: false,
                message: "Product is already in the wishlist.",
            };
        }

        await prisma.wishlistItem.create({
            data: {
                wishlistId: wishlist.id,
                productId,
            },
        });

        return {
            success: true,
            message: "Product added to wishlist successfully.",
        };
    } catch (error) {
        console.error("Error adding product to wishlist:", error);
        throw new Error("Failed to add product to wishlist.");
    }
};


export const removeFromWishlist = async (userId: string, productId: string) => {
    try {

        if (!userId || !productId) {
            throw new Error("User ID and Product ID are required.");
        }


        const wishlist = await prisma.wishlist.findUnique({
            where: { userId },
        });

        if (!wishlist) {
            return {
                success: false,
                message: "Wishlist not found.",
            };
        }

        const wishlistItem = await prisma.wishlistItem.findUnique({
            where: {
                wishlistId_productId: {
                    wishlistId: wishlist.id,
                    productId,
                },
            },
        });

        if (!wishlistItem) {
            return {
                success: false,
                message: "Product not found in wishlist.",
            };
        }

        await prisma.wishlistItem.delete({
            where: { id: wishlistItem.id },
        });

        return {
            success: true,
            message: "Product removed from wishlist successfully.",
        };
    } catch (error) {
        console.error("Error removing product from wishlist:", error);
        throw new Error("Failed to remove product from wishlist.");
    }
};

export const getWishlist = async (userId: string) => {
    try {
       
        if (!userId) {
            throw new Error("User ID is required.");
        }


        const wishlist = await prisma.wishlist.findUnique({
            where: { userId },
            include: {
                wishlistItems: {
                    include: {
                        product: {
                            select: {
                                description: true,
                                id: true,
                                name: true,
                                slug: true,
                                images: true,
                                basePrice: true,
                                discountPrice: true,
                             
                            }
                        },
                    },
                },
            },
        });

        if (!wishlist || wishlist.wishlistItems.length === 0) {
            return {
                success: true,
                message: "Wishlist is empty.",
                data: [],
            };
        }


        const wishlistItems = wishlist.wishlistItems.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            slug: item.product.slug,
            images: item.product.images,
            basePrice: Number(item.product.basePrice),
            discountPrice: Number(item.product.discountPrice),
            addedAt: item.addedAt,
          }));

        return {
            success: true,
            message: "Wishlist retrieved successfully.",
            data: wishlistItems,
        };
    } catch (error) {
        console.error("Error retrieving wishlist:", error);
        throw new Error("Failed to retrieve wishlist.");
    }
};