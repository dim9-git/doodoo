import { Ingredient, Product, ProductItem } from "@prisma/client"

export type ProductResponseDTO = Product & {
  ingredients: Ingredient[]
  items: ProductItem[]
}

export type RelatedProductsResponseDTO = {
  data: ProductResponseDTO[]
}
