import { Cart } from "@prisma/client"
import { CartItemResponseDTO } from "@/entities/cart-items"

export interface CartResponseDTO extends Cart {
  items: CartItemResponseDTO[]
}
