import { prisma, TransactionClient } from "db/prisma"
import { withItems } from "../model/relations"

export async function findOrCreateCart(
  token: string,
  client?: TransactionClient
) {
  const db = client || prisma
  let userCart = await db.cart.findFirst({
    where: { token },
    include: withItems,
  })

  if (!userCart) {
    userCart = await db.cart.create({
      data: {
        token,
      },
      include: withItems,
    })
  }

  return userCart
}
