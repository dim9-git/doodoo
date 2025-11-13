import { CartStateItem, mapCartItemToStateItem } from "@/entities/cart-items"

import { CartResponseDTO } from "../dto/response"

export interface CartState {
  items: CartStateItem[]
  total: number
}

export const mapCartToState = (cart: CartResponseDTO): CartState => {
  const items: CartStateItem[] = cart.items.map((item) =>
    mapCartItemToStateItem(item)
  )

  return {
    items,
    total: cart.total,
  }
}
