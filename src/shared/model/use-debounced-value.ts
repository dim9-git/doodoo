"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"

type ReturnState<T> = [T, Dispatch<SetStateAction<T>>]

export function useDebouncedValue<T>(value: T, delay: number): ReturnState<T> {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return [debouncedValue, setDebouncedValue]
}
