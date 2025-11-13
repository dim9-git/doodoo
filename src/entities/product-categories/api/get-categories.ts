import { prisma } from "db/prisma"

export const getCategoriesShort = async () => {
  return await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  })
}

export const getCategories = async () => {
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
