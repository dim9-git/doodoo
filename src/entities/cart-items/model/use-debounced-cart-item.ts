"use client"

import { useEffect, useState } from "react"
import { useDebounce } from "react-use"

import { CartState } from "@/entities/cart"
import { UpdateCartVariables } from "@/features/update-cart"

interface Props {
  id: number
  quantity: number
  price: number
  updateItemAsync: (paylod: UpdateCartVariables) => Promise<CartState>
  onItemChange?: (isCartLoading: boolean) => void
}

export const useDebouncedCartItem = ({
  id,
  quantity,
  price,
  updateItemAsync,
  onItemChange,
}: Props) => {
  const [count, setCount] = useState(quantity)
  const [total, setTotal] = useState(price)

  useEffect(() => {
    setCount(quantity)
  }, [quantity])

  useEffect(() => {
    setTotal(price)
  }, [price])

  useEffect(() => {
    if (count !== quantity) {
      onItemChange?.(true)
    }
  }, [count, quantity, onItemChange])

  useDebounce(
    async () => {
      if (count !== quantity) {
        await updateItemAsync({ id, quantity: count })
        onItemChange?.(false)
      }
    },
    325,
    [id, count, quantity, onItemChange]
  )

  const onClickUpdate = (type: "plus" | "minus") => {
    const unitPrice = total / count
    const newCount = type === "minus" ? Math.max(1, count - 1) : count + 1
    const newTotal = unitPrice * newCount

    setCount(newCount)
    setTotal(newTotal)
  }

  return {
    count,
    total,
    onClickUpdate,
  }
}
