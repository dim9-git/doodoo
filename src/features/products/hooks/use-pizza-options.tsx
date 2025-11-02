import { useEffect, useState } from "react"
import { PizzaOption } from "../components/group-pizza-options"
import { PizzaSize, PizzaType } from "../constants/pizza"
import { useSet } from "react-use"
import { getAvailablePizzaSizes } from "../utils"
import { ProductItem } from "@prisma/client"

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
