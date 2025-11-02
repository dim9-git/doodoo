import { prisma } from "db/prisma"
 

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
