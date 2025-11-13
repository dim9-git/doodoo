import { CartItem, Ingredient, Product, ProductItem } from "@prisma/client"

export type CartItemDTO = CartItem & {
  productItem: ProductItem & {
    product: Product
  }
  ingredients: Ingredient[]
}

export type CreateCartItemPayload = {
  productItemId: number
  ingredientsIds?: number[]
  quantity?: number
}

export interface UpdateCartItemPayload {
  id: number
  quantity: number
}

export interface RemoveCartItemPayload {
  id: number
}
