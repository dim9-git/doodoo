"use client"

import { useRef } from "react"
import qs from "qs"
import { useDebounce } from "react-use"
import { useRouter } from "next/navigation"

import { IFilters } from "./use-filters"

export function useQueryFilters(filters: IFilters) {
  const router = useRouter()
  const isMounted = useRef(false)

  useDebounce(
    () => {
      if (isMounted.current) {
        const q = qs.stringify(
          {
            sizes: Array.from(filters.sizes),
            types: Array.from(filters.types),
            ingridients: Array.from(filters.ingridients),
            fromPrice: filters.fromPrice,
            toPrice: filters.toPrice,
          },
          {
            arrayFormat: "comma",
          }
        )

        router.push(`?${q}`, {
          scroll: false,
        })
      }
      isMounted.current = true
    },
    250,
    [filters]
  )
}
