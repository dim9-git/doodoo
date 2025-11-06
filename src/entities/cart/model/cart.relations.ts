import { Prisma } from "@prisma/client"

export const withItems = Prisma.validator<Prisma.CartInclude>()({
  items: {
    orderBy: { createdAt: "desc" },
    include: {
      productItem: {
        include: { product: true },
      },
      ingredients: true,
    },
  },
})
