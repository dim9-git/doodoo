import { http } from "@/shared"

import { CartResponseDTO } from "./dto/response"

export const getCart = async () => {
  return (await http.get<{ data: CartResponseDTO }>("/api/cart")).data
}
