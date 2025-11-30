import { prisma } from "db/prisma"

import { ProductResponseDTO } from "./dto/response"

export const findProductById = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
  })

  return product
}

export const findProductDetails = async (
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
