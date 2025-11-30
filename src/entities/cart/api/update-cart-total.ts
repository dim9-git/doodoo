import { prisma, TransactionClient } from "db/prisma"

import { calcCartItemTotalPrice } from "@/entities/cart-items"

import { withItems } from "../model/relations"
import { CartResponseDTO } from "./dto/response"
import { findCartByToken } from "./find-by-token"

export async function updateCartTotal(
  userCart: CartResponseDTO,
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

  const userCart = await findCartByToken(token)
  if (!userCart) return

  return await updateCartTotal(userCart, db)
}
