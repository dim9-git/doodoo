import { prisma } from "db/prisma"

import { ProductDetailsDTO } from "./dto/product.dto"

export const getProduct = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
  })

  return product
}

export const getProductDetails = async (
  id: number
): Promise<ProductDetailsDTO | null> => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      ingredients: true,
      items: true,
    },
  })

  return product
}
