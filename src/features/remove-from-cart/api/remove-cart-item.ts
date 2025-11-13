import { CartResponseDTO } from "@/entities/cart/api/dto/response"
import { http } from "@/shared/lib/http"

export const removeCartItem = async (id: number) => {
  return (
    await http.delete<{
      data: CartResponseDTO
    }>(`/api/cart/${id}`)
  ).data
}
