import { CartItemDTO } from "@/entities/cart-items/api/dto/cart-item.dto"
import { CartDTO } from "../api/dto/cart.dto"

export const findCartItem = (
  cart: CartDTO,
  productItemId: number,
  ingredientsIds?: number[]
): CartItemDTO | undefined => {
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
