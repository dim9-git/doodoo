import { prisma } from "db/prisma"

import { Ingredient, Product, ProductItem } from "@prisma/client"

export const getProduct = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
  })

  return product
}

export const getProductNested = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      ingredients: true,
      items: true,
    },
  })

  return product
}

export type ProductNested = Product & {
  ingredients: Ingredient[]
  items: ProductItem[]
}
