import { CartItem, Ingredient, Product, ProductItem } from "@prisma/client"

export type CartItemResponseDTO = CartItem & {
  productItem: ProductItem & {
    product: Product
  }
  ingredients: Ingredient[]
}
