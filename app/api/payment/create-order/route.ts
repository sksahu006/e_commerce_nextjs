import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import razorpay from "@/lib/razorpay";
import authConfig from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { orderId, amount } = await request.json();
    const session = await getServerSession(authConfig);
    if (!session?.user?.id)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `order_${orderId.slice(0, 5)}`,
    });

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { razorpayOrderId: razorpayOrder.id },
    });

    return NextResponse.json({ success: true, order: razorpayOrder });
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { error: "Order creation failed" },
      { status: 500 }
    );
  }
}
