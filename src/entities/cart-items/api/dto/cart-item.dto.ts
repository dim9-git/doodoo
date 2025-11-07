import { CartItem, Ingredient, Product, ProductItem } from "@prisma/client"

export type CartItemDTO = CartItem & {
  productItem: ProductItem & {
    product: Product
  }
  ingredients: Ingredient[]
}

export interface CreateCartItemRequestDTO {
  productItemId: number
  ingredientsIds?: number[]
  quantity?: number
}

export interface UpdateCartItemRequestDTO {
  quantity: number
}
