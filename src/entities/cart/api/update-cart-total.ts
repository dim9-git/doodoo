import { prisma, TransactionClient } from "db/prisma"

import { calcCartItemTotalPrice } from "@/entities/cart-items"

import { withItems } from "../model/cart.relations"
import { CartDTO } from "./dto/cart.dto"
import { findByToken } from "./find-by-token"

export async function updateCartTotal(
  userCart: CartDTO,
  client?: TransactionClient
) {
  const db = client || prisma

  const total = userCart.items.reduce((acc, item) => {
    return acc + calcCartItemTotalPrice(item)
  }, 0)

  return await db.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      total,
    },
    include: withItems,
  })
}

export async function updateCartTotalByToken(
  token: string,
  client?: TransactionClient
) {
  const db = client || prisma

  const userCart = await findByToken(token)
  if (!userCart) return

  return await updateCartTotal(userCart, db)
}
