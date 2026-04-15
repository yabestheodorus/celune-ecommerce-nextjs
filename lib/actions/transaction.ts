'use server'

import { prisma } from "@/lib/prisma"
import { type CartItem } from "@/lib/store"
import { getAuthSession } from "@/lib/actions/session"

export async function createTransaction(
  totalAmount: number,
  shippingAddress: string,
  items: CartItem[]
) {
  try {
    const session = await getAuthSession()
    if (!session?.user?.id) {
      return { success: false, error: "You must be logged in to place an order." }
    }

    if (!items || items.length === 0) {
      return { success: false, error: "No items provided for transaction" }
    }

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        totalAmount,
        shippingAddress,
        items: {
          create: items.map((item) => ({
            productId: item.id,
            productName: item.name,
            price: item.price,
            priceNumber: item.priceNumber,
            quantity: item.quantity,
            selectedSize: item.selectedSize,
          })),
        },
      },
      include: {
        items: true,
      },
    })

    return { success: true, orderId: order.id }
  } catch (error) {
    console.error("Failed to create transaction:", error)
    return { success: false, error: "Database transaction failed. Please try again." }
  }
}