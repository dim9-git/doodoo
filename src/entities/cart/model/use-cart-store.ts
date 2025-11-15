"use client"

import { create } from "zustand"

interface CartStore {
  isUpdating: boolean
  setIsUpdating: (isUpdating: boolean) => void
}

export const useCartStore = create<CartStore>((set) => ({
  isUpdating: false,
  setIsUpdating: (isUpdating) => set({ isUpdating }),
}))
