import { useEffect, useState } from "react"
import { useSet } from "react-use"
import { ProductItem } from "@prisma/client"

import { PizzaSize, PizzaType } from "@/entities/products"

import { getAvailablePizzaSizes } from "../utils"
import { PizzaOption } from "../components/group-pizza-options"

interface ReturnProps {
  size: PizzaSize
  setSize: (size: PizzaSize) => void
  type: PizzaType
  setType: (type: PizzaType) => void
  selectedIngredients: Set<number>
  toggleIngredient: (id: number) => void
  availableSizes: PizzaOption[]
}

export default function usePizzaOptions(items: ProductItem[]): ReturnProps {
  const [size, setSize] = useState<PizzaSize>(20)
  const [type, setType] = useState<PizzaType>(1)

  const [selectedIngredients, { toggle: toggleIngredient }] = useSet(
    new Set<number>()
  )

  const availableSizes = getAvailablePizzaSizes(items, type)

  useEffect(() => {
    const isAvailableSize = availableSizes.find(
      (item) => Number(item.value) === size && !item.disabled
    )
    const availableSize = availableSizes.find((item) => !item.disabled)

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize)
    }
  }, [type])

  return {
    size,
    setSize,
    type,
    setType,
    selectedIngredients,
    toggleIngredient,
    availableSizes,
  }
}
