import { prisma } from "db/prisma"

import { ProductResponseDTO } from "./dto/response"

export const getProduct = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
  })

  return product
}

export const getProductDetails = async (
  id: number
): Promise<ProductResponseDTO | null> => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      ingredients: true,
      items: true,
    },
  })

  return product
}
