export * from "./api/mapper/map-cart-item-to-state"
export * from "./api/dto/response"
export * from "./api/dto/request"

export * from "./lib/calc-cart-item-total-price"
export { getCartItemInfoText } from "./lib/get-cart-item-info-text"

export { type CartItemProps } from "./model/props-types"

import { CartItemImage } from "./ui/cart-item-image"
import { CartItemPrice } from "./ui/cart-item-price"
import { CartItemInfo } from "./ui/cart-item-info"
import { CartItemCountButton } from "./ui/cart-item-count-buttons"

export const CartItem = {
  Image: CartItemImage,
  Price: CartItemPrice,
  Info: CartItemInfo,
  CountButtons: CartItemCountButton,
}
