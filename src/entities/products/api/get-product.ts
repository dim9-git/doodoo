import { prisma } from "db/prisma"

export const getProduct = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
  })

  return product
}

export const getProductDetails = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      ingredients: true,
      items: true,
    },
  })

  return product
}
