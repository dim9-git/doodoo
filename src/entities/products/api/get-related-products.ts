import { prisma } from "db/prisma"
import { ProductDetailsDTO } from "./dto/product.dto"

const DEFAULT_TAKE = 6

export const getRelatedProducts = async (
  id: number,
  take?: number
): Promise<ProductDetailsDTO[]> => {
  const category = await prisma.category.findFirst({
    where: {
      products: {
        some: {
          id,
        },
      },
    },
    include: {
      products: {
        include: {
          ingredients: true,
          items: true,
        },
        take: take ? take : DEFAULT_TAKE,
      },
    },
  })

  return category?.products ? category.products : []
}
