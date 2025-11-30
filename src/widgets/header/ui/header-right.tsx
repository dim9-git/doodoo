"use client"

import { useState } from "react"

import { cn } from "@/shared"

import { CartResponseDTO } from "@/entities/cart"

import { AuthModal } from "@/widgets/auth-modal"

import HeaderCartButton from "./header-cart-button"
import HeaderProfileButton from "./header-profile-button"

interface Props {
  className?: string
  hasCart: boolean
  initialCart: CartResponseDTO | null
}

export default function HeaderRight({
  className,
  hasCart,
  initialCart,
}: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <AuthModal open={open} onClose={() => setOpen(false)} />

      <HeaderProfileButton onClickLogin={() => setOpen(true)} />

      {hasCart && <HeaderCartButton initialCart={initialCart} />}
    </div>
  )
}
