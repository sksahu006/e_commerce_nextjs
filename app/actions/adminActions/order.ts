import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. Fetch All Orders with optional status filter and pagination
export async function fetchOrders(page: number = 1, pageSize: number = 10, status?: string) {
  return prisma.order.findMany({
    where: status ? { status } : undefined,
    include: {
      user: true,
      orderItems: {
        include: {
          variant: {
            include: {
              product: true,
              size: true,
              color: true,
            },
          },
        },
      },
      shippingAddress: true,
      paymentMethod: true,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
}

// 2. Fetch a Single Order with full details
export async function fetchOrderById(orderId: string) {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: true,
      orderItems: {
        include: {
          variant: {
            include: {
              product: true,
              size: true,
              color: true,
            },
          },
        },
      },
      shippingAddress: true,
      paymentMethod: true,
    },
  });
}

// 3. Update Order Status
export async function updateOrderStatus(orderId: string, newStatus: string) {
  return prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus },
  });
}

// 4. Fetch Orders by Status
export async function fetchOrdersByStatus(status: string) {
  return prisma.order.findMany({
    where: { status },
    include: {
      user: true,
      orderItems: true,
      shippingAddress: true,
      paymentMethod: true,
    },
  });
}
