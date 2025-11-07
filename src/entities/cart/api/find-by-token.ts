import { prisma } from "db/prisma"

import { withItems } from "../model/cart.relations"

export const findCartByToken = async (token: string) => {
  return await prisma.cart.findFirst({
    where: { token },
    include: withItems,
  })
}
