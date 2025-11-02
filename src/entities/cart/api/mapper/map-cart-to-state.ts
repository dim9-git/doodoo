import { calcCartItemTotalPrice } from "@/entities/cart-item"
import { CartDTO } from "../dto/cart.dto"

export type CartStateItem = {
  id: number
  quantity: number
  name: string
  coverImageUrl: string | null
  price: number
  pizzaSize: number | null
  pizzaType: number | null
  ingredients: {
    id: number
    name: string
    price: number
  }[]
}

export interface CartState {
  items: CartStateItem[]
  total: number
}

export const mapCartItemToStateItem = (
  item: CartDTO["items"][0]
): CartStateItem => ({
  id: item.id,
  quantity: item.quantity,
  name: item.productItem.product.name,
  coverImageUrl: item.productItem.product.coverUrl,
  price: calcCartItemTotalPrice(item),
  pizzaSize: item.productItem.size,
  pizzaType: item.productItem.type,
  ingredients: item.ingredients.map((ingr) => ({
    id: ingr.id,
    name: ingr.name,
    price: ingr.price,
  })),
})

export const mapCartToState = (cart: CartDTO): CartState => {
  const items: CartStateItem[] = cart.items.map((item) =>
    mapCartItemToStateItem(item)
  )

  return {
    items,
    total: cart.total,
  }
}
