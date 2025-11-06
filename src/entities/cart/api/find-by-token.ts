import { prisma } from "db/prisma"

import { withItems } from "../model/cart.relations"

export const findByToken = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: { token },
    include: withItems,
  })

  return userCart
}
