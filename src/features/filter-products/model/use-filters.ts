"use client"

import { useMemo, useState } from "react"
import { useSet } from "react-use"
import { useSearchParams } from "next/navigation"

export enum PriceRangeKey {
  fromPrice = "fromPrice",
  toPrice = "toPrice",
}

interface IPriceFilters {
  [PriceRangeKey.fromPrice]?: number
  [PriceRangeKey.toPrice]?: number
}

export interface IFilters {
  sizes: Set<string>
  types: Set<string>
  ingredients: Set<string>
  prices: IPriceFilters
}

function parsePriceParam(
  searchParams: URLSearchParams,
  key: PriceRangeKey
): number | undefined {
  const value = searchParams.get(key)
  if (!value || value.trim() === "") return undefined
  const num = Number(value)
  if (Number.isNaN(num)) return undefined
  return num
}

export function useFilters() {
  const searchParams = useSearchParams()
  const [prices, setPrices] = useState<IPriceFilters>({
    [PriceRangeKey.fromPrice]: parsePriceParam(
      searchParams,
      PriceRangeKey.fromPrice
    ),
    [PriceRangeKey.toPrice]: parsePriceParam(
      searchParams,
      PriceRangeKey.toPrice
    ),
  })

  const [sizes, { toggle: onToggleSize }] = useSet(
    new Set<string>(searchParams.get("sizes")?.split(","))
  )
  const [types, { toggle: onToggleType }] = useSet(
    new Set<string>(searchParams.get("types")?.split(","))
  )

  const [ingredients, { toggle: onToggleIngredient }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  )

  return useMemo(
    () => ({
      prices,
      sizes,
      types,
      ingredients,
      setPrices,
      onToggleSize,
      onToggleType,
      onToggleIngredient,
    }),
    [
      prices,
      sizes,
      types,
      ingredients,
      setPrices,
      onToggleSize,
      onToggleType,
      onToggleIngredient,
    ]
  )
}
