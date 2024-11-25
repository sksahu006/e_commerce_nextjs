"use server";

import { prisma } from "@/lib/prisma";
import { AddToCartParams, AddToCartResponse } from "@/lib/types/schemaTypes";

export async function addToCart({
  userId,
  variantId,
  quantity,
}: AddToCartParams): Promise<AddToCartResponse> {
  try {
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return { success: false, message: "User does not exist." };
    }
    const variant = await prisma.productVariant.findUnique({
      where: { id: variantId },
    });
    console.log("variant", variant);

    if (!variant) {
      return { success: false, message: "Product variant not found." };
    }

    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_variantId: {
          cartId: cart.id,
          variantId,
        },
      },
    });

    if (existingCartItem) {
      await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          variantId,
          quantity,
        },
      });
    }

    const newCount = await getCartCount(userId);
    return { success: true, message: "Item added to cart.", count: newCount };
  } catch (error) {
    console.error("Add to cart error:", error);
    return {
      success: false,
      message: "An error occurred while adding to cart.",
    };
  }
}

export async function getCartCount(userId: string) {
  if (!userId) throw new Error("User ID is required");

  const count = await prisma.cartItem.count({
    where: {
      cart: {
        userId: userId,
      },
    },
  });

  return count;
}
