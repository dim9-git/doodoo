import { prisma } from "db/prisma"
import { ProductResponseDTO } from "./dto/response"

const DEFAULT_TAKE = 6

export const findRelatedProducts = async (
  id: number,
  take?: number
): Promise<ProductResponseDTO[]> => {
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
