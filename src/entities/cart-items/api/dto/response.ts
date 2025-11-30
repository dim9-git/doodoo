import { CartItem, Ingredient, Product, ProductItem } from "db/generated/client"

export type CartItemResponseDTO = CartItem & {
  productItem: ProductItem & {
    product: Product
  }
  ingredients: Ingredient[]
}
