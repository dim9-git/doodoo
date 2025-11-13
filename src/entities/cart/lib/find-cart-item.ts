import { CartItemResponseDTO } from "@/entities/cart-items"

import { CartResponseDTO } from "../api/dto/response"

export const findCartItem = (
  cart: CartResponseDTO,
  productItemId: number,
  ingredientsIds?: number[]
): CartItemResponseDTO | undefined => {
  const reqIngredientIds = (ingredientsIds || []).sort()

  return cart.items.find((item) => {
    if (item.productItemId !== productItemId) {
      return false
    }

    const cartItemIngredientIds = item.ingredients.map((ing) => ing.id).sort()

    if (cartItemIngredientIds.length !== reqIngredientIds.length) {
      return false
    }

    return cartItemIngredientIds.every(
      (id, index) => id === reqIngredientIds[index]
    )
  })
}
