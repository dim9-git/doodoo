import { prisma } from "db/prisma"
import { calcCartItemTotalPrice } from "@/entities/cart-item"

const cartWithItemsInclude = {
  items: {
    orderBy: { createdAt: "desc" },
    include: {
      productItem: {
        include: { product: true },
      },
      ingredients: true,
    },
  },
} as const

export async function updateCartTotal(token: string) {
  const userCart = await prisma.cart.findFirst({
    where: { token },
    include: cartWithItemsInclude,
  })

  if (!userCart) return

  const total = userCart.items.reduce((acc, item) => {
    return acc + calcCartItemTotalPrice(item)
  }, 0)

  return await prisma.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      total,
    },
    include: cartWithItemsInclude,
  })
}
