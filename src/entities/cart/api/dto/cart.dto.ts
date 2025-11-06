import { Cart } from "@prisma/client"
import { CartItemDTO } from "@/entities/cart-items"

export interface CartDTO extends Cart {
  items: CartItemDTO[]
}
