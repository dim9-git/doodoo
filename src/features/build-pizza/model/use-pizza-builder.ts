"use client"

import { useMemo, useState } from "react"
import { useSet } from "react-use"
import { ProductItem } from "db/generated/client"

import { getEnabledPizzaSizes, PizzaSize, PizzaType } from "@/entities/products"

import { PizzaParam } from "../ui/group-pizza-params"

interface ReturnProps {
  size: PizzaSize
  setSize: (size: PizzaSize) => void
  type: PizzaType
  setType: (type: PizzaType) => void
  selectedIngredients: Set<number>
  toggleIngredient: (id: number) => void
  enabledSizes: PizzaParam[]
  currentItem: ProductItem | undefined
}

export function usePizzaBuilder(items: ProductItem[]): ReturnProps {
  const [currType, setCurrType] = useState<PizzaType>(1)
  const enabledSizes = getEnabledPizzaSizes(items, currType)

  const [currSize, setCurrSize] = useState<PizzaSize>(() => {
    const firstSize = enabledSizes.find((item) => !item.disabled)
    return firstSize ? (Number(firstSize.value) as PizzaSize) : 20
  })

  const [selectedIngredients, { toggle: toggleIngredient }] = useSet(
    new Set<number>()
  )

  const validSize = useMemo(() => {
    const isDisabled = enabledSizes.find(
      (item) => item.value === currSize.toString()
    )?.disabled

    if (isDisabled) {
      const firstSize = enabledSizes.find((item) => !item.disabled)
      return firstSize ? (Number(firstSize.value) as PizzaSize) : currSize
    }

    return currSize
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currType, currSize, enabledSizes])

  // Change size when it becomes disabled
  if (validSize !== currSize) {
    setCurrSize(validSize)
  }

  const currentItem = items.find(
    (item) => item.size === currSize && item.type === currType
  )

  return {
    type: currType,
    setType: setCurrType,
    enabledSizes,
    size: currSize,
    setSize: setCurrSize,
    selectedIngredients,
    toggleIngredient,
    currentItem,
  }
}
