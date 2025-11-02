import { Cart } from "@prisma/client"
import { CartItemDTO } from "@/entities/cart-item"

export interface CartDTO extends Cart {
  items: CartItemDTO[]
}
