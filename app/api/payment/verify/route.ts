import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await request.json();

        // Verify the signature
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            throw new Error("Invalid signature");
        }

        // Fetch the order to get the total amount
        const order = await prisma.order.findUnique({
            where: { razorpayOrderId: razorpay_order_id },
            include: { orderItems: true },
        });

        if (!order) {
            throw new Error("Order not found");
        }

        // Create the PaymentMethod record
        const paymentMethod = await prisma.paymentMethod.create({
            data: {
                userId: order.userId,
                razorpayPaymentId: razorpay_payment_id,
                razorpayOrderId: razorpay_order_id,
                razorpaySignature: razorpay_signature,
                status: "COMPLETED",
                amount: order.totalAmount,
                currency: "INR",
            },
        });

        // Update the order to link it to the PaymentMethod and mark it as PAID
        await prisma.order.update({
            where: { id: order.id },
            data: {
                status: "PAID",
                paymentMethodId: paymentMethod.id,
            },
        });

        await prisma.cartItem.deleteMany({
          where: {
              cart: { userId: order.userId },
              variantId: { in: order.orderItems.map((item) => item.variantId) },
          },
      });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error verifying payment:", error);
        return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 500 });
    }
}