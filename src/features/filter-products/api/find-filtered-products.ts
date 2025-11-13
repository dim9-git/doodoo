import { prisma } from "db/prisma"

export interface GetSearchParams {
  query?: string
  sortBy?: string
  sizes?: string
  types?: string
  ingredients?: string
  fromPrice?: string
  toPrice?: string
}

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 1000

export const findFilteredProducts = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(",").map(Number)
  const pizzaTypes = params.types?.split(",").map(Number)
  const ingredientIds = params.ingredients?.split(",").map(Number)
  const minPrice = params.fromPrice
    ? Number(params.fromPrice)
    : DEFAULT_MIN_PRICE
  const maxPrice = params.toPrice ? Number(params.toPrice) : DEFAULT_MAX_PRICE

  return await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: "desc",
        },
        where: {
          ingredients: ingredientIds
            ? { some: { id: { in: ingredientIds } } }
            : undefined,
          items: {
            some: {
              size: sizes ? { in: sizes } : undefined,
              type: pizzaTypes ? { in: pizzaTypes } : undefined,
              price: { gte: minPrice, lte: maxPrice },
            },
          },
        },

        include: {
          ingredients: true,
          items: {
            where: {
              price: { gte: minPrice, lte: maxPrice },
            },
            orderBy: {
              price: "asc",
            },
          },
        },
      },
    },
  })
}
