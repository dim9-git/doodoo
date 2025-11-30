import { Ingredient, Product, ProductItem } from "db/generated/client"

export type ProductResponseDTO = Product & {
  ingredients: Ingredient[]
  items: ProductItem[]
}

export type RelatedProductsResponseDTO = {
  data: ProductResponseDTO[]
}
