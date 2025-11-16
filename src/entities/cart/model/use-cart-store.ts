"use client"

import { create } from "zustand"

interface CartStore {
  isUpdating: boolean
  setIsUpdating: (isUpdating: boolean) => void
  isAdding: boolean
  setIsAdding: (isAdding: boolean) => void
}

export const useCartStore = create<CartStore>((set) => ({
  isUpdating: false,
  setIsUpdating: (isUpdating) => set({ isUpdating }),
  isAdding: false,
  setIsAdding: (isAdding) => set({ isAdding }),
}))
