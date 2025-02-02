"use server";

import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";

type OrderItemInput = {
  variantId: string;
  quantity: number;
  pricePerUnit: number;
};

export const createOrder = async (
  userId: string,
  shippingAddressId: string,
  orderItems: OrderItemInput[]
) => {
  try {
    if (!userId || !shippingAddressId || !orderItems.length) {
      throw new Error("Invalid input. Please provide all required fields.");
    }

    // Step 1: Fetch and validate the user's cart items
    const variants = await prisma.productVariant.findMany({
      where: {
        id: { in: orderItems.map((item) => item.variantId) },
      },
      select: {
        id: true,
        stockQuantity: true,
        additionalPrice: true,
        product: {
          select: {
            basePrice: true,
            discountPrice: true,
          },
        },
      },
    });

    if (variants.length !== orderItems.length) {
      throw new Error("Some product variants are invalid or out of stock.");
    }

    // Step 2: Check stock availability and calculate total amount
    let totalAmount = new Decimal(0);
    const orderItemsData = orderItems.map((item) => {
      const variant = variants.find((v) => v.id === item.variantId);
      if (!variant) {
        throw new Error(`Variant with ID ${item.variantId} not found.`);
      }
      if (variant.stockQuantity < item.quantity) {
        throw new Error(`Insufficient stock for variant ID: ${item.variantId}`);
      }
      const price = variant.product.discountPrice || variant.product.basePrice;
      const itemTotal = price.add(variant.additionalPrice).mul(item.quantity);
      totalAmount = totalAmount.add(itemTotal);
      return {
        variantId: item.variantId,
        quantity: item.quantity,
        pricePerUnit: price.add(variant.additionalPrice),
      };
    });

    // Step 3: Create the order and related items in the database
    const order = await prisma.order.create({
      data: {
        userId,
        shippingAddressId,
        status: "INITIATED", // Initial status before payment
        totalAmount,
        quantity: orderItems.reduce((sum, item) => sum + item.quantity, 0),
        orderItems: {
          create: orderItemsData,
        },
      },
      include: {
        orderItems: true,
      },
    });

    // Step 4: Update stock quantities for ordered variants
    await Promise.all(
      orderItems.map((item) =>
        prisma.productVariant.update({
          where: { id: item.variantId },
          data: {
            stockQuantity: {
              decrement: item.quantity,
            },
          },
        })
      )
    );

    return {
      success: true,
      message: "Order created successfully",
      order,
    };
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
};
