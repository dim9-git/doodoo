import { Cart } from "db/generated/browser"
import { CartItemResponseDTO } from "@/entities/cart-items"

export interface CartResponseDTO extends Cart {
  items: CartItemResponseDTO[]
}
