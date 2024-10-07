'use server'
import { prisma } from "@/lib/prisma"
export async function getStats() {
  const [totalProducts, totalOrders, totalUsers] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
  ])

  const recentActivities = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { user: true },
  })

  return {
    totalProducts,
    totalOrders,
    totalUsers,
    recentActivities: recentActivities?.map(order => 
      `${order.user.username} placed an order for $${order.totalAmount}`
    ),
  }
}