"use client"

import { useState } from "react"
import { useSet } from "react-use"
import { ProductItem } from "@prisma/client"

import {
  getAvailablePizzaSizes,
  PizzaSize,
  PizzaType,
} from "@/entities/products"

import { PizzaParam } from "../ui/group-pizza-params"

interface ReturnProps {
  size: PizzaSize
  setSize: (size: PizzaSize) => void
  type: PizzaType
  setType: (type: PizzaType) => void
  selectedIngredients: Set<number>
  toggleIngredient: (id: number) => void
  availableSizes: PizzaParam[]
  currentItem: ProductItem | undefined
}

export function usePizzaBuilder(items: ProductItem[]): ReturnProps {
  const [type, setType] = useState<PizzaType>(1)

  const availableSizes = getAvailablePizzaSizes(items, type)
  const [size, setSize] = useState<PizzaSize>(() => {
    const firstAvailableSize = availableSizes.find((item) => !item.disabled)
    return Number(firstAvailableSize?.value) as PizzaSize
  })

  const [selectedIngredients, { toggle: toggleIngredient }] = useSet(
    new Set<number>()
  )

  const _setSize = (newSize: PizzaSize) => {
    const isAvailableSize = availableSizes.some(
      (item) => Number(item.value) === newSize && !item.disabled
    )

    if (isAvailableSize) {
      setSize(newSize)
    } else {
      // If the new size is not available, find the first available size
      const availableSize = availableSizes.find((item) => !item.disabled)
      if (availableSize) {
        setSize(Number(availableSize.value) as PizzaSize)
      }
    }
  }

  const currentItem = items.find(
    (item) => item.size === size && item.type === type
  )

  return {
    size,
    setSize: _setSize,
    type,
    setType,
    selectedIngredients,
    toggleIngredient,
    availableSizes,
    currentItem,
  }
}
