"use client"

import Link from "next/link"

import { cn } from "@/shared"

import { useCategoryStore } from "@/entities/product-categories"

interface Props {
  className?: string
  categories: {
    id: number
    name: string
  }[]
}

export function Categories({ className, categories }: Props) {
  const activeId = useCategoryStore((state) => state.activeId)

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {categories.map(({ name, id }, index) => (
        <Link
          key={index}
          className={cn(
            "flex items-center h-11 px-5 rounded-2xl font-bold ",
            activeId === id
              ? "bg-white shadow-md shadow-gray-200 text-primary"
              : null
          )}
          href={`/#${name}`}
        >
          <button type="button">{name}</button>
        </Link>
      ))}
    </div>
  )
}
