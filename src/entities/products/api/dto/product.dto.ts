import { Ingredient, Product, ProductItem } from "@prisma/client"

export type ProductDetailsDTO = Product & {
  ingredients: Ingredient[]
  items: ProductItem[]
}

export type RelatedProductsResponseDTO = {
  data: ProductDetailsDTO[]
}
