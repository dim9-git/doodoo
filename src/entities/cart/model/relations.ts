import { Prisma } from "db/generated/client"

export const withItems = {
  items: {
    orderBy: { createdAt: "desc" },
    include: {
      productItem: {
        include: { product: true },
      },
      ingredients: true,
    },
  },
} satisfies Prisma.CartInclude
