import { calcCartItemTotalPrice } from "../../lib/calc-cart-item-total-price"
import { CartItemDTO } from "../dto/cart-item.dto"

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

export const mapCartItemToStateItem = (item: CartItemDTO): CartStateItem => ({
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
