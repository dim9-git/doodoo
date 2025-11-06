import { CartStateItem, mapCartItemToStateItem } from "@/entities/cart-items"

import { CartDTO } from "../dto/cart.dto"

export interface CartState {
  items: CartStateItem[]
  total: number
}

export const mapCartToState = (cart: CartDTO): CartState => {
  const items: CartStateItem[] = cart.items.map((item) =>
    mapCartItemToStateItem(item)
  )

  return {
    items,
    total: cart.total,
  }
}
