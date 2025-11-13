import { calcCartItemTotalPrice } from "../../lib/calc-cart-item-total-price"
import { CartItemResponseDTO } from "../dto/response"

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

export const mapCartItemToStateItem = (
  item: CartItemResponseDTO
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
