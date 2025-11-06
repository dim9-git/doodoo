"use client"

import Link from "next/link"

import { cn } from "@/shared/lib/utils"

import { useCategoryStore } from "@/entities/product-categories"

interface Props {
  className?: string
}

const cats = [
  {
    name: "Пиццы",
    id: 0,
  },
  {
    name: "Комбо",
    id: 1,
  },
  {
    name: "Закуски",
    id: 2,
  },
  {
    name: "Десерты",
    id: 3,
  },
  {
    name: "Коктейли",
    id: 4,
  },
  {
    name: "Кофе",
    id: 5,
  },
  {
    name: "Напитки",
    id: 6,
  },
  {
    name: "Десерты",
    id: 7,
  },
]

export function Categories({ className }: Props) {
  const activeId = useCategoryStore((state) => state.activeId)
  const items = cats

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {items.map(({ name, id }, index) => (
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
