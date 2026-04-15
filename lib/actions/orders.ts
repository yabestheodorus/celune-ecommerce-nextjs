'use server'

import { prisma } from "@/lib/prisma"
import { getAuthSession } from "@/lib/actions/session"

export async function getUserOrders() {
  const session = await getAuthSession()
  if (!session?.user?.id) {
    return { success: false as const, error: "Not authenticated" }
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return { success: true as const, orders }
}