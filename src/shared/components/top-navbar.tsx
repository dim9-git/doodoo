import React from "react"

import Container from "@/shared/components/container"
import { Categories } from "@/shared/components/categories"
import SortPopup from "@/shared/components/sort-popup"

import { cn } from "@/shared/lib/utils"

interface Props {
  className?: string
}

export default function TopNavbar({ className }: Props) {
  return (
    <div
      className={cn(
        "sticky top-0 py-5 bg-white shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <Container className="flex items-center justify-between ">
        <Categories />
        <SortPopup />
      </Container>
    </div>
  )
}
