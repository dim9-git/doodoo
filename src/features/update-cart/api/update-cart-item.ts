import { http } from "@/shared"

import { CartDTO } from "@/entities/cart"
import { UpdateCartItemPayload } from "@/entities/cart-items"

export const updateCartItem = async ({
  id,
  quantity,
}: UpdateCartItemPayload) => {
  return (await http.patch<{ data: CartDTO }>(`/api/cart/${id}`, { quantity }))
    .data
}
