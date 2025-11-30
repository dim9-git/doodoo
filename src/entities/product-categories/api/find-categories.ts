import { prisma } from "db/prisma"

export const findCategoriesShort = async () => {
  return await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  })
}

export const findCategories = async () => {
  return await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: "desc",
        },
        include: {
          ingredients: true,
          items: {
            orderBy: {
              price: "asc",
            },
          },
        },
      },
    },
  })
}
