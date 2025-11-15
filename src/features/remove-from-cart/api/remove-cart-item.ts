import { http } from "@/shared"

import { CartResponseDTO } from "@/entities/cart"

export const removeCartItem = async (id: number) => {
  return (
    await http.delete<{
      data: CartResponseDTO
    }>(`/api/cart/${id}`)
  ).data
}
