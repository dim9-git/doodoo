export type CreateCartItemDTO = {
  productItemId: number
  ingredientsIds?: number[]
  quantity?: number
}

export interface UpdateCartItemDTO {
  id: number
  quantity: number
}

export interface RemoveCartItemDTO {
  id: number
}
