import { CartItemResponseDTO } from "../api/dto/response"
import { CartStateItem } from "../api/mapper/map-cart-item-to-state"

export const calcCartItemTotalPrice = (item: CartItemResponseDTO): number => {
  const ingredientsPrice = item.ingredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  )

  return (ingredientsPrice + item.productItem.price) * item.quantity
}

export const calcCartStateItemTotalPrice = (item: CartStateItem): number => {
  const ingredientsPrice = item.ingredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  )

  return (ingredientsPrice + item.price) * item.quantity
}
