import React from "react"

import { cn } from "@/shared/lib/utils"

interface Props {
  src: string
  className?: string
}

export function CartItemImage({ src, className }: Props) {
  return (
    <img
      className={cn("w-[60px] h-[60px]", className)}
      src={src}
      alt={src.slice(0, 3)}
    />
  )
}
