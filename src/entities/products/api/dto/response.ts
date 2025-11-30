import { Ingredient, Product, ProductItem } from "db/generated/client"

export type ProductResponseDTO = Product & {
  ingredients: Ingredient[]
  items: ProductItem[]
}
